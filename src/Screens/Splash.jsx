import React, {useEffect} from 'react';

import {Image, StatusBar, View} from 'react-native';

import EncryptedStorage from 'react-native-encrypted-storage';

const Splash = ({navigation}) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      (async () => {
        try {
          const value = await EncryptedStorage.getItem('key');
          console.log('AsyncStorage key value:', value);
          if (value) {
            navigation.replace('home');
          } else {
            navigation.replace('login');
          }
        } catch (error) {
          console.log('Storage Error:', error);
        }
      })();
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View>      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',
        }}>
        <StatusBar hidden />
        <Image
          style={{width:100, height: 100}}
          source={{
            uri: 'https://cdn.soft112.com/trexo-slider-ios/00/00/0H/WH/00000HWHXJ/pad_screenshot_8U4B7T5K9Z.png',
          }}
        />
      </View>
    </View>
  );
};

export default Splash;