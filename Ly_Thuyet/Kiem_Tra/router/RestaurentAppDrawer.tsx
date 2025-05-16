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
import {getAuth, signOut} from '@react-native-firebase/auth';
import {useMyContext} from '../context/AppContext'; // Giả sử file context nằm cùng thư mục
import HomeScreen from '../screen/client/HomeScreen';
import FoodListScreen from '../screen/client/FoodListScreen';
import CartScreen from '../screen/client/CartScreen';
import PaymentScreen from '../screen/client/PaymentScreen';
import FoodDetailScreen from '../screen/client/FoodDetailScreen';
import OrderNotice from '../screen/client/OrderNotice';
import MyOrder from '../screen/client/MyOrder';
import OrderDetail from '../screen/client/OrderDetail';

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
    <Stack.Navigator initialRouteName="CartScreen">
      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrderNotice"
        component={OrderNotice}
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

const OrderStack = () => {
  return (
    <Stack.Navigator initialRouteName="MyOrder">
      <Stack.Screen
        name="MyOrder"
        component={MyOrder}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetail}
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
  const {state, dispatch} = useMyContext();
  const userEmail = state.userLogin?.email || 'guest@example.com';
  const userName = state.userLogin?.name || userEmail.split('@')[0];

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      dispatch({type: 'LOGOUT'});
      props.navigation.navigate('Login');
    } catch (error: any) {
      console.error('Error logging out:', error);
    }
  };

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
        onPress={handleLogout}
        labelStyle={styles.logoutLabel}
        icon={() => <Icon name="log-out" size={20} color="#800000" />}
      />
    </DrawerContentScrollView>
  );
};

const Drawer = createDrawerNavigator();
const RestaurentAppDrawer = () => {
  const {state} = useMyContext();
  console.log(state);
  const userName = state.userLogin?.name || 'Guest';

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
        headerTitle: `Restaurant App`,
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
      <Drawer.Screen
        name="OrderStack"
        component={OrderStack}
        options={{
          drawerLabel: 'Order',
          drawerIcon: ({color, size}) => (
            <Icon name="box" size={size} color={color} />
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
