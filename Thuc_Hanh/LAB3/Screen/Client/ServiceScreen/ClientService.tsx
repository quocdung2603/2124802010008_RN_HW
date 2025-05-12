import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ClientServiceItem from './ClientServiceItem';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';

const ClientService = () => {
  const navigation = useNavigation<any>();
  const [searchQuery, setSearchQuery] = useState('');
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('services')
      .onSnapshot(
        querySnapshot => {
          const servicesList = querySnapshot.docs.map(doc => ({
            id: doc.data().id,
            title: doc.data().title,
            price: doc.data().price,
            discountPrice: doc.data().discountPrice || null, // Nếu không có discountPrice, trả về null
            addedBy: doc.data().addedBy,
            createdAt: doc.data().createdAt,
            updatedAt: doc.data().updatedAt,
          }));
          setServices(servicesList);
        },
        error => {
          console.error('Error fetching services: ', error);
          Alert.alert('Error', 'Failed to load services.');
        },
      );

    return () => unsubscribe();
  }, []);

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleServicePress = (item: any) => {
    navigation.navigate('ClientDetailService', {item});
  };

  const renderService = ({item}: {item: any}) => (
    <ClientServiceItem item={item} onPress={() => handleServicePress(item)} />
  );

  return (
    <View style={styles.container}>
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
          style={{
            marginTop: 'auto',
            marginLeft: 'auto',
          }}>
          <FontAwesome name="cog" size={30} color={'#fff'} />
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by service name..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredServices}
        renderItem={renderService}
        keyExtractor={item => item.id}
        numColumns={2}
        style={styles.list}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
    margin: 10,
  },
  list: {
    flex: 1,
    marginHorizontal: 5,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});

export default ClientService;
