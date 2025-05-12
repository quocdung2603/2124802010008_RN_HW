import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

interface TransactionItemProps {
  item: any;
  onPress: () => void; // Thêm prop để xử lý khi nhấn vào item
}

const TransactionItem: React.FC<TransactionItemProps> = ({item, onPress}) => {
  return (
    <TouchableOpacity style={styles.transactionItem} onPress={onPress}>
      <View style={styles.transactionInfo}>
        <Text style={styles.text}>Customer: {item.customer}</Text>
        <Text style={styles.text}>Service: {item.service}</Text>
        <Text style={styles.text}>Date: {item.date}</Text>
        <Text style={styles.text}>Status: {item.status}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  transactionItem: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  transactionInfo: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
});

export default TransactionItem;
