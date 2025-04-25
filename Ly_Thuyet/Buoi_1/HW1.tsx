import {View} from 'react-native';
import CatComponent from './CatComponent';
import {useState} from 'react';
import React from 'react';

const HW1 = () => {
  const [feedCat, setFeedCat] = useState(false);

  const handleFeedCat = () => {
    setFeedCat(!feedCat);
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <CatComponent
        name="ABC"
        age={18}
        isHungry={feedCat}
        onFeedCat={handleFeedCat}
      />
    </View>
  );
};

export default HW1;
