import { Image, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { default as Text } from '../../../Components/Labels/CustomText';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../../styles/colors';
import LgText from '../../../Components/Labels/LgText';
import Divider from '../../../Components/Labels/Divider';
import hanni from '../../../../assets/images/hanni.jpg';
import Feather from '@expo/vector-icons/Feather';
import InputField from '../../../Components/Input/InputField';
import PrimeButton from '../../../Components/Buttons/PrimeButton';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseUrl from '../../../../assets/common/baseUrl';
import * as ImagePicker from 'expo-image-picker';

const Edit = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [user, setUser] = useState({});
  const [imageUri, setImageUri] = useState(null);

  const getUser = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      };

      const response = await axios.get(`${baseUrl}/user/profile`, config);
      setUser(response.data);
      setEmail(response.data.email);
      setUsername(response.data.username);
      setPhone(response.data.phone);
    } catch (error) {
      console.log(error);
    }
  };

  const selectImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access media library is required!');
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log('Image picker result:', result);

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
      console.log('Selected image URI:', result.assets[0].uri);
    }
  };

  const updateUser = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      const formData = new FormData();
      formData.append('email', email);
      formData.append('username', username);
      formData.append('phone', phone);

      if (imageUri) {
        const file = {
          uri: imageUri,
          name: `profile-image-${Date.now()}.jpg`,
          type: 'image/jpeg',
        };
        formData.append('image', file);
      }

      const response = await fetch(`${baseUrl}/user/editprofile`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
        body: formData,
      });

      const responseText = await response.text();
      console.log('Server response:', responseText);

      const data = JSON.parse(responseText);
      if (data.success) {
        alert('Profile updated successfully!');
        navigation.goBack({component: 'Profile'});
      } else {
        alert('Failed to update profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred while updating the profile.');
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getUser();
    }, [])
  );

  return (
    <SafeAreaView
      style={{
        position: 'relative',
        backgroundColor: colors.primary,
        flex: 1,
        width: '100%',
        padding: 10,
      }}
    >
      <LgText>Edit Profile</LgText>
      <View style={{ marginVertical: 10 }}>
        <Divider />
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 200,
        }}
      >
        <View
          style={{
            height: 170,
            width: 170,
            borderRadius: 85,
            borderWidth: 2,
            position: 'relative',
          }}
        >
          <View style={{ borderRadius: 85, overflow: 'hidden' }}>
            {imageUri ? (
              <Image
                style={{ height: '100%', width: '100%', resizeMode: 'cover' }}
                source={{ uri: `${imageUri}?t=${Date.now()}` }}
              />
            ) : user?.image?.url ? (
              <Image
                style={{ height: '100%', width: '100%', resizeMode: 'cover' }}
                source={{ uri: user.image.url }}
              />
            ) : (
              <Image
                style={{ height: '100%', width: '100%', resizeMode: 'cover' }}
              />
            )}
          </View>
          <TouchableOpacity onPress={selectImage}>
            <View
              style={{
                position: 'absolute',
                borderWidth: 1,
                zIndex: 10,
                backgroundColor: colors.quaternary,
                height: 45,
                width: 45,
                bottom: 0,
                right: 0,
                borderRadius: 22.5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Feather name="edit-2" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginVertical: 10, gap: 20 }}>
        <InputField
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="default"
        />
        <InputField
          label="Username"
          value={username}
          onChangeText={setUsername}
          keyboardType="default"
        />
        <InputField
          label="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="numeric"
        />
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          height: 100,
          zIndex: 100,
          width: '105%',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          padding: 10,
          gap: 10,
        }}
      >
        <PrimeButton text="Update" onPress={updateUser} />
        <PrimeButton
          text="Cancel"
          styles={{ backgroundColor: 'white' }}
          onPress={() => navigation.goBack()}
        />
      </View>
    </SafeAreaView>
  );
};

export default Edit;
