import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Login from '../screen/auth/Login';
import Register from '../screen/auth/Register';
import RestaurentAppDrawer from './RestaurentAppDrawer';
import {MyProvider} from '../context/AppContext';

const Stack = createNativeStackNavigator();
const RestaurentAppStack = () => {
  return (
    <MyProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ClientApp"
          component={RestaurentAppDrawer}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </MyProvider>
  );
};

export default RestaurentAppStack;
