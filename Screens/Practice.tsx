import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

interface PracticeProps {
  RouterName: string;
  ExerciseName: string;
}

const PracticeList: PracticeProps[] = [
  {
    RouterName: 'ExerciseList1',
    ExerciseName: 'LAB 1',
  },
  {
    RouterName: 'ExerciseList2',
    ExerciseName: 'LAB 2',
  },
];
const Practice = () => {
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

export default Practice;
