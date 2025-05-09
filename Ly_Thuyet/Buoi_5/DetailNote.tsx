import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

type RouteParams = {
  noteId: string;
};

const DetailNote = () => {
  const [note, setNote] = useState<any>(null);
  const route = useRoute<RouteProp<{params: RouteParams}, 'params'>>();

  useEffect(() => {
    const {noteId} = route.params;
    const fetchNote = async () => {
      const noteDoc = await firestore().collection('notes').doc(noteId).get();
      setNote(noteDoc.data());
    };

    fetchNote();
  }, [route.params]);

  if (!note) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.content}>{note.content}</Text>
      <Text style={styles.noteDate}>
        {note.createdAt?.toDate?.().toLocaleString() || 'No date'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 16,
    marginTop: 10,
  },
  noteDate: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
});

export default DetailNote;
