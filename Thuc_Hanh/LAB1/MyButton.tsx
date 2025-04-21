import {Text, TouchableOpacity} from 'react-native';

interface MyButtonProps {
  onPress: () => void;
  text: string;
  buttonStyle?: object;
}

const MyButton: React.FC<MyButtonProps> = ({...props}) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        backgroundColor: '#ff637c',
        alignSelf: 'center',
        padding: 10,
        margin: 10,
        ...props.buttonStyle,
      }}>
      <Text style={{color: '#ffffff'}}>{props.text}</Text>
    </TouchableOpacity>
  );
};

export default MyButton;
