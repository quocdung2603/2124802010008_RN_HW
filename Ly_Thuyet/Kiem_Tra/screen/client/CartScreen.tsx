import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Dữ liệu giả lập giỏ hàng, thêm unitPrice
const initialCartItems = [
  {
    id: '1',
    name: 'Fajita Chicken Burrito',
    quantity: 3,
    unitPrice: 275,
    price: 825,
  }, // unitPrice = 825 / 3
  {id: '2', name: 'Gulab Jamun', quantity: 2, unitPrice: 63, price: 126}, // unitPrice = 126 / 2
  {id: '3', name: 'Noodles', quantity: 1, unitPrice: 100, price: 100}, // unitPrice = 100 / 1
];

// Tỷ lệ thuế
const TAX_RATE = 0.08; // 8%

const CartScreen = () => {
  const navigation = useNavigation<any>();
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [billDetails, setBillDetails] = useState({
    itemsTotal: 1051,
    offerDiscount: -18,
    taxes: 84.08,
    deliveryCharges: 30,
    totalPay: 1147.08,
  });

  // Hàm tính toán hóa đơn dựa trên giỏ hàng
  const calculateBill = (items: any) => {
    const itemsTotal = items.reduce(
      (total: any, item: any) => total + item.price,
      0,
    );
    const taxes = itemsTotal * TAX_RATE;
    const deliveryCharges = 30; // Cố định
    const offerDiscount = -18; // Cố định
    const totalPay = itemsTotal + taxes + deliveryCharges + offerDiscount;

    return {
      itemsTotal,
      offerDiscount,
      taxes,
      deliveryCharges,
      totalPay,
    };
  };

  // Cập nhật hóa đơn khi giỏ hàng thay đổi
  useEffect(() => {
    setBillDetails(calculateBill(cartItems));
  }, [cartItems]);

  // Hàm xử lý tăng số lượng
  const increaseQuantity = (id: any) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
              price: (item.quantity + 1) * item.unitPrice,
            }
          : item,
      ),
    );
  };

  // Hàm xử lý giảm số lượng
  const decreaseQuantity = (id: any) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
              price: (item.quantity - 1) * item.unitPrice,
            }
          : item,
      ),
    );
  };

  const renderCartItem = ({item}: any) => (
    <View style={styles.cartItem}>
      <Text style={styles.itemName}>{item.name}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => decreaseQuantity(item.id)}>
          <Text style={styles.quantityText}>−</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => increaseQuantity(item.id)}>
          <Text style={styles.quantityText}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.itemPrice}>${item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Danh sách món ăn trong giỏ hàng */}
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />

      {/* Thông tin hóa đơn */}
      <View style={styles.billContainer}>
        <Text style={styles.billTitle}>Bill Receipt</Text>
        <View style={styles.billRow}>
          <Text style={styles.billLabel}>Items Total</Text>
          <Text style={styles.billValue}>
            ${billDetails.itemsTotal.toFixed(2)}
          </Text>
        </View>
        <View style={styles.billRow}>
          <Text style={styles.billLabel}>Offer Discount</Text>
          <Text style={styles.billValue}>
            ${billDetails.offerDiscount.toFixed(2)}
          </Text>
        </View>
        <View style={styles.billRow}>
          <Text style={styles.billLabel}>Taxes (8%)</Text>
          <Text style={styles.billValue}>${billDetails.taxes.toFixed(2)}</Text>
        </View>
        <View style={styles.billRow}>
          <Text style={styles.billLabel}>Delivery Charges</Text>
          <Text style={styles.billValue}>
            ${billDetails.deliveryCharges.toFixed(2)}
          </Text>
        </View>
        <View style={styles.billRow}>
          <Text style={styles.billLabel}>Total Pay</Text>
          <Text style={styles.billValue}>
            ${billDetails.totalPay.toFixed(2)}
          </Text>
        </View>
      </View>

      {/* Nút thanh toán */}
      <View style={styles.payButtonContainer}>
        <TouchableOpacity
          style={styles.payButton}
          onPress={() => navigation.navigate('PaymentScreen')} // Giả lập điều hướng đến PaymentScreen
        >
          <Text style={styles.payButtonText}>Proceed To Pay</Text>
          <Text style={styles.payButtonPrice}>
            ${billDetails.totalPay.toFixed(2)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  list: {
    paddingBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15, // Thêm khoảng cách giữa nút "+" và giá tiền
  },
  quantityButton: {
    backgroundColor: '#ddd',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
  },
  billContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  billTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  billLabel: {
    fontSize: 16,
    color: '#555',
  },
  billValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  payButtonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  payButton: {
    flexDirection: 'row',
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  payButtonPrice: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CartScreen;
