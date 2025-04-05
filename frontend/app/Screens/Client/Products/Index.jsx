import {
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { default as Text } from '../../../Components/Labels/CustomText'
import colors from '../../../styles/colors'
import AntDesign from '@expo/vector-icons/AntDesign'
import Products from '../../../Data/Products'
import LgText from '../../../Components/Labels/LgText'
import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import PrimeButton from '../../../Components/Buttons/PrimeButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import baseUrl from '../../../../assets/common/baseUrl'
import axios from 'axios'
import Toast from 'react-native-toast-message'

const Index = ({ route, navigation }) => {
  const { item } = route.params || {}
  const [modalOpen, setModalOpen] = useState(false)
  // const [selectedSize, setSelectedSize] = useState(null)
  // const [selectedColor, setSelectedColor] = useState(null)

  const addProductToCart = async () => {
    const cartItem = {
      productId: item?._id,
      quantity: 1,
      totalPrice: Number(item?.price),
    }
    try {
      const token = await AsyncStorage.getItem('token')
      console.log(token)
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }

        await axios.post(`${baseUrl}/cart/`, cartItem, config)
        navigation.navigate('Cart')
        setModalOpen(false)
        Toast.show({
          type: 'success',
          text1: 'Success ✅',
          text2: 'Product has been added to your cart 🛒',
        })
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error ❌',
          text2: 'Please login to add items to your cart',
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

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
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
            >
              <AntDesign name="arrowleft" size={24} color="black" />
              <LgText>Products</LgText>
            </View>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', gap: 10, paddingRight: 10 }}>
            <Ionicons name="bag-handle-outline" size={24} color="black" />
            <AntDesign name="hearto" size={24} color="black" />
          </View>
        </View>
      </View>
      <View style={{ marginVertical: 10, position: 'relative' }}>
        <Image
          source={{ uri: item?.image?.url }}
          style={{
            width: '100%',
            height: 400,
            resizeMode: 'cover',
            objectFit: 'cover',
            borderRadius: 20,
            borderWidth: 2,
          }}
        />
        <View
          style={{
            position: 'absolute',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 10,
            width: '100%',
            height: 60,
            bottom: 10,
            paddingHorizontal: 20,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              padding: 10,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              borderRadius: 20,
              boxShadow: '1px 1px 0px 2px rgba(0,0,0,1)',
            }}
          >
            <MaterialCommunityIcons
              name="cards-variant"
              size={16}
              color="black"
            />
            <Text style={{ fontSize: 12 }}>Find Similar</Text>
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: 'white',
              padding: 10,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              borderRadius: 20,
              boxShadow: '1px 1px 0px 2px rgba(0,0,0,1)',
            }}
          >
            <AntDesign name="star" size={14} color={colors.quaternary} />
            {/* <Text style={{ fontSize: 12 }}>
              {product.reviews.length > 0
                ? (
                    product.reviews.reduce((sum, review) => sum + review, 0) /
                    product.reviews.length
                  ).toFixed(1)
                : 'No Reviews'}
              | {product.reviews.length}
            </Text> */}
          </View>
        </View>
      </View>
      <View>
        <Text style={{ fontSize: 24 }}>{item?.title}</Text>
        <Text style={{ fontSize: 16 }}>₱{Number(item?.price).toFixed(2)}</Text>
        <View style={{ marginVertical: 10 }}>
          <Text>Description</Text>
          <Text style={{ fontSize: 16 }}>{item?.description}</Text>
        </View>
        <View style={{ marginVertical: 10, minHeight: 200 }}>
          <Text>Reviews</Text>
          {/* {product.reviews.length === 0 && (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  alignItems: 'center',
                  color: 'gray',
                }}
              >
                No reviews yet. Be the first to review!
              </Text>
            </View>
          )}
          {product.reviews.length > 0 && (
            <View>
              {product.reviews.map((review, index) => (
                <View key={index} style={{ marginVertical: 5 }}>
                  <Text>{review.name}</Text>
                  <Text>{review.comment}</Text>
                </View>
              ))}
            </View>
          )} */}
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: 80,
          bottom: 0,
          left: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <PrimeButton text="Buy Now" />
        <PrimeButton
          onPress={() => setModalOpen(true)}
          text="Add To Cart"
          icon={<Ionicons name="bag-handle-outline" size={16} color="black" />}
          styles={{ backgroundColor: 'white' }}
        />
      </View>
      {modalOpen && (
        <View
          style={{
            position: 'absolute',
            zIndex: 100,
            backgroundColor: 'rgba(0,0,0,0.3)',
            borderWidth: 1,
            left: 0,
            top: 0,
            flex: 1,
            width: '105%',
            height: '120%',
          }}
        >
          <TouchableWithoutFeedback onPress={() => setModalOpen(false)}>
            <View
              style={{
                borderWidth: 1,
                flexGrow: 1,
                width: '100%',
                zIndex: 100,
              }}
            ></View>
          </TouchableWithoutFeedback>
          <View
            style={{
              width: '100%',
              height: 300,
              position: 'absolute',
              bottom: 0,
              left: 0,
              backgroundColor: 'white',
              padding: 10,
              zIndex: 101,
            }}
          >
            <LgText text="Add to Cart?" />
            <View style={{ flexDirection: 'row', gap: 10, marginVertical: 10 }}>
              {/* {product.stock.map((stock, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedSize(stock.size)}
                >
                  <View
                    style={{
                      backgroundColor:
                        selectedSize === stock.size
                          ? colors.quaternary
                          : 'white',
                      padding: 10,
                      paddingHorizontal: 20,
                      borderWidth: 1,
                      borderRadius: 10,
                    }}
                  >
                    <Text>{stock.size}</Text>
                  </View>
                </TouchableOpacity>
              ))} */}
            </View>
            <View style={{ flexDirection: 'row', gap: 10, marginBottom: 10 }}>
              {/* {product.stock.map((stock, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedColor(stock.color)}
                >
                  <View
                    style={{
                      backgroundColor:
                        selectedColor === stock.color
                          ? colors.quaternary
                          : 'white',
                      padding: 10,
                      paddingHorizontal: 20,
                      borderWidth: 1,
                      borderRadius: 10,
                    }}
                  >
                    <Text>{stock.color}</Text>
                  </View>
                </TouchableOpacity>
              ))} */}
            </View>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <PrimeButton text="Yes" onPress={addProductToCart} />
              <PrimeButton
                styles={{ backgroundColor: 'white' }}
                text="No"
                onPress={() => setModalOpen(false)}
              />
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  )
}

export default Index
