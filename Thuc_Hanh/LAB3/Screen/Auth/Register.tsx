import React, {useState} from 'react';
import {
  Alert,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {useMyContextController, login} from '../../Context/MyContextController';

const Register = () => {
  const navigation = useNavigation<any>();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [reShowPassword, setReShowPassword] = useState(false);
  const [, dispatch] = useMyContextController();

  const handleRegister = async () => {
    if (!fullName || !email || !password || !rePassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    if (password !== rePassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    let user: FirebaseAuthTypes.User | null = null;
    try {
      // Tạo người dùng trong Firebase Authentication
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      user = userCredential.user;

      // Cập nhật displayName
      await user.updateProfile({displayName: fullName});

      // Sử dụng ID từ Firestore thay vì uuidv4
      const userId = firestore().collection('USERS').doc().id;

      // Lưu thông tin người dùng vào Firestore với ID
      await firestore().collection('USERS').doc(email).set({
        id: userId,
        email: email,
        fullName: fullName,
        role: 'customer',
      });

      // Đăng nhập ngay sau khi đăng ký và lưu vào context
      await login(dispatch, email, password);

      Alert.alert('Success', 'Registration successful!');
      navigation.navigate('Login');
    } catch (error: any) {
      // Nếu có lỗi, xóa tài khoản vừa tạo trong Authentication
      if (user) {
        await user.delete().catch((deleteError: Error) => {
          console.error('Failed to delete user:', deleteError.message);
        });
      }

      let message = 'Registration failed. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
        message = 'Email already in use.';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Invalid email address.';
      } else if (error.code === 'auth/weak-password') {
        message = 'Password is too weak.';
      } else if (error.code === 'permission-denied') {
        message = 'Permission denied. Check Firestore Rules.';
      } else {
        message = `Registration failed: ${error.message}`;
      }
      Alert.alert('Error', message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        value={fullName}
        onChangeText={setFullName}
        placeholder="Full Name"
        style={styles.input}
      />

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        style={styles.input}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry={!showPassword}
          style={styles.passwordInput}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <Feather name="eye" size={20} />
          ) : (
            <Feather name="eye-off" size={20} />
          )}
        </TouchableOpacity>
      </View>

      <View style={{...styles.passwordContainer, marginBottom: 40}}>
        <TextInput
          value={rePassword}
          onChangeText={setRePassword}
          placeholder="Re-enter password"
          secureTextEntry={!reShowPassword}
          style={styles.passwordInput}
        />
        <TouchableOpacity onPress={() => setReShowPassword(!reShowPassword)}>
          {reShowPassword ? (
            <Feather name="eye" size={20} />
          ) : (
            <Feather name="eye-off" size={20} />
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Have an account? Login now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'hotpink',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
  },
  button: {
    width: '100%',
    backgroundColor: 'hotpink',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  linkText: {
    color: 'hotpink',
    fontSize: 18,
    textAlign: 'center',
  },
});
