import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {HelperText, TextInput} from 'react-native-paper';

const Register = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const checkEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const checkPassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: 10,
        justifyContent: 'center',
      }}>
      <Text style={{fontWeight: 'bold', fontSize: 30, textAlign: 'center'}}>
        Create a new account!
      </Text>
      <TextInput
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        left={<TextInput.Icon icon="email" />}
      />
      <HelperText visible={checkEmail(email)} type={'error'}>
        Email không hợp lệ
      </HelperText>
      <TextInput
        mode="outlined"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Password"
        left={<TextInput.Icon icon="key" />}
        right={<TextInput.Icon icon="eye" />}
      />
      <HelperText visible={checkPassword(password)} type={'error'}>
        Password không hợp lệ
      </HelperText>
      <TextInput
        mode="outlined"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        placeholder="Confirm Password"
        left={<TextInput.Icon icon="key" />}
        right={<TextInput.Icon icon="eye" />}
      />
      <HelperText visible={checkPassword(password)} type={'error'}>
        Password không hợp lệ
      </HelperText>
      <TouchableOpacity
        onPress={() => {
          console.log('Quên mật khẩu');
        }}
        style={{backgroundColor: 'orange', padding: 10, borderRadius: 5}}>
        <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>
          Signup
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Login' as never);
        }}>
        <Text style={{color: 'blue', textAlign: 'center'}}>
          Already have an account?
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;
