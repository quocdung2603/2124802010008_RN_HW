import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Platform,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Notification from '../../components/Notification';
import {useMyContextController} from '../../../Context/MyContextController';
import firestore from '@react-native-firebase/firestore';

interface ServiceDetailProps {
  route: any;
}

const ClientDetailService: React.FC<ServiceDetailProps> = ({route}) => {
  const {item} = route.params;
  const navigation = useNavigation<any>();
  const [controller] = useMyContextController();
  const {userLogin} = controller;

  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(
    item.dateTime ? item.dateTime.toDate() : new Date(),
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [isUpdating, setIsUpdating] = useState(!!item.docId);

  const handleAppointment = () => {
    setModalVisible(true);
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const onChangeTime = (event: any, selectedTime?: Date) => {
    const currentTime = selectedTime || date;
    setShowTimePicker(Platform.OS === 'ios');
    setDate(currentTime);
  };

  const confirmAppointment = async () => {
    if (!userLogin) {
      Alert.alert('Error', 'Please log in to book an appointment.');
      setModalVisible(false);
      return;
    }

    try {
      if (isUpdating) {
        await firestore()
          .collection('appointments')
          .doc(item.docId)
          .update({
            dateTime: firestore.Timestamp.fromDate(date),
            status: 'pending',
          });
        Alert.alert('Success', 'Appointment updated successfully!');
      } else {
        const appointmentData = {
          serviceId: item.id,
          userEmail: userLogin.email,
          userFullName: userLogin.fullName,
          dateTime: firestore.Timestamp.fromDate(date),
          status: 'pending',
          createdAt: firestore.Timestamp.now(),
        };
        await firestore().collection('appointments').add(appointmentData);
        Alert.alert('Success', 'Appointment booked successfully!');
      }
      setModalVisible(false);
      setNotificationVisible(true);
    } catch (error: any) {
      console.error('Error processing appointment:', error);
      Alert.alert('Error', 'Failed to process appointment: ' + error.message);
    }
  };

  const handlePayment = async () => {
    if (!userLogin) {
      Alert.alert('Error', 'Please log in to make a payment.');
      return;
    }

    if (!isUpdating || !item.docId) {
      Alert.alert(
        'Error',
        'Please save the appointment before making a payment.',
      );
      return;
    }

    try {
      const transactionData = {
        appointmentId: item.docId,
        userEmail: userLogin.email,
        userFullName: userLogin.fullName,
        serviceId: item.id,
        serviceTitle: item.title,
        amount: item.discountPrice || item.price, // Ưu tiên giá khuyến mãi nếu có
        status: 'completed',
        createdAt: firestore.Timestamp.now(),
      };
      await firestore().collection('transactions').add(transactionData);
      // Cập nhật trạng thái lịch hẹn thành "completed"
      await firestore().collection('appointments').doc(item.docId).update({
        status: 'completed',
      });
      Alert.alert('Success', 'Payment completed successfully!');
      navigation.goBack(); // Quay lại ClientAppointment
    } catch (error: any) {
      console.error('Error processing payment:', error);
      Alert.alert('Error', 'Failed to process payment: ' + error.message);
    }
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
          {isUpdating ? 'Update Appointment' : 'Profile'}
        </Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.text}>Title: {item.title}</Text>
        <Text style={styles.text}>Price: VND {item.price}</Text>
        {item.discountPrice && (
          <Text style={styles.text}>Discount: VND {item.discountPrice}</Text>
        )}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleAppointment}>
        <Text style={styles.buttonText}>
          {isUpdating ? 'Update Appointment' : 'Book Appointment'}
        </Text>
      </TouchableOpacity>
      {isUpdating && (
        <TouchableOpacity
          style={[styles.button, styles.paymentButton]}
          onPress={handlePayment}>
          <Text style={styles.buttonText}>Pay Now</Text>
        </TouchableOpacity>
      )}

      {/* Modal cho việc chọn ngày và giờ */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>
              {isUpdating ? 'Update Appointment' : 'Book Appointment'}
            </Text>
            <TouchableOpacity
              style={styles.pickerButton}
              onPress={() => setShowDatePicker(true)}>
              <Text style={styles.pickerText}>
                Date: {date.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onChangeDate}
              />
            )}
            <TouchableOpacity
              style={styles.pickerButton}
              onPress={() => setShowTimePicker(true)}>
              <Text style={styles.pickerText}>
                Time: {date.toLocaleTimeString()}
              </Text>
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                value={date}
                mode="time"
                display="default"
                onChange={onChangeTime}
              />
            )}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={confirmAppointment}>
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Notification
        message={
          isUpdating
            ? 'Appointment updated successfully!'
            : 'Appointment booked successfully!'
        }
        visible={notificationVisible}
        duration={2000}
        onHide={() => setNotificationVisible(false)}
        backgroundColor="#28a745"
        textColor="#fff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  detailContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    margin: 10,
  },
  text: {
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
  },
  button: {
    backgroundColor: 'hotpink',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    margin: 10,
  },
  paymentButton: {
    backgroundColor: '#28a745', // Màu xanh lá cho nút thanh toán
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
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
  pickerButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 10,
  },
  pickerText: {
    fontSize: 16,
    color: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  confirmButton: {
    backgroundColor: '#28a745',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
  },
});

export default ClientDetailService;
