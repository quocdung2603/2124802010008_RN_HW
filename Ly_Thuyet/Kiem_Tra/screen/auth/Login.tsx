import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {getAuth, signInWithEmailAndPassword} from '@react-native-firebase/auth';
import {useMyContext} from '../../context/AppContext';

const Login = () => {
  const navigation = useNavigation<any>();
  const {dispatch} = useMyContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ email và mật khẩu');
      return;
    }

    setLoading(true);
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      if (!user.emailVerified) {
        Alert.alert(
          'Lỗi',
          'Vui lòng xác thực email trước khi đăng nhập. Kiểm tra hộp thư của bạn.',
          [{text: 'OK', onPress: () => auth.signOut()}],
        );
        return;
      }

      // Lưu thông tin người dùng vào context, bao gồm uid
      dispatch({
        type: 'LOGIN',
        payload: {uid: user.uid, email: user.email || ''},
      });
      Alert.alert('Thành công', 'Đăng nhập thành công!');
      navigation.navigate('ClientApp'); // Điều hướng đến màn hình chính sau khi đăng nhập
    } catch (error: any) {
      let errorMessage = 'Đã có lỗi xảy ra. Vui lòng thử lại.';
      if (
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password'
      ) {
        errorMessage = 'Email hoặc mật khẩu không đúng.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Email không hợp lệ.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Quá nhiều lần thử đăng nhập. Vui lòng thử lại sau.';
      }
      Alert.alert('Lỗi', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restaurant App - Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} disabled={loading} />
      <TouchableOpacity>
        <Text style={styles.link}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  link: {
    color: 'blue',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default Login;
