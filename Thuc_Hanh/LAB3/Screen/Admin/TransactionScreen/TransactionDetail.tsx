import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';

interface TransactionDetailProps {
  route: any;
  navigation: any;
}

const TransactionDetail: React.FC<TransactionDetailProps> = ({
  route,
  navigation,
}) => {
  const {item} = route.params;
  const [transaction, setTransaction] = useState(item);

  // Hàm cập nhật trạng thái lên Firestore
  const updateTransactionStatus = async (newStatus: string) => {
    try {
      await firestore()
        .collection('transactions')
        .doc(transaction.id)
        .update({status: newStatus});

      setTransaction((prev: any) => ({...prev, status: newStatus}));

      Alert.alert('Success', `Status updated to "${newStatus}"`);
    } catch (error) {
      console.error(`Error updating status to ${newStatus}:`, error);
      Alert.alert('Error', 'Could not update transaction status');
    }
  };

  // Hàm xử lý Accept
  const handleAccept = () => {
    updateTransactionStatus('Accepted');
  };

  // Hàm xử lý Update (ví dụ: chuyển sang Completed)
  const handleUpdate = () => {
    updateTransactionStatus('Completed');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Transaction Detail</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.text}>Customer: {transaction.customer}</Text>
        <Text style={styles.text}>Service: {transaction.service}</Text>
        <Text style={styles.text}>Date: {transaction.date}</Text>
        <Text style={styles.text}>Status: {transaction.status}</Text>
      </View>

      <View style={styles.buttonContainer}>
        {transaction.status === 'Pending' && (
          <TouchableOpacity
            style={[styles.button, styles.acceptButton]}
            onPress={handleAccept}>
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
        )}
        {transaction.status !== 'Completed' && (
          <TouchableOpacity
            style={[styles.button, styles.updateButton]}
            onPress={handleUpdate}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
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
  detailContainer: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    marginVertical: 8,
  },
  acceptButton: {
    backgroundColor: '#28a745',
  },
  updateButton: {
    backgroundColor: '#007bff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default TransactionDetail;
