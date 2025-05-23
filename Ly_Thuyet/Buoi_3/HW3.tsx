import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './Login';
import Register from './Register';
import ResetPass from './ResetPass';
import React from 'react';

const Stack = createNativeStackNavigator();

const HW3 = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ResetPass" component={ResetPass} />
    </Stack.Navigator>
  );
};

export default HW3;
