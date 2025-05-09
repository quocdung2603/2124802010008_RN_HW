import React, {useState} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {Menu, Provider} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const DetailService = () => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleUpdate = () => {
    closeMenu();
    console.log('Update service');
    // Xử lý update tại đây
  };

  const handleDelete = () => {
    closeMenu();
    Alert.alert(
      'Xác nhận xoá',
      'Bạn có chắc muốn xoá dịch vụ này?',
      [
        {
          text: 'Huỷ',
          style: 'cancel',
        },
        {
          text: 'Xoá',
          onPress: () => {
            console.log('Đã xoá dịch vụ');
            // TODO: Gọi API xoá hoặc logic xoá tại đây
          },
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <Provider>
      <View
        style={{
          width: '100%',
          flex: 1,
          flexDirection: 'column',
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
          <View
            style={{
              marginTop: 'auto',
              marginRight: 'auto',
            }}>
            <FontAwesome name="arrow-left" size={30} color={'#fff'} />
          </View>
          <View style={{marginTop: 'auto', marginLeft: 'auto'}}>
            <Menu
              style={{marginTop: 100}}
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <TouchableOpacity onPress={openMenu}>
                  <Entypo name="dots-three-vertical" size={30} color={'#fff'} />
                </TouchableOpacity>
              }>
              <Menu.Item onPress={handleUpdate} title="Update" />
              <Menu.Item onPress={handleDelete} title="Delete" />
            </Menu>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
            marginVertical: 10,
            marginHorizontal: 10,
          }}>
          <Text style={{width: '30%', fontSize: 17, fontWeight: 'bold'}}>
            Service Name:
          </Text>
          <Text style={{width: '70%', fontSize: 17}}>
            Chăm sóc da mặt và dưỡng ẩm tự nhiên
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
            marginVertical: 10,
            marginHorizontal: 10,
          }}>
          <Text style={{width: '30%', fontSize: 17, fontWeight: 'bold'}}>
            Price:
          </Text>
          <Text style={{width: '70%', fontSize: 17}}>250.000 VND</Text>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
            marginVertical: 10,
            marginHorizontal: 10,
          }}>
          <Text style={{width: '30%', fontSize: 17, fontWeight: 'bold'}}>
            Creator:
          </Text>
          <Text style={{width: '70%', fontSize: 17}}>Dung</Text>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
            marginVertical: 10,
            marginHorizontal: 10,
          }}>
          <Text style={{width: '30%', fontSize: 17, fontWeight: 'bold'}}>
            Time:
          </Text>
          <Text style={{width: '70%', fontSize: 17}}>09/05/2025 09:47:22</Text>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
            marginVertical: 10,
            marginHorizontal: 10,
          }}>
          <Text style={{width: '30%', fontSize: 17, fontWeight: 'bold'}}>
            Final Update:
          </Text>
          <Text style={{width: '70%', fontSize: 17}}>09/05/2025 09:47:22</Text>
        </View>
      </View>
    </Provider>
  );
};

export default DetailService;
