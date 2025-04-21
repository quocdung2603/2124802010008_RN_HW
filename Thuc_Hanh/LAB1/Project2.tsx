import {Alert, Text, TouchableOpacity} from 'react-native';

const Project2 = () => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: 'blue',
        padding: 10,
        alignItems: 'center',
        marginTop: 10,
      }}
      onPress={() => Alert.alert('Button 1 Pressed')}>
      <Text style={{color: 'white', fontSize: 18}}>Button 1</Text>
    </TouchableOpacity>
  );
};

export default Project2;
