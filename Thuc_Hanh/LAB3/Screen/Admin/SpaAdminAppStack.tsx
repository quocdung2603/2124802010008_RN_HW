import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Transaction from './TransactionScreen/Transaction';
import Profile from './ProfileScreen/Profile';
import Home from './ServiceScreen/Home';
import Customer from './CustomerScreen/Customer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddService from './ServiceScreen/AddService';
import UpdateService from './ServiceScreen/UpdateService';
import DetailService from './ServiceScreen/DetailService';
import TransactionDetail from './TransactionScreen/TransactionDetail';
import CustomerDetailScreen from './CustomerScreen/CustomerDetail';
import UpdateCustomer from './CustomerScreen/UpdateCustomer';

const getTabBarIcon =
  (icon: any) =>
  ({tintColor}: any) =>
    <MaterialIcons name={icon} size={26} style={{color: tintColor}} />;

const Stack = createNativeStackNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AddService" component={AddService} />
      <Stack.Screen name="UpdateService" component={UpdateService} />
      <Stack.Screen name="DetailService" component={DetailService} />
    </Stack.Navigator>
  );
};

const TransactionStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Transaction"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Transaction" component={Transaction} />
      <Stack.Screen name="TransactionDetail" component={TransactionDetail} />
    </Stack.Navigator>
  );
};

const CustomerStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Customer"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Customer" component={Customer} />
      <Stack.Screen name="CustomerDetail" component={CustomerDetailScreen} />
      <Stack.Screen name="UpdateCustomer" component={UpdateCustomer} />
    </Stack.Navigator>
  );
};

const Tab = createMaterialBottomTabNavigator();
const SpaAdminAppStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarIcon: getTabBarIcon('home-filled'),
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="TransactionStack"
        component={TransactionStack}
        options={{
          tabBarIcon: getTabBarIcon('credit-card'),
          tabBarLabel: 'Transaction',
        }}
      />
      <Tab.Screen
        name="CustomerStack"
        component={CustomerStack}
        options={{
          tabBarIcon: getTabBarIcon('supervised-user-circle'),
          tabBarLabel: 'Customer',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: getTabBarIcon('account-circle'),
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

export default SpaAdminAppStack;
