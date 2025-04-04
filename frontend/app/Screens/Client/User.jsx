import { Image, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../styles/colors'
import BottomNavigation from '../../Components/Buttons/BottomNavigation'
import { default as Text } from '../../Components/Labels/CustomText'
import hanni from '../../../assets/images/hanni.jpg'
import AntDesign from '@expo/vector-icons/AntDesign'
import Entypo from '@expo/vector-icons/Entypo'
import ItemButton from '../../Components/Buttons/ItemButton'
import Octicons from '@expo/vector-icons/Octicons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Divider from '../../Components/Labels/Divider'
import mockUser from '../../Data/UserInfo'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios'
import baseUrl from '../../../assets/common/baseUrl'
import Toast from 'react-native-toast-message'

const User = ({ navigation }) => {
  const [user, setUser] = useState({})

  const getUser = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      const config = {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      }

      const response = await axios.get(`${baseUrl}/user/profile`, config)
      setUser(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      getUser()
    }, []),
  )

  const logout = async () => {
    await AsyncStorage.removeItem('id')
    await AsyncStorage.removeItem('token')
    navigation.navigate('AuthNavigation', { screen: 'Login' })
    Toast.show({
      type: 'success',
      text1: 'Logout Successful',
      text2: 'See you soon!',
    })
  }

  useEffect(() => {
    setUser(mockUser)
  }, [])

  return (
    <SafeAreaView
      style={{
        position: 'relative',
        backgroundColor: colors.primary,
        flex: 1,
        width: '100%',
      }}
    >
      <View style={{ width: '100%', padding: 10, flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            borderRadius: 10,
          }}
        >
          <View
            style={{
              overflow: 'hidden',
              width: 80,
              height: 80,
              borderRadius: 50,
              marginRight: 10,
              borderWidth: 2,
            }}
          >
            <Image
              source={{ uri: user?.image?.url }}
              style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
            />
          </View>
          <View>
            <Text style={{ fontSize: 22 }}>{user?.username || 'No Name'}</Text>
            <Text style={{ color: '#5c5c5c' }}>
              {user?.role === 'user' ? 'Customer' : 'Admin'}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'flex-end',
              flex: 1,
            }}
            onPress={() => navigation.navigate('EditUser')}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}
            >
              <AntDesign name="edit" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: 10, gap: 10 }}>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <AntDesign name="phone" size={18} color="black" />
            <Text>{user?.phone}</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Entypo name="email" size={18} color="black" />
            <Text>{user?.email}</Text>
          </View>
        </View>
        {/* <View
          style={{
            borderTopWidth: 1,
            borderBottomWidth: 1,
            height: 100,
            flexDirection: 'row',
            marginVertical: 10,
          }}
        >
          <View
            style={{
              borderRightWidth: 1,
              width: '50%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 18 }}>
              ${user?.wallet ? user.wallet.toFixed(2) : '0.00'}
            </Text>
            <Text style={{ fontSize: 12 }}>Wallet</Text>
          </View>
          <View
            style={{
              width: '50%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 18 }}>{user?.orders?.length}</Text>
            <Text style={{ fontSize: 12 }}>Orders</Text>
          </View>
        </View> */}
        <View>
          <ItemButton
            icon={<AntDesign name="hearto" size={24} color="black" />}
            text="Your Favorites"
          />
          <ItemButton
            onPress={() => navigation.navigate('Orders')}
            text="Your Orders"
            icon={<AntDesign name="shoppingcart" size={24} color="black" />}
          />
          <ItemButton
            text="Promotions"
            icon={
              <MaterialCommunityIcons name="sale" size={24} color="black" />
            }
          />
          <ItemButton
            text="Settings"
            icon={<Octicons name="gear" size={24} color="black" />}
          />
          <View style={{ marginVertical: 20 }}>
            <Divider />
          </View>

          <ItemButton
            onPress={logout}
            text="Logout"
            icon={<AntDesign name="logout" size={24} color="black" />}
          />
        </View>
      </View>

      <BottomNavigation navigation={navigation} />
    </SafeAreaView>
  )
}

export default User
