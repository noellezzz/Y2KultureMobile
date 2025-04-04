import { Image, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { default as Text } from '../Labels/CustomText'
import Ionicons from '@expo/vector-icons/Ionicons'
import AntDesign from '@expo/vector-icons/AntDesign'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import baseUrl from '../../../assets/common/baseUrl'

const CartTile = ({ item, getCartItems }) => {
  const increment = async productId => {
    try {
      const token = await AsyncStorage.getItem('token')
      const config = {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      }

      await axios.patch(`${baseUrl}/cart/increment/${productId}`, {}, config)
      getCartItems()
    } catch (error) {
      console.log(error)
    }
  }

  const decrement = async productId => {
    try {
      const token = await AsyncStorage.getItem('token')
      const config = {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      }

      await axios.patch(`${baseUrl}/cart/decrement/${productId}`, {}, config)
      getCartItems()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        height: 100,
        borderWidth: 1,
        borderRadius: 20,
        overflow: 'hidden',
        padding: 10,
        marginTop: 10,
      }}
    >
      <View
        style={{
          width: 80,
          height: 80,
          marginRight: 10,
          overflow: 'hidden',
          borderRadius: 20,
        }}
      >
        <Image
          source={{ uri: item?.productId?.image?.url }}
          style={{ height: '100%', width: '100%', resizeMode: 'cover' }}
        />
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          flex: 1,
        }}
      >
        <View>
          <Text style={{ fontSize: 18 }}>{item?.productId?.title}</Text>
          <Text style={{ fontSize: 14 }}>{item?.productId?.category}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>₱ {Number(item?.totalPrice).toFixed(2)}</Text>
          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
            <TouchableOpacity onPress={() => increment(item?.productId._id)}>
              <Ionicons name="add" size={16} color="black" />
            </TouchableOpacity>
            <Text>{item?.quantity}</Text>
            <TouchableOpacity onPress={() => decrement(item?.productId._id)}>
              <AntDesign name="minus" size={16} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default CartTile
