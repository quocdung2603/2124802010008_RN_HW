import {ScrollView, Text, View} from 'react-native';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Project6 = () => {
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      {data.map((index, item) => (
        <View
          key={index + 0}
          style={{
            width: 100,
            height: 100,
            backgroundColor: 'violet',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
          }}>
          <Text>Square {item + 1}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default Project6;
