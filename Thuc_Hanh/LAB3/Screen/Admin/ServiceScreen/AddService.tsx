import React, {useState} from 'react';
import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {useMyContextController} from '../../../Context/MyContextController';

const AddService = () => {
  const navigation = useNavigation<any>();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [controller] = useMyContextController();
  const {userLogin} = controller;

  const handleAddService = async () => {
    if (!name || !price) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    if (!userLogin) {
      Alert.alert('Error', 'User not logged in.');
      return;
    }

    try {
      const serviceId = firestore().collection('services').doc().id; // Tạo ID ngẫu nhiên
      const currentTimestamp = firestore.Timestamp.now();
      await firestore()
        .collection('services')
        .add({
          id: serviceId, // Thêm trường id
          title: name,
          price: price,
          addedBy: userLogin.fullName || 'Unknown',
          createdAt: currentTimestamp,
          updatedAt: currentTimestamp,
        });
      Alert.alert('Success', 'Service added successfully!');
      navigation.goBack();
    } catch (error: any) {
      console.error('Error adding service:', error);
      Alert.alert('Error', 'Failed to add service: ' + error.message);
    }
  };

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <View
        style={{
          width: '100%',
          minHeight: 100,
          flexDirection: 'row',
          backgroundColor: 'hotpink',
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{marginTop: 'auto', marginRight: 'auto'}}>
          <FontAwesome name="arrow-left" size={30} color={'#fff'} />
        </TouchableOpacity>

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
          keyboardType="numeric"
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
        }}
        onPress={handleAddService}>
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
