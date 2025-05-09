import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {Menu, IconButton, Provider as PaperProvider} from 'react-native-paper';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const [notes, setNotes] = useState<FirebaseFirestoreTypes.DocumentData[]>([]);
  const [menuVisible, setMenuVisible] = useState<string | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('notes')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const fetchedNotes = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotes(fetchedNotes);
      });

    return unsubscribe;
  }, []);

  const handleDelete = (noteId: string) => {
    Alert.alert(
      'Xác nhận xoá',
      'Bạn có chắc muốn xoá ghi chú này?',
      [
        {text: 'Huỷ', style: 'cancel'},
        {
          text: 'Xoá',
          style: 'destructive',
          onPress: async () => {
            try {
              await firestore().collection('notes').doc(noteId).delete();
            } catch (err) {
              console.error('Lỗi khi xoá note:', err);
            }
          },
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <FlatList
          data={notes}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.noteItem}>
              <TouchableOpacity
                style={{flex: 1}}
                onPress={() =>
                  navigation.navigate('DetailNote', {noteId: item.id})
                }>
                <Text style={styles.noteTitle}>{item.title}</Text>
                <Text style={styles.noteDate}>
                  {item.createdAt?.toDate?.().toLocaleString() ||
                    'Không có thời gian'}
                </Text>
              </TouchableOpacity>

              <Menu
                visible={menuVisible === item.id}
                onDismiss={() => setMenuVisible(null)}
                anchor={
                  <IconButton
                    icon="dots-vertical"
                    onPress={() => setMenuVisible(item.id)}
                  />
                }>
                <Menu.Item
                  onPress={() => {
                    setMenuVisible(null);
                    navigation.navigate('UpdateNote', {noteId: item.id});
                  }}
                  title="Chỉnh sửa"
                />
                <Menu.Item
                  onPress={() => {
                    setMenuVisible(null);
                    handleDelete(item.id);
                  }}
                  title="Xoá"
                />
              </Menu>
            </View>
          )}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddNote' as never)}>
          <Text style={styles.addButtonText}>+ Add Note</Text>
        </TouchableOpacity>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  noteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f1f1f1',
    marginBottom: 10,
    borderRadius: 8,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  noteDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
