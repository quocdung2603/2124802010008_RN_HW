import {useState} from 'react';
import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';

const Project7 = () => {
  const [name, setName] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.label}>What is your name ?</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholder="enter your name"
      />
      <Button
        title="Say hello"
        onPress={() => {
          Alert.alert(`Hello ${name}`);
        }}
      />
    </View>
  );
};

export default Project7;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  input: {
    marginTop: 10,
    backgroundColor: 'rgba(0,0,0,0,1)',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    marginVertical: 10,
  },
});
