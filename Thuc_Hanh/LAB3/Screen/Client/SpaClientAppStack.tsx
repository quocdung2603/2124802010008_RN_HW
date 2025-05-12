import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ClientService from './ServiceScreen/ClientService';
import ClientAppointment from './AppointmentScreen/ClientAppointment';
import ClientDetailService from './ServiceScreen/ClientDetailService';
import ClientProfile from './ProfileScreen/ClientProfile';

const getTabBarIcon =
  (icon: any) =>
  ({tintColor}: any) =>
    <MaterialIcons name={icon} size={26} style={{color: tintColor}} />;

const Stack = createNativeStackNavigator();
const ServiceStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ClientService"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ClientService" component={ClientService} />
      <Stack.Screen
        name="ClientDetailService"
        component={ClientDetailService}
      />
    </Stack.Navigator>
  );
};

const AppointmentStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ClientAppointment"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ClientAppointment" component={ClientAppointment} />
      <Stack.Screen
        name="ClientDetailService"
        component={ClientDetailService}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ClientProfile"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ClientProfile" component={ClientProfile} />
    </Stack.Navigator>
  );
};

const Tab = createMaterialBottomTabNavigator();
const SpaClientAppStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="ServiceStack"
        component={ServiceStack}
        options={{
          tabBarIcon: getTabBarIcon('home-filled'),
          tabBarLabel: 'Service',
        }}
      />
      <Tab.Screen
        name="AppointmentStack"
        component={AppointmentStack}
        options={{
          tabBarIcon: getTabBarIcon('credit-card'),
          tabBarLabel: 'Appointment',
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarIcon: getTabBarIcon('supervised-user-circle'),
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

export default SpaClientAppStack;
