import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

// Ngày giờ hiện tại
const currentDateTime = '08:44 AM +07, Friday, May 16, 2025';

const PaymentScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  // Nhận totalPay từ CartScreen qua route.params, nếu không có thì dùng giá trị mặc định
  const {totalPay}: any = route.params || {totalPay: 1147.08};

  return (
    <View style={styles.container}>
      {/* Biểu tượng dấu kiểm */}
      <View style={styles.checkIconContainer}>
        <Icon name="check" size={40} color="#fff" />
      </View>

      {/* Tiêu đề */}
      <Text style={styles.title}>Payment Successful</Text>

      {/* Thông báo cảm ơn */}
      <Text style={styles.message}>Thank You for Your Order</Text>

      {/* Thông tin chi tiết */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Amount Paid:</Text>
          <Text style={styles.detailValue}>${totalPay.toFixed(2)}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Payment Method:</Text>
          <Text style={styles.detailValue}>Cash</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Date & Time:</Text>
          <Text style={styles.detailValue}>{currentDateTime}</Text>
        </View>
      </View>

      {/* Nút Done */}
      <TouchableOpacity
        style={styles.doneButton}
        onPress={() => navigation.navigate('HomeScreen')}>
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  checkIconContainer: {
    backgroundColor: '#28a745', // Màu xanh lá cho biểu tượng dấu kiểm
    width: 80,
    height: 80,
    borderRadius: 40, // Hình tròn
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000', // Màu đen như trong hình
    marginBottom: 10,
  },
  message: {
    fontSize: 18,
    color: '#333',
    marginBottom: 30,
  },
  detailsContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  detailLabel: {
    fontSize: 16,
    color: '#555',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  doneButton: {
    backgroundColor: '#28a745', // Màu xanh lá
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PaymentScreen;
