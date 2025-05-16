import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

// Dữ liệu giả lập món ăn theo topicId
const foodData = {
  '1': [
    {
      id: '1',
      name: 'Mì Xào',
      price: 8,
      image: require('../../../../Asset/images/biryani.png'),
    },
    {
      id: '2',
      name: 'Gà Kung Pao',
      price: 12,
      image: require('../../../../Asset/images/biryani.png'),
    },
  ],
  '2': [
    {
      id: '1',
      name: 'Dosa',
      price: 5,
      image: require('../../../../Asset/images/biryani.png'),
    },
    {
      id: '2',
      name: 'Idli',
      price: 4,
      image: require('../../../../Asset/images/biryani.png'),
    },
  ],
  '3': [
    {
      id: '1',
      name: 'Butter Chicken',
      price: 15,
      image: require('../../../../Asset/images/biryani.png'),
    },
    {
      id: '2',
      name: 'Naan',
      price: 3,
      image: require('../../../../Asset/images/biryani.png'),
    },
  ],
  '4': [
    {
      id: '1',
      name: 'Nước Chanh',
      price: 2,
      image: require('../../../../Asset/images/biryani.png'),
    },
    {
      id: '2',
      name: 'Soda',
      price: 3,
      image: require('../../../../Asset/images/biryani.png'),
    },
  ],
};

type TopicId = keyof typeof foodData;

const FoodListScreen = ({route}: any) => {
  const navigation = useNavigation<any>();
  const {topicId} = route.params; // Nhận topicId từ HomeScreen
  const foods = foodData[topicId as TopicId] || []; // Lấy danh sách món ăn theo topicId

  const renderFoodItem = ({item}: any) => (
    <View style={styles.foodCard}>
      <Image source={item.image} style={styles.foodImage} />
      <Text style={styles.foodName}>{item.name}</Text>
      <Text style={styles.foodPrice}>${item.price}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.detailButton}
          onPress={() => navigation.navigate('FoodDetailScreen', {food: item})}>
          <Text style={styles.buttonText}>View details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {topicId === '1'
          ? 'Chinese'
          : topicId === '2'
          ? 'South Indian'
          : topicId === '3'
          ? 'North Indian'
          : 'Beverages'}
      </Text>
      <FlatList
        data={foods}
        renderItem={renderFoodItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#800000', // Màu đỏ đậm giống HomeScreen
  },
  list: {
    paddingBottom: 20,
  },
  foodCard: {
    backgroundColor: '#fff', // Màu nền trắng như trong hình
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center', // Căn giữa các thành phần
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Hiệu ứng bóng cho Android
  },
  foodImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  foodName: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  foodPrice: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    width: '100%', // Đảm bảo hai nút chiếm toàn bộ chiều rộng của thẻ
  },
  addButton: {
    backgroundColor: '#28a745', // Màu xanh lá như trong hình
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 5,
  },
  detailButton: {
    backgroundColor: '#007bff', // Màu xanh dương như trong hình
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default FoodListScreen;
