import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {useMyContextController} from '../../../Context/MyContextController';

const ClientAppointment = () => {
  const navigation = useNavigation<any>();
  const [controller] = useMyContextController();
  const {userLogin} = controller;
  const [appointments, setAppointments] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]); // Lưu danh sách dịch vụ để ánh xạ serviceId

  // Lấy danh sách dịch vụ để ánh xạ serviceId sang tên dịch vụ
  useEffect(() => {
    const unsubscribeServices = firestore()
      .collection('services')
      .onSnapshot(snapshot => {
        const servicesList = snapshot.docs.map(doc => ({
          id: doc.data().id,
          title: doc.data().title,
        }));
        setServices(servicesList);
      });
    return () => unsubscribeServices();
  }, []);

  // Lấy danh sách lịch hẹn của người dùng
  useEffect(() => {
    if (!userLogin) return;

    const unsubscribeAppointments = firestore()
      .collection('appointments')
      .where('userEmail', '==', userLogin.email)
      .onSnapshot(
        snapshot => {
          const appointmentsList = snapshot.docs.map(doc => ({
            docId: doc.id, // Lưu docId để xóa/cập nhật
            ...doc.data(),
          }));
          setAppointments(appointmentsList);
        },
        error => {
          console.error('Error fetching appointments:', error);
          Alert.alert('Error', 'Failed to load appointments.');
        },
      );
    return () => unsubscribeAppointments();
  }, [userLogin]);

  const handleDelete = (docId: string) => {
    Alert.alert(
      'Confirm',
      'Are you sure you want to delete this appointment?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Yes',
          onPress: async () => {
            try {
              await firestore().collection('appointments').doc(docId).delete();
              Alert.alert('Success', 'Appointment deleted successfully!');
            } catch (error: any) {
              console.error('Error deleting appointment:', error);
              Alert.alert(
                'Error',
                'Failed to delete appointment: ' + error.message,
              );
            }
          },
        },
      ],
    );
  };

  const handleUpdate = (appointment: any) => {
    navigation.navigate('ClientDetailService', {
      item: {
        id: appointment.serviceId,
        title:
          services.find((s: any) => s.id === appointment.serviceId)?.title ||
          'Unknown Service',
        dateTime: appointment.dateTime,
        status: appointment.status,
        docId: appointment.docId,
      },
    });
  };

  const renderAppointment = ({item}: {item: any}) => {
    const serviceTitle =
      services.find((s: any) => s.id === item.serviceId)?.title ||
      'Unknown Service';
    return (
      <View style={styles.appointmentItem}>
        <View style={styles.appointmentInfo}>
          <Text style={styles.text}>Service: {serviceTitle}</Text>
          <Text style={styles.text}>
            Date: {item.dateTime?.toDate().toLocaleString()}
          </Text>
          <Text style={styles.text}>Status: {item.status}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={() => handleDelete(item.docId)}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.updateButton]}
            onPress={() => handleUpdate(item)}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

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
            marginLeft: 'auto',
          }}>
          Appointment
        </Text>
      </View>
      {appointments.length === 0 ? (
        <Text style={{textAlign: 'center', marginTop: 20, fontSize: 16}}>
          No appointments found.
        </Text>
      ) : (
        <FlatList
          data={appointments}
          renderItem={renderAppointment}
          keyExtractor={item => item.docId}
          style={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    flex: 1,
    margin: 10,
  },
  appointmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginVertical: 10,
  },
  appointmentInfo: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginVertical: 4,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  updateButton: {
    backgroundColor: '#007bff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default ClientAppointment;
