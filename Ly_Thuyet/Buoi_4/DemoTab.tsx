import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import React from 'react';
import Login from '../Buoi_3/Login';
import Register from '../Buoi_3/Register';
import ResetPass from '../Buoi_3/ResetPass';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createMaterialBottomTabNavigator();

const getTabBarIcon =
  (icon: any) =>
  ({tintColor}: any) =>
    <MaterialIcons name={icon} size={26} style={{color: tintColor}} />;

const DemoTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          tabBarIcon: getTabBarIcon('home'),
          tabBarLabel: 'Login',
        }}
      />
      <Tab.Screen
        name="Register"
        component={Register}
        options={{
          tabBarIcon: getTabBarIcon('light'),
          tabBarLabel: 'Register',
        }}
      />
      <Tab.Screen
        name="ResetPass"
        component={ResetPass}
        options={{
          tabBarIcon: getTabBarIcon('settings'),
          tabBarLabel: 'Reset Password',
        }}
      />
    </Tab.Navigator>
  );
};

export default DemoTab;
