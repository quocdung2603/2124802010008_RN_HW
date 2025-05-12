import React, {useState, useEffect} from 'react';
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ServiceItem from '../components/ServiceItem';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore'; // Import Firestore

const Home = () => {
  const navigation = useNavigation<any>();
  const [services, setServices] = useState<any[]>([]); // Lưu danh sách dịch vụ từ Firestore

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('services')
      .onSnapshot(
        querySnapshot => {
          const servicesList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setServices(servicesList);
        },
        error => {
          console.error('Error fetching services: ', error);
          Alert.alert('Error', 'Failed to load services.');
        },
      );

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const handlePress = (item: any) => {
    navigation.navigate('DetailService', {item});
    console.log('Pressed item:', item.title);
  };

  const handleAddService = () => {
    navigation.navigate('AddService' as never);
  };

  const renderItem = ({item}: {item: any}) => (
    <ServiceItem
      title={item.title}
      price={item.price}
      onPress={() => handlePress(item)}
    />
  );

  return (
    <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
      <View
        style={{
          width: '100%',
          minHeight: 100,
          flexDirection: 'row',
          backgroundColor: 'hotpink',
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}>
        <Text
          style={{
            marginTop: 'auto',
            fontSize: 20,
            fontWeight: 'bold',
            color: '#fff',
            marginRight: 'auto',
          }}>
          QUỐC DŨNG
        </Text>
        <TouchableOpacity
          onPress={() => Alert.alert('gaga')}
          style={{marginTop: 'auto', marginLeft: 'auto'}}>
          <FontAwesome name="cog" size={30} color={'#fff'} />
        </TouchableOpacity>
      </View>
      <View
        style={{width: '100%', flexDirection: 'row', justifyContent: 'center'}}>
        <Image
          source={require('../../../../../Asset/logolab3.png')}
          style={{width: 200, height: 100, resizeMode: 'contain'}}
        />
      </View>
      <View
        style={{
          width: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center',
            paddingHorizontal: 10,
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000'}}>
            Danh sách dịch vụ
          </Text>
          <TouchableOpacity onPress={handleAddService}>
            <FontAwesome name="plus-circle" size={30} color={'hotpink'} />
          </TouchableOpacity>
        </View>
        <FlatList
          style={{margin: 10, maxHeight: 550}}
          data={services}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default Home;
