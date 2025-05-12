import React, {useState, useEffect} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  logout,
  useMyContextController,
} from '../../../Context/MyContextController';
import {useNavigation} from '@react-navigation/native';
import {
  getFirestore,
  doc,
  updateDoc,
  getDoc,
} from '@react-native-firebase/firestore';
import {getAuth} from '@react-native-firebase/auth';

const Profile = () => {
  const navigation = useNavigation<any>();
  const [avatar] = useState('../../../Asset/logolab3.png');
  const [activeTab, setActiveTab] = useState('personal'); // Tab mặc định là "Thông tin cá nhân"

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [, dispatch] = useMyContextController();
  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const userRef = doc(db, 'USERS', user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          if (userData) {
            setFullName(userData.fullName);
            setEmail(userData.email);
            setPhone(userData.phone);
            setAddress(userData.address);
          }
        }
      }
    };
    fetchUserProfile();
  }, [user, db]);

  const handleLogout = async () => {
    await logout(dispatch);
    navigation.navigate('Login');
  };

  const handleUpdateProfile = async () => {
    if (user) {
      const userRef = doc(db, 'USERS', user.uid);
      await updateDoc(userRef, {
        fullName,
        email,
        phone,
        address,
      });
      Alert.alert('Cập nhật thông tin', 'Thông tin cá nhân đã được cập nhật.');
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp.');
      return;
    }
    const userCred = auth.currentUser;
    if (userCred) {
      try {
        await userCred.updatePassword(newPassword);
        Alert.alert('Đổi mật khẩu', 'Mật khẩu đã được thay đổi.');
      } catch (error) {
        Alert.alert('Lỗi', 'Đã có lỗi xảy ra khi thay đổi mật khẩu.');
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={{backgroundColor: '#fff', flexGrow: 1}}>
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
            marginLeft: 'auto',
          }}>
          Profile
        </Text>
      </View>

      {/* Avatar */}
      <View style={{alignItems: 'center', marginVertical: 20}}>
        <TouchableOpacity
          onPress={() =>
            Alert.alert('Thông báo', 'Chức năng đổi ảnh chưa hỗ trợ')
          }>
          <Image
            source={require('../../../../../Asset/logolab3.png')}
            style={{
              width: 150,
              height: 150,
              borderRadius: 75,
              borderWidth: 2,
              borderColor: '#ccc',
              resizeMode: 'contain',
            }}
          />
          <Text style={{textAlign: 'center', marginTop: 5, color: '#2e86de'}}>
            Thay đổi ảnh đại diện
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'personal' && styles.activeTab]}
          onPress={() => setActiveTab('personal')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'personal' && styles.activeTabText,
            ]}>
            Thông tin cá nhân
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'password' && styles.activeTab]}
          onPress={() => setActiveTab('password')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'password' && styles.activeTabText,
            ]}>
            Đổi mật khẩu
          </Text>
        </TouchableOpacity>
      </View>

      {/* Nội dung của tab */}
      {activeTab === 'personal' ? (
        <View style={styles.tabContent}>
          <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
            Thông tin cá nhân
          </Text>
          <TextInput
            placeholder="Họ và tên"
            value={fullName}
            onChangeText={setFullName}
            style={styles.input}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={styles.input}
          />
          <TextInput
            placeholder="Số điện thoại"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            style={styles.input}
          />
          <TextInput
            placeholder="Địa chỉ"
            value={address}
            onChangeText={setAddress}
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
            <Text style={styles.buttonText}>Cập nhật thông tin</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.tabContent}>
          <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
            Đổi mật khẩu
          </Text>
          <TextInput
            placeholder="Mật khẩu cũ"
            secureTextEntry
            value={oldPassword}
            onChangeText={setOldPassword}
            style={styles.input}
          />
          <TextInput
            placeholder="Mật khẩu mới"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
            style={styles.input}
          />
          <TextInput
            placeholder="Xác nhận mật khẩu"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.input}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleChangePassword}>
            <Text style={styles.buttonText}>Đổi mật khẩu</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'hotpink',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
  },
  activeTab: {
    borderBottomColor: 'hotpink',
  },
  tabText: {
    fontSize: 16,
    color: '#333',
  },
  activeTabText: {
    color: 'hotpink',
    fontWeight: 'bold',
  },
  tabContent: {
    flex: 1,
    margin: 10,
  },
});

export default Profile;
