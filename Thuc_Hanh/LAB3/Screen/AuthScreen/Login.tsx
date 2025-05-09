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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

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

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.linkText}>Don't have an account? Register now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

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
    marginBottom: 40,
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
