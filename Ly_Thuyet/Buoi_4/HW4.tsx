import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

interface RouterProps {
  RouterName: string;
  ExerciseName: string;
}

const RouterList: RouterProps[] = [
  {
    RouterName: 'DemoStack',
    ExerciseName: 'Demo Stack Navigator',
  },
  {
    RouterName: 'DemoTab',
    ExerciseName: 'Demo Bottom Tab Navigator',
  },
  {
    RouterName: 'DemoDrawer',
    ExerciseName: 'Demo Drawer Navigator',
  },
];

const HW4 = () => {
  const navigation = useNavigation();
  return (
    <View style={{padding: 20}}>
      {RouterList.map((item, index) => (
        <TouchableOpacity
          key={index + 0}
          onPress={() => navigation.navigate(`${item.RouterName}` as never)}
          style={{marginBottom: 10, padding: 10, backgroundColor: '#eee'}}>
          <Text>{item.ExerciseName}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default HW4;
