import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const AddService = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('0');

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
      }}>
      <View
        style={{
          width: '100%',
          minHeight: 100,
          flexDirection: 'row',
          backgroundColor: 'hotpink',
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}>
        <View
          style={{
            marginTop: 'auto',
            marginRight: 'auto',
          }}>
          <FontAwesome name="arrow-left" size={30} color={'#fff'} />
        </View>

        <Text
          style={{
            marginTop: 'auto',
            fontSize: 20,
            fontWeight: 'bold',
            color: '#fff',
            marginRight: 'auto',
          }}>
          Service
        </Text>
      </View>
      <View style={{marginVertical: 10, marginHorizontal: 10}}>
        <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
          Service Name *
        </Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Service Name"
          style={{
            borderRadius: 10,
            padding: 10,
            backgroundColor: 'lightgray',
          }}
        />
      </View>
      <View style={{marginVertical: 10, marginHorizontal: 10}}>
        <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
          Price *
        </Text>
        <TextInput
          value={price}
          onChangeText={setPrice}
          placeholder="Price"
          style={{
            borderRadius: 10,
            padding: 10,
            backgroundColor: 'lightgray',
          }}
        />
      </View>
      <TouchableOpacity
        style={{
          marginVertical: 20,
          marginHorizontal: 10,
          backgroundColor: 'hotpink',
          padding: 10,
          borderRadius: 10,
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
          }}>
          Add
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddService;
