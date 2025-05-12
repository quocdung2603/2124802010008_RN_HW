import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

interface CustomerDetailProps {
  route: any;
  navigation: any;
}

const CustomerDetailScreen: React.FC<CustomerDetailProps> = ({
  route,
  navigation,
}) => {
  const {item} = route.params;
  const [modalVisible, setModalVisible] = useState(false);

  const handleBan = async () => {
    try {
      await firestore().collection('USERS').doc(item.id).delete(); // 🔥 Xóa khỏi Firestore
      setModalVisible(false);
      navigation.goBack(); // Quay lại danh sách sau khi xóa
    } catch (error) {
      console.error('Error deleting customer:', error);
      Alert.alert('Error', 'Failed to ban customer. Please try again.');
    }
  };

  const handleUpdate = () => {
    navigation.navigate('UpdateCustomer', {customer: item});
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Customer Detail</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.text}>Name: {item.fullName}</Text>
        <Text style={styles.text}>Phone: {item.phone}</Text>
        <Text style={styles.text}>Email: {item.email}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.updateButton]}
          onPress={handleUpdate}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.banButton]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Ban</Text>
        </TouchableOpacity>
      </View>

      {/* Modal xác nhận Ban */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Confirm Ban</Text>
            <Text style={styles.modalText}>
              Are you sure you want to ban this customer?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={handleBan}>
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  detailContainer: {
    padding: 16,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  updateButton: {
    backgroundColor: '#007bff',
  },
  banButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  confirmButton: {
    backgroundColor: '#dc3545',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  },
});

export default CustomerDetailScreen;
