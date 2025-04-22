import React, {useState} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';

const CaculatorApp = () => {
  const [lightTheme, setLightTheme] = useState(true);

  const [text, setText] = useState('');
  const [result, setResult] = useState('');

  const handleCalculate = (text: string) => {
    try {
      const evaluated = eval(text);
      setResult(evaluated.toString());
    } catch (error) {
      setResult('Error');
      console.log('Error:', error);
    }
  };

  const handleLeftButtonPress = (item: string) => {
    if (item === 'C') {
      setText('');
      setResult('');
    } else if (item === 'DEL') {
      setText(text.slice(0, -1));
    } else if (item === '=') {
      setText(text + item);
      handleCalculate(text);
    } else {
      setText(text + item);
    }
  };

  const LeftButton = [
    ['C', 'DEL'],
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['0', '.'],
  ];

  const RightButton = ['+', '-', '*', '/', '='];

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <View
        style={{
          flex: 1 / 3,
          flexDirection: 'column',
          backgroundColor: !lightTheme ? '#282f3b' : '#f5f5f5',
        }}>
        <View style={{flex: 1 / 4}}>
          <TouchableOpacity
            onPress={() => {
              setLightTheme(!lightTheme);
            }}>
            <View
              style={{
                borderWidth: 1,
                borderRadius: '50%',
                borderColor: lightTheme ? 'black' : 'white',
                padding: 10,
                margin: 10,
                marginRight: 'auto',
                width: 50,
                height: 50,
              }}>
              <Entypo
                name={lightTheme ? 'light-up' : 'moon'}
                size={30}
                color={lightTheme ? 'black' : 'white'}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flex: 3 / 4, flexDirection: 'column', padding: 20}}>
          <Text
            style={{
              color: !lightTheme ? '#b5b7bb' : '#7c7c7c',
              fontSize: 40,
              marginLeft: 'auto',
            }}>
            {text}
          </Text>
          <Text
            style={{
              color: !lightTheme ? 'aqua' : '#7c7c7c',
              fontSize: 50,
              marginLeft: 'auto',
            }}>
            {result}
          </Text>
        </View>
      </View>
      <View style={{flex: 2 / 3, flexDirection: 'row'}}>
        <View
          style={{
            flex: 3 / 4,
            backgroundColor: 'grey',
            flexDirection: 'column',
          }}>
          <View
            style={{
              flex: 1 / 5,
              backgroundColor: !lightTheme ? '#414853' : '#ededed',
              flexDirection: 'row',
            }}>
            {LeftButton[0].map((item, index) => (
              <TouchableOpacity
                onPress={() => handleLeftButtonPress(item)}
                key={index + 0}
                style={{flex: 1 / 2, justifyContent: 'center'}}>
                <Text
                  style={{
                    fontSize: 40,
                    textAlign: 'center',
                    color: !lightTheme ? '#b5b7bb' : '#7c7c7c',
                  }}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View
            style={{
              flex: 4 / 5,
              backgroundColor: !lightTheme ? '#303946' : '#fff',
            }}>
            {LeftButton.slice(1).map((row, rowIndex) => (
              <View key={rowIndex + 0} style={{flex: 1, flexDirection: 'row'}}>
                {row.map((item, colIndex) => (
                  <TouchableOpacity
                    onPress={() => handleLeftButtonPress(item)}
                    key={colIndex + 0}
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 40,
                        textAlign: 'center',
                        color: !lightTheme ? '#b5b7bb' : '#7c7c7c',
                      }}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </View>
        <View
          style={{
            flex: 1 / 4,
            backgroundColor: '#00b9d6',
            alignItems: 'center',
          }}>
          {RightButton.map((item, index) => (
            <TouchableOpacity
              onPress={() => handleLeftButtonPress(item)}
              key={index + 0}
              style={{
                width: '100%',
                height: '20%',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 40,
                  textAlign: 'center',
                  color: lightTheme ? '#7c7c7c' : '#fff',
                }}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default CaculatorApp;
