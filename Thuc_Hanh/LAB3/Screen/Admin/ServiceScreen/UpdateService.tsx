import React, {useState} from 'react';
import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import {useNavigation, useRoute} from '@react-navigation/native';

const UpdateService = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const {item} = route.params; // Lấy dữ liệu dịch vụ từ params

  const [name, setName] = useState(item.title);
  const [price, setPrice] = useState(item.price);

  const handleUpdateService = async () => {
    if (!name || !price) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    try {
      // Tìm document trong Firestore dựa trên trường id
      const querySnapshot = await firestore()
        .collection('services')
        .where('id', '==', item.id)
        .get();
      if (querySnapshot.empty) {
        Alert.alert('Error', 'Service not found in Firestore.');
        return;
      }
      const docId = querySnapshot.docs[0].id;

      // Cập nhật dịch vụ
      await firestore().collection('services').doc(docId).update({
        title: name,
        price: price,
        updatedAt: firestore.Timestamp.now(),
      });
      Alert.alert('Success', 'Service updated successfully!');
      navigation.navigate('Home'); // Quay lại DetailService
    } catch (error: any) {
      console.error('Error updating service:', error);
      Alert.alert('Error', 'Failed to update service: ' + error.message);
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
          Update Service
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
        onPress={handleUpdateService}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
          }}>
          Update
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default UpdateService;
