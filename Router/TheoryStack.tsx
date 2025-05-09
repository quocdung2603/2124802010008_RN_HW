import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HW1 from '../Ly_Thuyet/Buoi_1/HW1';
import BT_Buoi2 from '../Ly_Thuyet/Buoi_2/BT_Buoi2';
import HW3 from '../Ly_Thuyet/Buoi_3/HW3';
import Theory from '../Screens/Theory';
import React from 'react';
import HW4 from '../Ly_Thuyet/Buoi_4/HW4';
import {Title} from 'react-native-paper';
import DemoStack from '../Ly_Thuyet/Buoi_4/DemoStack';
import DemoTab from '../Ly_Thuyet/Buoi_4/DemoTab';
import DemoDrawer from '../Ly_Thuyet/Buoi_4/DemoDrawer';
import TodoAppStack from '../Ly_Thuyet/Buoi_5/TodoAppStack';

const Stack = createNativeStackNavigator();

const TheoryStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TheoryHome"
        component={Theory}
        options={{title: 'Danh sách bài tập trên lớp'}}
      />
      <Stack.Screen
        name="Buoi1"
        component={HW1}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Buoi2"
        component={BT_Buoi2}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Buoi3"
        component={HW3}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Buoi4"
        component={HW4}
        options={{title: 'Demo Navigator'}}
      />
      <Stack.Screen
        name="DemoStack"
        component={DemoStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DemoTab"
        component={DemoTab}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DemoDrawer"
        component={DemoDrawer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Buoi5"
        component={TodoAppStack}
        options={{title: 'Todo App'}}
      />
    </Stack.Navigator>
  );
};

export default TheoryStack;
