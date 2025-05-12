import firestore from '@react-native-firebase/firestore';
import React from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import Login from './Screen/Auth/Login';
import Register from './Screen/Auth/Register';
import ResetPassword from './Screen/Auth/ResetPassword';
import Home from './Screen/Admin/ServiceScreen/Home';
import AddService from './Screen/Admin/ServiceScreen/AddService';
import DetailService from './Screen/Admin/ServiceScreen/DetailService';
import Profile from './Screen/Admin/ProfileScreen/Profile';
import SpaAdminAppStack from './Screen/Admin/SpaAdminAppStack';
import SpaClientAppStack from './Screen/Client/SpaClientAppStack';
const SpaApp = () => {
  const handleCreateAdmin = async () => {
    try {
      await firestore().collection('Users').doc('ABC').set({
        username: 'user1',
        password: '123456',
      });
      Alert.alert('Tạo thành công user');
      console.log('Tạo thành công admin');
    } catch (error) {
      console.error('Lỗi tạo admin:', error);
      Alert.alert('Lỗi tạo admin:', (error as Error).message);
    }
  };

  return (
    // <TouchableOpacity
    //   onPress={handleCreateAdmin}
    //   style={{marginTop: 100, marginLeft: 100, borderWidth: 1}}>
    //   <Text>Hello</Text>
    // </TouchableOpacity>
    <SpaClientAppStack />
  );
};

export default SpaApp;
