import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

interface PracticeProps {
  RouterName: string;
  ExerciseName: string;
}

const PracticeList: PracticeProps[] = [
  {
    RouterName: 'Buoi1',
    ExerciseName: 'Buổi 1',
  },
  {
    RouterName: 'Buoi2',
    ExerciseName: 'Buổi 2',
  },
  {
    RouterName: 'Buoi3',
    ExerciseName: 'Buổi 3',
  },
  {
    RouterName: 'Buoi4',
    ExerciseName: 'Buổi 4',
  },
  {
    RouterName: 'Buoi5',
    ExerciseName: 'Buổi 5',
  },
];
const Theory = () => {
  const navigation = useNavigation();
  return (
    <View style={{padding: 20}}>
      {PracticeList.map((item, index) => (
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

export default Theory;
