import firestore from '@react-native-firebase/firestore';
import React from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import Login from './Screen/AuthScreen/Login';
import Register from './Screen/AuthScreen/Register';
import ResetPassword from './Screen/AuthScreen/ResetPassword';
import Home from './Screen/Home';
import AddService from './Screen/AddService';
import DetailService from './Screen/DetailService';
import Profile from './Screen/Profile';
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
    <TouchableOpacity
      onPress={handleCreateAdmin}
      style={{marginTop: 100, marginLeft: 100, borderWidth: 1}}>
      <Text>Hello</Text>
    </TouchableOpacity>
  );
};

export default SpaApp;
