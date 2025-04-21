import {Text, View} from 'react-native';
import MyButton from './MyButton';
import {useState} from 'react';

const Project4 = () => {
  const [count, setCount] = useState<number>(0);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 18, textAlign: 'center'}}>
        Số lần bấm là: {count} lần
      </Text>
      <MyButton
        onPress={() => {
          setCount(count + 1);
        }}
        text={'Bấm đi'}></MyButton>
    </View>
  );
};

export default Project4;
