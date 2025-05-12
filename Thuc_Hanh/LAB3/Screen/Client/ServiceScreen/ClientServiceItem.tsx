import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

interface ClientServiceItemProps {
  item: {
    id: string;
    title: string;
    price: string;
    discountPrice?: string; // Giá ưu đãi (tùy chọn)
    image?: string; // Ảnh dịch vụ (tùy chọn)
  };
  onPress: () => void;
}

const ClientServiceItem: React.FC<ClientServiceItemProps> = ({
  item,
  onPress,
}) => {
  const defaultImage = '../../../../../Asset/logolab3.png'; // Ảnh mặc định nếu không có ảnh

  return (
    <TouchableOpacity style={styles.serviceItem} onPress={onPress}>
      <Image
        source={require(defaultImage)}
        style={styles.serviceImage}
        resizeMode="cover"
      />
      <Text style={styles.title} numberOfLines={2}>
        {item.title}
      </Text>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{`VND ${item.price}`}</Text>
        {item.discountPrice && (
          <Text
            style={styles.discountPrice}>{`VND ${item.discountPrice}`}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  serviceItem: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    padding: 10,
    alignItems: 'center',
  },
  serviceImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  priceContainer: {
    alignItems: 'center',
  },
  price: {
    fontSize: 14,
    color: '#2e86de',
    fontWeight: 'bold',
  },
  discountPrice: {
    fontSize: 12,
    color: '#e74c3c',
    textDecorationLine: 'line-through', // Gạch ngang giá gốc nếu có giá ưu đãi
  },
});

export default ClientServiceItem;
