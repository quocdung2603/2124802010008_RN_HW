import React, {useState} from 'react';
import {
  Button,
  ImageBackground,
  Text,
  TextInput,
  View,
  StyleSheet,
  Alert,
} from 'react-native';

const BT_Buoi2: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    Alert.alert('Login', `Username: ${username}, Password: ${password}`);
  };

  return (
    <ImageBackground
      source={require('../../Asset/download.jpg')} // <-- Đường dẫn ảnh local
      style={styles.background}>
      <ImageBackground
        source={require('../../Asset/images.jpg')}
        style={styles.formContainer}></ImageBackground>
      <Text style={styles.title}>REGISTER</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
      </View>
      <View style={{width: 380}}>
        <Button
          title="LOGIN"
          onPress={() => {
            handleLogin();
          }}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  formContainer: {
    width: 380,
    height: 250,
    backgroundColor: '',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginLeft: 'auto',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  inputContainer: {
    width: 380,
    backgroundColor: 'white',
    padding: 5,
  },
  input: {
    backgroundColor: '#fff',
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
  },
});

export default BT_Buoi2;
