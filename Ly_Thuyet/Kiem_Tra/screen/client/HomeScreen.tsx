import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

const cuisines = [
  {
    id: '1',
    name: 'Chinese',
    image: require('../../../../Asset/images/chinese.png'),
  },
  {
    id: '2',
    name: 'South Indian',
    image: require('../../../../Asset/images/south-indian.png'),
  },
  {
    id: '3',
    name: 'North Indian',
    image: require('../../../../Asset/images/north-indian.png'),
  },
  {
    id: '4',
    name: 'Beverages',
    image: require('../../../../Asset/images/beverages.png'),
  },
];

const HomeScreen = () => {
  const navigation = useNavigation<any>();

  const renderCuisine = ({item}: any) => (
    <TouchableOpacity
      style={styles.cuisineCard}
      onPress={() => navigation.navigate('FoodListScreen', {topicId: item.id})}>
      <Image source={item.image} style={styles.cuisineImage} />
      <Text style={styles.cuisineText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cuisine</Text>
      <FlatList
        data={cuisines}
        renderItem={renderCuisine}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#800000',
  },
  list: {
    paddingBottom: 20,
  },
  cuisineCard: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    margin: 5,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cuisineImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  cuisineText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
