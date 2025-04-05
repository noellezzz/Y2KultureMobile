import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useState } from 'react'
import colors from '../../styles/colors'
import LgText from '../../Components/Labels/LgText'
import Divider from '../../Components/Labels/Divider'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native'
import InputField from '../../Components/Input/InputField'
import AddressSuggestions from '../../Components/AddressSuggestions'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import PrimeButton from '../../Components/Buttons/PrimeButton'
import Ionicons from '@expo/vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import baseUrl from '../../../assets/common/baseUrl'
import Toast from 'react-native-toast-message'

const screenWidth = Dimensions.get('window').width

const Checkout = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const { cart } = route.params
  const [address, setAddress] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [deliveryOption, setDeliveryOption] = useState('Standard Delivery')
  const [deliveryFee, setDeliveryFee] = useState(50.0)
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery')
  const [addressError, setAddressError] = useState(false)

  const fetchSuggestions = async text => {
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&format=json&apiKey=7540990e27fa4d198afeb6d69d3c048e`,
    )
    const data = await response.json()
    setSuggestions(data.results)
  }

  const handleAddressChange = async text => {
    setAddress(text)
    fetchSuggestions(text)
  }

  const handleSuggestionPress = suggestion => {
    setAddress(suggestion.formatted)
    setSuggestions([])
  }

  const DeliveryOptions = [
    { id: 1, name: 'Standard Delivery', price: 50.0 },
    { id: 2, name: 'Express Delivery', price: 75.0 },
    { id: 3, name: 'Same Day Delivery', price: 100.0 },
    { id: 4, name: 'Pickup', price: 0 },
  ]

  const PaymentMethods = [
    { id: 1, name: 'Cash on Delivery' },
    { id: 3, name: 'Gcash' },
  ]

  const grandTotal = Number(cart?.totalAmount) + Number(deliveryFee)

  const handlePlaceOrder = async () => {
    if (address === '') {
      setAddressError(true)
    } else {
      setAddressError(false)
      try {
        const token = await AsyncStorage.getItem('token')
        const config = {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }

        const data = {
          orderItems: cart?.cartItems,
          deliveryOption: deliveryOption,
          deliveryAddress: address,
          subTotal: cart?.totalAmount.toFixed(2),
          deliveryFee,
          totalAmount: grandTotal.toFixed(2),
          paymentMethod: paymentMethod,
          orderStatus: 'Pending',
        }

        const response = await axios.post(
          `${baseUrl}/order/check-out`,
          data,
          config,
        )

        if (response.status === 200) {
          navigation.navigate('Home')
          Toast.show({
            type: 'success',
            text1: 'Payment Successful ✅',
            text2: 'Your order has been placed.',
          })
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error ❌',
            text2: 'Failed to place order',
          })
        }
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Error ❌',
          text2: error,
        })
        console.log(error)
      }
    }
  }

  return (
    <ScrollView
      style={{
        position: 'relative',
        backgroundColor: colors.primary,
        flex: 1,
        width: '100%',
      }}
    >
      <SafeAreaView style={{ width: '100%', padding: 10, flex: 1 }}>
        <LgText>Checkout items</LgText>
        <Text style={{ fontSize: 12 }}>{cart?.cartItems?.length} Items</Text>
        <View style={{ marginVertical: 10 }}>
          <Divider />
        </View>

        <View style={{ marginVertical: 10 }}>
          <LgText>Order Summary</LgText>
          <View
            style={{
              marginTop: 15,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: colors.black,
              padding: 10,
            }}
          >
            <FlatList
              data={cart?.cartItems}
              renderItem={({ item }) => (
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                  <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Image
                      source={{ uri: item?.productId?.image?.url }}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 5,
                        marginRight: 10,
                      }}
                    />
                    <View>
                      <Text>{item?.productId?.title}</Text>
                      <Text>₱ {Number(item?.totalPrice).toFixed(2)}</Text>
                    </View>
                  </View>

                  <View>
                    <Text>Qty: {item?.quantity}</Text>
                  </View>
                </View>
              )}
              keyExtractor={item => item._id}
              showsVerticalScrollIndicator={false}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}
            >
              <Text style={{ fontSize: 14 }}>Subtotal:</Text>
              <Text style={{ fontSize: 14 }}>
                ₱ {Number(cart?.totalAmount).toFixed(2)}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ fontSize: 14 }}>Delivery Option:</Text>
              <Text style={{ fontSize: 14 }}>{deliveryOption}</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ fontSize: 14 }}>Delivery Fee:</Text>
              <Text style={{ fontSize: 14 }}>
                ₱ {Number(deliveryFee).toFixed(2)}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Total:</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                ₱ {grandTotal.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ marginVertical: 10 }}>
          <LgText>Delivery Address</LgText>
          <View style={{ marginTop: 15 }}>
            <InputField
              label="Address"
              value={address}
              onChangeText={text => {
                handleAddressChange(text)
                setAddressError(false)
              }}
              keyboardType="default"
              placeholder={'Enter your address...'}
            />
            <AddressSuggestions
              suggestions={suggestions}
              onSuggestionPress={handleSuggestionPress}
            />
            {addressError && (
              <Text style={{ color: 'red', marginTop: 5 }}>
                *Please enter a valid address
              </Text>
            )}
          </View>
        </View>

        <View style={{ marginVertical: 10 }}>
          <LgText>Delivery Options</LgText>
          <FlatList
            data={DeliveryOptions}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: 'center',
            }}
            numColumns={2}
            key={2}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  padding: 10,
                  borderRadius: 10,
                  marginVertical: 5,
                  width: screenWidth / 2.2,
                  marginHorizontal: 5,
                  borderWidth: deliveryOption === item.name ? 2 : 0.5,
                  borderColor:
                    deliveryOption === item.name
                      ? colors.tertiary
                      : colors.black,
                }}
                onPress={() => {
                  setDeliveryOption(item.name)
                  setDeliveryFee(item.price)
                }}
              >
                <Text
                  style={{
                    color:
                      deliveryOption === item.name
                        ? colors.tertiary
                        : colors.black,
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    color:
                      deliveryOption === item.name
                        ? colors.tertiary
                        : colors.black,
                  }}
                >
                  ₱ {Number(item.price).toFixed(2)}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <LgText>Payment Method</LgText>
          <FlatList
            data={PaymentMethods}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: 'center',
            }}
            numColumns={2}
            key={2}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  padding: 10,
                  borderRadius: 10,
                  marginVertical: 5,
                  width: screenWidth / 2.2,
                  marginHorizontal: 5,
                  borderWidth: paymentMethod === item.name ? 2 : 0.5,
                  borderColor:
                    paymentMethod === item.name
                      ? colors.tertiary
                      : colors.black,
                }}
                onPress={() => {
                  setPaymentMethod(item.name)
                }}
              >
                <Text
                  style={{
                    color:
                      paymentMethod === item.name
                        ? colors.tertiary
                        : colors.black,
                  }}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </SafeAreaView>

      <PrimeButton
        onPress={handlePlaceOrder}
        text="Place order"
        icon={<Ionicons name="bag-handle-outline" size={16} color="black" />}
        styles={{
          backgroundColor: 'white',
          marginTop: 10,
          marginHorizontal: 10,
          marginBottom: 20,
        }}
      />
    </ScrollView>
  )
}

export default Checkout

const styles = StyleSheet.create({})
