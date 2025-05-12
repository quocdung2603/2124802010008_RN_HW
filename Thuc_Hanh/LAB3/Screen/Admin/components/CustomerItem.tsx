import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

interface CustomerItemProps {
  item: any;
  onPress: () => void;
}

const CustomerItem: React.FC<CustomerItemProps> = ({item, onPress}) => {
  return (
    <TouchableOpacity style={styles.customerItem} onPress={onPress}>
      <View style={styles.customerInfo}>
        <Text style={styles.text}>Name: {item.fullName}</Text>
        <Text style={styles.text}>Phone: {item.phone}</Text>
        <Text style={styles.text}>Email: {item.email}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  customerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  customerInfo: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
});

export default CustomerItem;
