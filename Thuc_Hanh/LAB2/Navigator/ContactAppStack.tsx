import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ContactApp from '../ContactApp';
import Profile from '../Profile';
import React from 'react';

const Stack = createNativeStackNavigator();

const ContactAppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Contacts"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Contacts" component={ContactApp} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default ContactAppStack;
