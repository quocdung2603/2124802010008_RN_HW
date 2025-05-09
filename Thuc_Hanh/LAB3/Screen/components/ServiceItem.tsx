import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {GetFirstWord} from '../../utilities/GetFirstWord';
import {FormatCurrency} from '../../utilities/FormatCurrency';

interface ServiceItemProps {
  title: string;
  price: string;
}

const ServiceItem: React.FC<ServiceItemProps> = ({title, price}) => {
  return (
    <TouchableOpacity
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
      }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          alignContent: 'center',
        }}>
        {GetFirstWord(title, 5)}
      </Text>
      <Text style={{fontSize: 18, alignContent: 'center'}}>
        {FormatCurrency(price, 'VND')}
      </Text>
    </TouchableOpacity>
  );
};

export default ServiceItem;
