import React, {useState} from 'react';
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

const Profile = () => {
  const [avatar] = useState('../../../Asset/logolab3.png');

  const [fullName, setFullName] = useState('Quốc Dũng');
  const [email, setEmail] = useState('dung@gmail.com');
  const [phone, setPhone] = useState('0901291640');
  const [address, setAddress] = useState('Bình Dương');

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdateProfile = () => {
    Alert.alert('Cập nhật thông tin', 'Thông tin cá nhân đã được cập nhật.');
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp.');
      return;
    }

    Alert.alert('Đổi mật khẩu', 'Mật khẩu đã được thay đổi.');
  };

  return (
    <ScrollView
      contentContainerStyle={{padding: 20, backgroundColor: '#fff', flex: 1}}>
      {/* Avatar */}
      <View style={{alignItems: 'center', marginVertical: 20}}>
        <TouchableOpacity
          onPress={() =>
            Alert.alert('Thông báo', 'Chức năng đổi ảnh chưa hỗ trợ')
          }>
          <Image
            source={require('../../../Asset/logolab3.png')}
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

      {/* Thông tin cá nhân */}
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

      {/* Đổi mật khẩu */}
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          marginTop: 30,
          marginBottom: 10,
        }}>
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
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Đổi mật khẩu</Text>
      </TouchableOpacity>
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
});

export default Profile;
