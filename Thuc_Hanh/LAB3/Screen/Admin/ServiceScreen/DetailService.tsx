import React, {useState} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {Menu, Provider} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation, useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const DetailService = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const {item} = route.params; // Lấy dữ liệu dịch vụ từ params
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleUpdate = () => {
    closeMenu();
    // Điều hướng đến màn hình UpdateService, truyền dữ liệu dịch vụ
    navigation.navigate('UpdateService', {item});
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
          onPress: async () => {
            try {
              // Tìm document trong Firestore dựa trên trường id
              const querySnapshot = await firestore()
                .collection('services')
                .where('id', '==', item.id)
                .get();
              if (querySnapshot.empty) {
                Alert.alert('Error', 'Service not found in Firestore.');
                return;
              }
              const docId = querySnapshot.docs[0].id;
              await firestore().collection('services').doc(docId).delete();
              Alert.alert('Success', 'Service deleted successfully!');
              navigation.goBack(); // Quay lại Home sau khi xóa
            } catch (error: any) {
              console.error('Error deleting service:', error);
              Alert.alert(
                'Error',
                'Failed to delete service: ' + error.message,
              );
            }
          },
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <Provider>
      <View style={{width: '100%', flex: 1, flexDirection: 'column'}}>
        <View
          style={{
            width: '100%',
            minHeight: 100,
            flexDirection: 'row',
            backgroundColor: 'hotpink',
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{marginTop: 'auto', marginRight: 'auto'}}>
            <FontAwesome name="arrow-left" size={30} color={'#fff'} />
          </TouchableOpacity>
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
          <Text style={{width: '70%', fontSize: 17}}>{item.title}</Text>
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
          <Text style={{width: '70%', fontSize: 17}}>{item.price} VND</Text>
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
          <Text style={{width: '70%', fontSize: 17}}>{item.addedBy}</Text>
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
          <Text style={{width: '70%', fontSize: 17}}>
            {item.createdAt?.toDate().toLocaleString()}
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
            Final Update:
          </Text>
          <Text style={{width: '70%', fontSize: 17}}>
            {item.updatedAt?.toDate().toLocaleString()}
          </Text>
        </View>
      </View>
    </Provider>
  );
};

export default DetailService;
