import {Text, View} from 'react-native';

const Project5 = () => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
      }}>
      <View
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'aqua',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Square 1</Text>
      </View>
      <View
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'lightblue',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Square 1</Text>
      </View>
      <View
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'violet',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Square 1</Text>
      </View>
    </View>
  );
};

export default Project5;
