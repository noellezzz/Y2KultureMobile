import { View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native'
import Feather from '@expo/vector-icons/Feather'
import { default as Text } from '../Labels/CustomText'

const screenWidth = Dimensions.get('window').width

const ProductTile = ({ item, navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Product', { item })}>
      <View
        style={{
          height: 220,
          width: screenWidth * 0.5 - 20,
          margin: 5,
        }}
      >
        <View
          style={{
            borderWidth: 2,
            borderRadius: 20,
            height: '80%',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <View
            style={{
              position: 'absolute',
              right: 10,
              top: 10,
              zIndex: 10,
              backgroundColor: 'black',
              padding: 5,
              borderRadius: 50,
            }}
          >
            <Feather name="heart" size={20} color="white" />
          </View>
          <Image
            source={{ uri: item?.image?.url }}
            style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
          />
        </View>
        <View style={{ padding: 5 }}>
          <Text style={{ fontSize: 16 }}>{item?.title}</Text>
          <Text style={{ fontSize: 12 }}>
            ₱{Number(item?.price).toFixed(2)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ProductTile
