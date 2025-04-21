import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HW1 from '../Ly_Thuyet/Buoi_1/HW1';
import BT_Buoi2 from '../Ly_Thuyet/Buoi_2/BT_Buoi2';
import HW3 from '../Ly_Thuyet/Buoi_3/HW3';
import Theory from '../Screens/Theory';
import {Title} from 'react-native-paper';

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
    </Stack.Navigator>
  );
};

export default TheoryStack;
