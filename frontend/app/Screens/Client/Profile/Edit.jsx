import { Image, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { default as Text } from '../../../Components/Labels/CustomText'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../../styles/colors'
import LgText from '../../../Components/Labels/LgText'
import Divider from '../../../Components/Labels/Divider'
import hanni from '../../../../assets/images/hanni.jpg'
import Feather from '@expo/vector-icons/Feather'
import InputField from '../../../Components/Input/InputField'
import PrimeButton from '../../../Components/Buttons/PrimeButton'

const Edit = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

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
            borderRadius: '100%',
            borderWidth: 2,
            // overflow: 'hidden',
            position: 'relative',
          }}
        >
          <View style={{ borderRadius: '100%', overflow: 'hidden' }}>
            <Image
              style={{ height: '100%', width: '100%', resizeMode: 'cover' }}
              source={hanni}
            />
          </View>
          <TouchableOpacity>
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
                borderRadius: '100%',
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
          label="Password"
          value={password}
          onChangeText={setPassword}
          keyboardType="default"
          secureEntry={true}
        />
        <InputField
          label="Username"
          value={email}
          onChangeText={setEmail}
          keyboardType="default"
        />
        <InputField
          label="Email"
          value={name}
          onChangeText={setName}
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
        <PrimeButton text="Update" />
        <PrimeButton
          text="Cancel"
          styles={{ backgroundColor: 'white' }}
          onPress={() => navigation.goBack()}
        />
      </View>
    </SafeAreaView>
  )
}

export default Edit
