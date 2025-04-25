import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import Login from '../Buoi_3/Login';
import Register from '../Buoi_3/Register';
import ResetPass from '../Buoi_3/ResetPass';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Drawer = createDrawerNavigator();

const getDrawerItemIcon =
  (icon: any) =>
  ({tintColor}: any) =>
    <MaterialIcons name={icon} size={22} style={{color: tintColor}} />;

const DemoDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Login"
        component={Login}
        options={{
          drawerIcon: getDrawerItemIcon('home'),
          title: 'Login',
        }}
      />
      <Drawer.Screen
        name="Register"
        component={Register}
        options={{
          drawerIcon: getDrawerItemIcon('light'),
          title: 'Register',
        }}
      />
      <Drawer.Screen
        name="ResetPass"
        component={ResetPass}
        options={{
          drawerIcon: getDrawerItemIcon('settings'),
          title: 'Reset Password',
        }}
      />
    </Drawer.Navigator>
  );
};

export default DemoDrawer;
