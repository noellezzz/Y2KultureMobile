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

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View style={{ backgroundColor: colors.primary, flex: 1, padding: 10 }}>
      <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <LgText style={{ fontSize: 32 }}>Create an Account</LgText>
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
          <PrimeButton text="Register" onPress={() => console.log('Login')} />
          <PrimeButton
            styles={{ backgroundColor: 'white' }}
            text="Go Back"
            onPress={() => navigation.goBack()}
          />
        </View>
      </SafeAreaView>
    </View>
  )
}

export default Register
