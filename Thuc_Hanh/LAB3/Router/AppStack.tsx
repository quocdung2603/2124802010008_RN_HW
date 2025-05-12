import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Screen/Auth/Login';
import Register from '../Screen/Auth/Register';
import ResetPassword from '../Screen/Auth/ResetPassword';
import SpaAdminAppStack from '../Screen/Admin/SpaAdminAppStack';
import SpaClientAppStack from '../Screen/Client/SpaClientAppStack';
import {MyContextControllerProvider} from '../Context/MyContextController';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <MyContextControllerProvider>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="SpaAdminAppStack" component={SpaAdminAppStack} />
        <Stack.Screen name="SpaClientAppStack" component={SpaClientAppStack} />
      </Stack.Navigator>
    </MyContextControllerProvider>
  );
};
export default AppStack;
