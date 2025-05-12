import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import CustomerItem from '../components/CustomerItem';

const Customer = () => {
  const navigation = useNavigation<any>();
  const [customers, setCustomers] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('USERS')
      .where('role', '==', 'customer') // 🔍 Lọc user theo role
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCustomers(data);
      });

    return () => unsubscribe(); // Dọn listener khi unmount
  }, []);

  const handleItemPress = (item: any) => {
    navigation.navigate('CustomerDetail', {item});
  };

  const renderCustomer = ({item}: {item: any}) => (
    <CustomerItem item={item} onPress={() => handleItemPress(item)} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Customer</Text>
      </View>
      <FlatList
        data={customers}
        renderItem={renderCustomer}
        keyExtractor={item => item.id}
        style={styles.list}
        ListEmptyComponent={
          <Text style={{textAlign: 'center', marginTop: 20}}>
            No customers found.
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    width: '100%',
    minHeight: 100,
    flexDirection: 'row',
    backgroundColor: 'hotpink',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  header: {
    marginTop: 'auto',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  list: {
    flex: 1,
    margin: 10,
  },
});

export default Customer;
