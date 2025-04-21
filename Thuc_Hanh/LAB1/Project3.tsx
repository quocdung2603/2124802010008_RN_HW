import {Alert} from 'react-native';
import MyButton from './MyButton';

const Project3 = () => {
  const handlePress = () => {
    Alert.alert('Button Pressed!', 'You have pressed the button.');
  };
  return (
    <MyButton
      onPress={handlePress}
      text="Hello"
      buttonStyle={{borderColor: 'bkack'}}
    />
  );
};

export default Project3;
