import {startAfter} from '@react-native-firebase/firestore';
import React, {useState} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setReShowPassword] = useState(false);

  const handleLogin = () => {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        value={fullName}
        onChangeText={setFullName}
        placeholder="fullName"
        style={styles.input}
      />

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="email"
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
          secureTextEntry={!showRePassword}
          style={styles.passwordInput}
        />
        <TouchableOpacity onPress={() => setReShowPassword(!showRePassword)}>
          {showRePassword ? (
            <Feather name="eye" size={20} />
          ) : (
            <Feather name="eye-off" size={20} />
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>
      <TouchableOpacity>
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
