import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../Screens/HomeScreen';
import PracticeStack from './PracticeStack';
import TheoryStack from './TheoryStack';

const Stack = createNativeStackNavigator();

const RootNavigator = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Theory"
      component={TheoryStack}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Practice"
      component={PracticeStack}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

export default RootNavigator;
