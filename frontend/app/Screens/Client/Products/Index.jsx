import { Image, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { default as Text } from '../../../Components/Labels/CustomText'
import colors from '../../../styles/colors'
import AntDesign from '@expo/vector-icons/AntDesign'
import Products from '../../../Data/Products'
import LgText from '../../../Components/Labels/LgText'
import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import PrimeButton from '../../../Components/Buttons/PrimeButton'

const Index = ({ route, navigation }) => {
  const { id } = route.params || {}
  const product = Products.find(product => product.id === id)

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
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <AntDesign name="arrowleft" size={24} color="black" />
            <LgText>Products</LgText>
          </View>
          <View style={{ flexDirection: 'row', gap: 10, paddingRight: 10 }}>
            <Ionicons name="bag-handle-outline" size={24} color="black" />
            <AntDesign name="hearto" size={24} color="black" />
          </View>
        </View>
      </TouchableOpacity>
      <View style={{ marginVertical: 10, position: 'relative' }}>
        <Image
          source={product.image}
          style={{
            width: '100%',
            height: 400,
            resizeMode: 'cover',
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
            <Text style={{ fontSize: 12 }}>3.9 | 39</Text>
          </View>
        </View>
      </View>
      <View>
        <Text style={{ fontSize: 24 }}>{product.name}</Text>
        <Text style={{ fontSize: 16 }}>{product.price}</Text>
        <View style={{ marginVertical: 10 }}>
          <Text>Description</Text>
          <Text style={{ fontSize: 16 }}>{product.description}</Text>
        </View>
        <View style={{ marginVertical: 10, minHeight: 200 }}>
          <Text>Reviews</Text>
          {product.reviews.length === 0 && (
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
          )}
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
          text="Add To Cart"
          icon={<Ionicons name="bag-handle-outline" size={24} color="black" />}
          styles={{ backgroundColor: 'white' }}
        />
      </View>
    </SafeAreaView>
  )
}

export default Index
