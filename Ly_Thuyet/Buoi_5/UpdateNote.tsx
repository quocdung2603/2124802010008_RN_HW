import React, {useEffect, useState} from 'react';
import {View, TextInput, Button, StyleSheet, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

type ParamList = {
  UpdateNote: {noteId: string};
};

const UpdateNote = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<ParamList, 'UpdateNote'>>();
  const {noteId} = route.params;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const doc = await firestore().collection('notes').doc(noteId).get();
        if (doc.exists()) {
          const data = doc.data();
          setTitle(data?.title || '');
          setContent(data?.content || '');
        } else {
          Alert.alert('Không tìm thấy ghi chú');
          navigation.goBack();
        }
      } catch (err) {
        console.error('Lỗi khi tải note:', err);
      }
    };

    fetchNote();
  }, [noteId]);

  const handleUpdate = async () => {
    if (!title.trim()) {
      Alert.alert('Tiêu đề không được để trống');
      return;
    }

    try {
      await firestore().collection('notes').doc(noteId).update({
        title,
        content,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
      Alert.alert('Đã cập nhật ghi chú!');
      navigation.goBack();
    } catch (err) {
      console.error('Lỗi khi cập nhật:', err);
      Alert.alert('Cập nhật thất bại');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Tiêu đề"
        style={styles.input}
      />
      <TextInput
        value={content}
        onChangeText={setContent}
        placeholder="Nội dung"
        style={[styles.input, {height: 100}]}
        multiline
      />
      <Button title="Lưu" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
});

export default UpdateNote;
