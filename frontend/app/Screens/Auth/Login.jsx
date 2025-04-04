import { View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../styles/colors'
import LgText from '../../Components/Labels/LgText'
import InputField from '../../Components/Input/InputField'
import Checkbox from '../../Components/Input/Checkbox'
import { default as Text } from '../../Components/Labels/CustomText'
import PrimeButton from '../../Components/Buttons/PrimeButton'
import Divider from '../../Components/Labels/Divider'
import AntDesign from '@expo/vector-icons/AntDesign'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import baseUrl from '../../../assets/common/baseUrl'
import Toast from 'react-native-toast-message'

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = async () => {
    try {
      const response = await axios.post(`${baseUrl}/login`, { email, password })
      if (response.status === 200) {
        await AsyncStorage.setItem('id', JSON.stringify(response.data._id))
        await AsyncStorage.setItem(
          'token',
          JSON.stringify(response.data.userToken),
        )

        navigation.navigate('ClientStack')
        Toast.show({
          type: 'success',
          text1: 'Login Successful',
          text2: 'Welcome back!',
        })
      } else {
        Toast.show({
          type: 'error',
          text1: 'Invalid Credentials',
          text2: 'Please try again',
        })
      }
    } catch (error) {
      console.log(error)
      Toast.show({
        type: 'error',
        text1: 'Invalid Credentials',
        text2: 'Please try again',
      })
    }
  }

  return (
    <View style={{ backgroundColor: colors.primary, flex: 1, padding: 10 }}>
      <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <LgText style={{ fontSize: 32 }}>Welcome</LgText>
        <View style={{ marginVertical: 10, width: '80%', gap: 20 }}>
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
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '80%',
          }}
        >
          <Checkbox text="Remember Me?" />
          <Text style={{ fontSize: 12 }}>Forgot Password?</Text>
        </View>
        <View
          style={{
            width: '80%',
            marginVertical: 10,
            flexDirection: 'row',
            gap: 10,
          }}
        >
          <PrimeButton text="Login" onPress={login} />
          <PrimeButton
            styles={{ backgroundColor: 'white' }}
            text="Register"
            onPress={() => navigation.navigate('Register')}
          />
        </View>
        <View style={{ width: '80%', marginVertical: 20 }}>
          <Divider text="Or continue with" />
        </View>
        <View style={{ width: '80%', flexDirection: 'row', gap: 10 }}>
          <PrimeButton
            styles={{ backgroundColor: 'white' }}
            icon={<AntDesign name="google" size={16} color="black" />}
          />
          <PrimeButton
            styles={{ backgroundColor: 'white' }}
            icon={<AntDesign name="facebook-square" size={16} color="black" />}
          />
          <PrimeButton
            styles={{ backgroundColor: 'white' }}
            icon={<AntDesign name="phone" size={16} color="black" />}
          />
        </View>
      </SafeAreaView>
    </View>
  )
}

export default Login
