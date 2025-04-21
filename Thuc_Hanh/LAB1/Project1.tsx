import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

const Project1 = () => {
  return (
    <View style={styles.views}>
      <Text style={styles.texts}>Hello world!</Text>
    </View>
  );
};

export default Project1;

const styles = StyleSheet.create({
  containers: {
    flex: 1,
    backgroundColor: 'white',
  },
  views: {
    width: 100,
    height: 100,
    backgroundColor: 'aqua',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texts: {
    color: '#000',
  },
});
