import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

interface ExerciseProps {
  RouterName: string;
  ExerciseName: string;
}

const ExerciseList: ExerciseProps[] = [
  {
    RouterName: 'SpaApp',
    ExerciseName: 'Kami Spa App',
  },
];

const ExerciseList3 = () => {
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

export default ExerciseList3;
