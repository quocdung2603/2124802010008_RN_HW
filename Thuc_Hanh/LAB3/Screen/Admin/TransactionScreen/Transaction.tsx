import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import TransactionItem from '../components/TransactionItem';

const Transaction = () => {
  const navigation = useNavigation<any>();
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('transactions')
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTransactions(data);
      });

    return () => unsubscribe();
  }, []);

  const handleItemPress = (item: any) => {
    navigation.navigate('TransactionDetail', {item});
  };

  const renderTransaction = ({item}: {item: any}) => (
    <TransactionItem item={item} onPress={() => handleItemPress(item)} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Transaction</Text>
      </View>
      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f5f5f5'},
  headerContainer: {
    width: '100%',
    minHeight: 100,
    flexDirection: 'row',
    backgroundColor: 'hotpink',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  headerText: {
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

export default Transaction;
