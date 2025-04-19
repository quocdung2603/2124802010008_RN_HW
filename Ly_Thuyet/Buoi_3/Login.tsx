import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import {HelperText, TextInput} from 'react-native-paper';

const Login = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

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
      <Image
        source={require('../../Asset/logo.png')}
        resizeMode="contain"
        style={{alignSelf: 'center'}}
      />
      <Text style={{fontWeight: 'bold', fontSize: 30, textAlign: 'center'}}>
        Welcome back!
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
        secureTextEntry={!isShowPassword}
        placeholder="Password"
        left={<TextInput.Icon icon="key" />}
        right={
          <TextInput.Icon
            icon={!isShowPassword ? 'eye-off' : 'eye'}
            onPress={() => {
              setIsShowPassword(!isShowPassword);
            }}
          />
        }
      />
      <HelperText visible={checkPassword(password)} type={'error'}>
        Password không hợp lệ
      </HelperText>
      <TouchableOpacity
        onPress={() => {
          Alert.alert('email: ', email + 'password: ' + password);
        }}
        style={{backgroundColor: 'orange', padding: 10, borderRadius: 5}}>
        <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Register' as never);
        }}>
        <Text style={{color: 'blue', textAlign: 'center'}}>
          Create a new account?
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ResetPass' as never);
        }}>
        <Text style={{color: 'blue', textAlign: 'center'}}>
          Forgot password?
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
