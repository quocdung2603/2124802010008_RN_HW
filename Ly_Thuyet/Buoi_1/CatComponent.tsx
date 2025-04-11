import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

interface CatComponentProps {
  name: string;
  isHungry: boolean;
  age: number;
  onFeedCat?: () => void;
}

const CatComponent: React.FC<CatComponentProps> = ({...props}) => {
  return (
    <View style={{marginTop: 20}}>
      <Text style={style.text}>Cat Name: {props.name}</Text>
      <Text style={style.text}>Cat Age: {props.age}</Text>
      <Text style={style.text}>
        Is Cat Hungry: {props.isHungry ? 'Yes' : 'No'}
      </Text>
      <Button title="Feed the Cat" onPress={props.onFeedCat} />
    </View>
  );
};

const style = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'blue',
  },
});

export default CatComponent;
