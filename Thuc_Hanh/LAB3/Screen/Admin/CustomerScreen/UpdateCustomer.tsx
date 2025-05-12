import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

interface UpdateCustomerProps {
  route: any;
  navigation: any;
}

const UpdateCustomer: React.FC<UpdateCustomerProps> = ({route, navigation}) => {
  const {customer, setCustomers} = route.params;
  const [name, setName] = useState(customer.fullName);
  const [phone, setPhone] = useState(customer.phone);
  const [email, setEmail] = useState(customer.email);

  const saveUpdate = async () => {
    try {
      await firestore().collection('customers').doc(customer.id).update({
        name,
        phone,
        email,
      });

      // Cập nhật danh sách local
      setCustomers((prev: any[]) =>
        prev.map((item: any) =>
          item.id === customer.id ? {...item, name, phone, email} : item,
        ),
      );

      Alert.alert('Success', 'Customer updated successfully!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update customer.');
      console.error('Update error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Update Customer</Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Name"
        />
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Phone"
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={saveUpdate}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  formContainer: {
    padding: 16,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  saveButton: {
    backgroundColor: '#28a745',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default UpdateCustomer;
