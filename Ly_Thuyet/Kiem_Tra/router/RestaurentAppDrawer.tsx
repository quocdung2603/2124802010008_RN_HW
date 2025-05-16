import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TouchableOpacity, StyleSheet, View, Text, Image} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Feather';
import HomeScreen from '../screen/client/HomeScreen';
import FoodListScreen from '../screen/client/FoodListScreen';
import CartScreen from '../screen/client/CartScreen';
import PaymentScreen from '../screen/client/PaymentScreen';
import FoodDetailScreen from '../screen/client/FoodDetailScreen';

// Giả lập dữ liệu người dùng (email)
const userEmail = 'john.doe@example.com'; // Thay bằng dữ liệu thực tế từ hệ thống đăng nhập
const userName = userEmail.split('@')[0]; // Lấy phần trước dấu @ làm tên người dùng

const Stack = createNativeStackNavigator();
const HomeStack = ({navigation}: any) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FoodListScreen"
        component={FoodListScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FoodDetailScreen"
        component={FoodDetailScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const CartStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

// Tùy chỉnh nội dung Drawer
const CustomDrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props}>
      {/* Phần đầu Drawer: Avatar và tên người dùng */}
      <View style={styles.drawerHeader}>
        <Image
          source={{uri: 'https://randomuser.me/api/portraits/men/1.jpg'}} // Avatar mẫu
          style={styles.avatar}
        />
        <Text style={styles.userName}>{userName}</Text>
      </View>

      {/* Các mục Drawer (Cuisine, Cart, v.v.) */}
      <DrawerItemList {...props} />

      {/* Mục Logout */}
      <DrawerItem
        label="Logout"
        onPress={() => props.navigation.navigate('Login')} // Điều hướng về Login khi đăng xuất
        labelStyle={styles.logoutLabel}
        icon={() => <Icon name="log-out" size={20} color="#800000" />}
      />
    </DrawerContentScrollView>
  );
};

const Drawer = createDrawerNavigator();
const RestaurentAppDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="HomeStack"
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={({navigation}) => ({
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitle: 'Restaurant App',
        headerTitleAlign: 'center',
        headerRight: () => (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              style={styles.headerRight}
              onPress={() => navigation.navigate('CartStack')}>
              <Icon name="shopping-cart" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        ),
        drawerStyle: {
          backgroundColor: '#fff',
          width: 250,
        },
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: '600',
          color: '#000',
        },
      })}>
      <Drawer.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          drawerLabel: 'Cuisine',
          drawerIcon: ({color, size}) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="CartStack"
        component={CartStack}
        options={{
          drawerLabel: 'Cart',
          drawerIcon: ({color, size}) => (
            <Icon name="shopping-cart" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  headerRight: {
    paddingRight: 15,
  },
  drawerHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40, // Hình tròn
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  logoutLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#800000', // Màu đỏ đậm để nổi bật
  },
});

export default RestaurentAppDrawer;
