import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

interface ExerciseProps {
  RouterName: string;
  ExerciseName: string;
}

const ExerciseList: ExerciseProps[] = [
  {
    RouterName: 'Project1',
    ExerciseName: 'Bài 1',
  },
  {
    RouterName: 'Project2',
    ExerciseName: 'Bài 2',
  },
  {
    RouterName: 'Project3',
    ExerciseName: 'Bài 3',
  },
  {
    RouterName: 'Project4',
    ExerciseName: 'Bài 4',
  },
  {
    RouterName: 'Project5',
    ExerciseName: 'Bài 5',
  },
  {
    RouterName: 'Project6',
    ExerciseName: 'Bài 6',
  },
  {
    RouterName: 'Project7',
    ExerciseName: 'Bài 7',
  },
  {
    RouterName: 'Project8',
    ExerciseName: 'Bài 8',
  },
  {
    RouterName: 'CaculatorApp',
    ExerciseName: 'Caculator App',
  },
];

const ExerciseList1 = () => {
  const navigation = useNavigation();

  return (
    <View style={{padding: 20}}>
      {ExerciseList.map((item, index) => (
        <TouchableOpacity
          key={index + 0}
          onPress={() => navigation.navigate(`${item.RouterName}` as never)}
          style={{marginBottom: 10, padding: 10, backgroundColor: '#ddd'}}>
          <Text>{item.ExerciseName}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ExerciseList1;
