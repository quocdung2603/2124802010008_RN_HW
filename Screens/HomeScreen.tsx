import {useNavigation} from '@react-navigation/native';
import {Text, TouchableOpacity, View} from 'react-native';

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <Text>Nguyễn Quốc Dũng - 2124802010008</Text>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: 'aqua',
            backgroundColor: 'aqua',
            padding: 10,
            margin: 10,
          }}
          onPress={() => navigation.navigate('Theory' as never)}>
          <Text>Lý Thuyết</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: 'yellow',
            backgroundColor: 'yellow',
            padding: 10,
            margin: 10,
          }}
          onPress={() => navigation.navigate('Practice' as never)}>
          <Text>Thực Hành</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
