import React from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ServiceItem from './components/ServiceItem';

const listData: any = [
  {
    title: 'dich vu dich vu dich vu dich vu',
    price: '1000000',
  },
  {
    title: 'dich vu dich vu dich vu dich vu',
    price: '1000000',
  },
  {
    title: 'dich vu dich vu dich vu dich vu',
    price: '1000000',
  },
  {
    title: 'dich vu dich vu dich vu dich vu',
    price: '1000000',
  },
  {
    title: 'dich vu dich vu dich vu dich vu',
    price: '1000000',
  },
  {
    title: 'dich vu dich vu dich vu dich vu',
    price: '1000000',
  },
  {
    title: 'dich vu dich vu dich vu dich vu',
    price: '1000000',
  },
  {
    title: 'dich vu dich vu dich vu dich vu',
    price: '1000000',
  },
  {
    title: 'dich vu dich vu dich vu dich vu',
    price: '1000000',
  },
  {
    title: 'dich vu dich vu dich vu dich vu',
    price: '1000000',
  },
];

const Home = () => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
      }}>
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
          }}>
          QUỐC DŨNG
        </Text>
        <View
          style={{
            marginTop: 'auto',
            marginLeft: 'auto',
          }}>
          <FontAwesome name="user-circle" size={30} color={'#fff'} />
        </View>
      </View>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../../../Asset/logolab3.png')}
          style={{width: 200, height: 100, resizeMode: 'contain'}}
        />
      </View>
      <View
        style={{
          width: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center',
            paddingHorizontal: 10,
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000'}}>
            Danh sách dịch vụ
          </Text>
          <View>
            <FontAwesome name="plus-circle" size={30} color={'hotpink'} />
          </View>
        </View>
        <FlatList
          style={{
            marginHorizontal: 10,
            marginVertical: 10,
            height: 500,
          }}
          data={listData}
          renderItem={({item, index}) => (
            <ServiceItem
              title="Ten dich vu ten dich vu ten dich vu ten dich vu"
              price="250000"></ServiceItem>
          )}
        />
      </View>
    </View>
  );
};

export default Home;
