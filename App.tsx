import {Text, View} from 'react-native';
import CatComponent from './CatComponent';
import {useState} from 'react';

const App = () => {
  const [isHungry, setIsHungry] = useState<boolean>(false);

  const handleFeedCat = () => {
    setIsHungry(true);
    console.log('Feeding the cat...');
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 20}}>Nguyen Quoc Dung - 2124802010008</Text>
      <CatComponent
        name="Tommy"
        isHungry={isHungry}
        age={3}
        onFeedCat={handleFeedCat}
      />
    </View>
  );
};

export default App;
