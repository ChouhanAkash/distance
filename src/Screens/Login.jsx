import React, { useEffect } from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import EncryptedStorage from 'react-native-encrypted-storage';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import styles from './LoginStyles'; 

const Login = () => {
  const navigation = useNavigation();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '728577847571-e21bead448ef8409526ae6.apps.googleusercontent.com', 
      offlineAccess: true,
    });

    autoRedirectIfLoggedIn();
  }, []);

  const autoRedirectIfLoggedIn = async () => {
    try {
      const user = await EncryptedStorage.getItem('key');
      if (user) {
        navigation.replace('home');
      }
    } catch (err) {
      console.warn('Auto login check failed:', err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      if (userInfo) {
        await EncryptedStorage.setItem(
          'key',
          JSON.stringify({
            type: 'google',
            phone: userInfo.user?.phoneNumber || '',
            name: userInfo.user?.name || '',
            email: userInfo.user?.email || '',
          })
        );
        navigation.replace('home');
      }
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      Alert.alert('Login Failed', error.message || 'Something went wrong');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar backgroundColor="black" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={{
              uri: 'https://cdn.soft112.com/trexo-slider-ios/00/00/0H/WH/00000HWHXJ/pad_screenshot_8U4B7T5K9Z.png',
            }}
          />
          <Text style={styles.deliveryText}>10 Minutes Delivery</Text>
        </View>

        <View style={styles.authContainer}>
          <TouchableOpacity
            onPress={handleGoogleLogin}
            activeOpacity={0.8}
            style={styles.googleBtn}
          >
            <AntDesign name="google" size={20} color="#fff" />
            <Text style={styles.googleBtnText}>Sign In with Google</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;

