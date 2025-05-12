import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import {GetFirstWord} from '../../../utilities/GetFirstWord';
import {FormatCurrency} from '../../../utilities/FormatCurrency';

interface ServiceItemProps {
  title: string;
  price: string;
  onPress?: () => void; // Thêm prop tùy chọn cho onPress
}

const ServiceItem: React.FC<ServiceItemProps> = ({title, price, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8} // Hiệu ứng khi nhấn
    >
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {GetFirstWord(title, 5)}
        </Text>
        <Text style={styles.price}>{FormatCurrency(price, 'VND')}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    maxWidth: '70%', // Đảm bảo tiêu đề không vượt quá giới hạn
  },
  price: {
    fontSize: 18,
    color: '#333',
  },
});

export default ServiceItem;
