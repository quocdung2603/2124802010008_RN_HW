import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import Login from './Login';
import Register from './Register';
import HomeScreen from './HomeScreen';
import AddNote from './AddNote';
import DetailNote from './DetailNote';
import {store} from './Redux/store';
import UpdateNote from './UpdateNote';

const Stack = createNativeStackNavigator();

const TodoAppStack = () => {
  return (
    <Provider store={store}>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddNote" component={AddNote} />
        <Stack.Screen name="DetailNote" component={DetailNote} />
        <Stack.Screen name="UpdateNote" component={UpdateNote} />
      </Stack.Navigator>
    </Provider>
  );
};

export default TodoAppStack;
