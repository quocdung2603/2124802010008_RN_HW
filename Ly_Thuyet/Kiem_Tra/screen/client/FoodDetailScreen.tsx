import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';

// Định nghĩa kiểu dữ liệu cho route.params
type FoodDetailScreenRouteProp = RouteProp<
  {
    params: {
      food: {
        id: string;
        name: string;
        price: number;
        image: any;
        description?: string;
      };
    };
  },
  'params'
>;

const FoodDetailScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<FoodDetailScreenRouteProp>();

  // Nhận dữ liệu món ăn từ route.params, nếu không có thì dùng giá trị mặc định
  const {food} = route.params || {
    food: {
      id: '1',
      name: 'Mì Xào',
      price: 8,
      image: require('../../../../Asset/images/chinese.png'),
      description:
        'A delicious stir-fried noodle dish with fresh vegetables and savory sauce.',
    },
  };

  return (
    <View style={styles.container}>
      {/* Hình ảnh món ăn */}
      <Image source={food.image} style={styles.foodImage} />

      {/* Tên món ăn */}
      <Text style={styles.foodName}>{food.name}</Text>

      {/* Giá tiền */}
      <Text style={styles.foodPrice}>${food.price.toFixed(2)}</Text>

      {/* Mô tả món ăn */}
      <Text style={styles.foodDescription}>
        {food.description ||
          'A delicious dish prepared with fresh ingredients.'}
      </Text>

      {/* Nút Add to Cart */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          // Giả lập thêm vào giỏ hàng
          Alert.alert(`${food.name} has been added to your cart!`);
          // Điều hướng về FoodListScreen hoặc CartScreen nếu cần
          // navigation.navigate('DetailCart');
        }}>
        <Text style={styles.addButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  foodImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  foodName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  foodPrice: {
    fontSize: 20,
    color: '#555',
    marginBottom: 15,
  },
  foodDescription: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#28a745', // Màu xanh lá giống các nút trước
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FoodDetailScreen;
