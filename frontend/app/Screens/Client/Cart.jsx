import { FlatList, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../styles/colors'
import BottomNavigation from '../../Components/Buttons/BottomNavigation'
import LgText from '../../Components/Labels/LgText'
import { default as Text } from '../../Components/Labels/CustomText'
import Divider from '../../Components/Labels/Divider'
import CartTile from '../../Components/Layout/CartTile'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import baseUrl from '../../../assets/common/baseUrl'
import { useFocusEffect } from '@react-navigation/native'
import PrimeButton from '../../Components/Buttons/PrimeButton'
import Ionicons from '@expo/vector-icons/Ionicons'

const Cart = ({ navigation }) => {
  const [cart, setCart] = useState([])
  const [cartItems, setCartItems] = useState([])

  const getCartItems = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      const config = {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      }

      const response = await axios.get(`${baseUrl}/cart/`, config)
      setCartItems(response.data.cartItems)
      setCart(response.data.cart)
    } catch (error) {
      console.log(error)
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      getCartItems()
    }, []),
  )

  return (
    <SafeAreaView
      style={{
        position: 'relative',
        backgroundColor: colors.primary,
        flex: 1,
        width: '100%',
      }}
    >
      {cartItems.length === 0 ? (
        <View
          style={{
            width: '100%',
            padding: 10,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <LgText>Shopping Cart</LgText>
            <Text style={{ fontSize: 12, marginTop: 5 }}>
              Your cart is empty
            </Text>
            <View style={{ marginVertical: 10, width: '100%' }}>
              <Divider />
            </View>
            <PrimeButton
              onPress={() => navigation.navigate('Home')}
              text="Continue Shopping"
              icon={<Ionicons name="arrow-forward" size={16} color="black" />}
              styles={{ backgroundColor: 'white', marginTop: 10 }}
            />
          </View>
        </View>
      ) : (
        <View style={{ width: '100%', padding: 10, flex: 1 }}>
          <LgText>Shopping Cart</LgText>
          <Text style={{ fontSize: 12 }}>{cartItems.length} Items</Text>
          <View style={{ marginVertical: 10 }}>
            <Divider />
          </View>

          <View style={{ gap: 10 }}>
            <FlatList
              data={cartItems}
              renderItem={({ item }) => (
                <CartTile item={item} getCartItems={getCartItems} />
              )}
              keyExtractor={item => item._id}
              showsVerticalScrollIndicator={false}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}
          >
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Total: </Text>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
              ₱ {Number(cart?.totalAmount).toFixed(2)}
            </Text>
          </View>

          <PrimeButton
            onPress={() => navigation.navigate('Checkout', { cart })}
            text="Proceed to checkout"
            icon={
              <Ionicons name="bag-handle-outline" size={16} color="black" />
            }
            styles={{ backgroundColor: 'white', marginTop: 10 }}
          />
        </View>
      )}

      <BottomNavigation navigation={navigation} />
    </SafeAreaView>
  )
}

export default Cart
