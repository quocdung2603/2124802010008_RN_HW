import {createNativeStackNavigator} from '@react-navigation/native-stack';

import React from 'react';
import Login from '../Buoi_3/Login';
import Register from '../Buoi_3/Register';
import ResetPass from '../Buoi_3/ResetPass';

const Stack = createNativeStackNavigator();

const DemoStack = () => {
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

export default DemoStack;
