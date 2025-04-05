import { FlatList, Image, ScrollView, TextInput, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../styles/colors'
import BottomNavigation from '../../Components/Buttons/BottomNavigation'
import { default as Text } from '../../Components/Labels/CustomText'
import IconButton from '../../Components/Buttons/IconButton'
import LgTile from '../../Components/Layout/LgTile'
import SectionTitle from '../../Components/Layout/SectionTitle'
import AntDesign from '@expo/vector-icons/AntDesign'
import IconInput from '../../Components/Input/IconInput'
import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import ProductTile from '../../Components/Layout/ProductTile'
import hanni from '../../../assets/images/hanni.jpg'
import Avatar from '../../Components/Layout/Avatar'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import baseUrl from '../../../assets/common/baseUrl'
import Slider from '@react-native-community/slider'

const Home = ({ navigation }) => {
  const [user, setUser] = useState({})
  const [products, setProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 })

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

  const getAllProducts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/product/`)
      setProducts(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      getUser()
      getAllProducts()
    }, []),
  )

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true
    const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max
    return matchesCategory && matchesPrice
  })

  return (
    <SafeAreaView
      style={{
        position: 'relative',
        backgroundColor: colors.primary,
        flex: 1,
        width: '100%',
      }}
    >
      <ScrollView>
        <View style={{ width: '100%', padding: 10, flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              gap: 10,
              height: 60,
            }}
          >
            <Avatar image={{ uri: user ? user?.image?.url : hanni }} />
            <View>
              <Text>{user?.username}</Text>
              <Text>Welcome Back!</Text>
            </View>
          </View>
          <View style={{ marginVertical: 10 }}>
            <IconInput
              icon={<AntDesign name="search1" size={24} color="black" />}
              placeholder="Search"
            />
          </View>
          <View style={{ marginVertical: 5 }}>
            <SectionTitle text="Categories" />
            <View style={{ marginVertical: 3, flexDirection: 'row', gap: 5 }}>
              <IconButton
                text="Casual"
                color={selectedCategory === 'Casual' ? colors.secondary : colors.quinary}
                onPress={() => {
                  setSelectedCategory(selectedCategory === 'Casual' ? '' : 'Casual')
                }}
                icon={<Ionicons name="shirt" size={20} color="black" />}
              />
              <IconButton
                text="Formal"
                color={selectedCategory === 'Formal' ? colors.secondary : colors.quaternary}
                onPress={() => {
                  setSelectedCategory(selectedCategory === 'Formal' ? '' : 'Formal')
                }}
                icon={
                  <MaterialCommunityIcons
                    name="shoe-formal"
                    size={20}
                    color="black"
                  />
                }
              />
            </View>
            <View style={{ marginVertical: 3, flexDirection: 'row', gap: 5 }}>
              <IconButton
                text="Sports"
                color={selectedCategory === 'Sports' ? colors.secondary : colors.senary}
                onPress={() => {
                  setSelectedCategory(selectedCategory === 'Sports' ? '' : 'Sports')
                }}
                icon={
                  <MaterialIcons
                    name="sports-baseball"
                    size={24}
                    color="black"
                  />
                }
              />
              <IconButton
                text="Others"
                color={selectedCategory === 'Others' ? colors.secondary : colors.septary}
                onPress={() => {
                  setSelectedCategory(selectedCategory === 'Others' ? '' : 'Others')
                }}
                icon={<FontAwesome5 name="vest" size={20} color="black" />}
              />
            </View>
          </View>

          <View style={{ marginVertical: 10 }}>
            <SectionTitle text="Price Range" />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text>Min: ₱{priceRange.min}</Text>
              <Text>Max: ₱{priceRange.max}</Text>
            </View>
            <Slider
              style={{ width: '100%', height: 40 }}
              minimumValue={0}
              maximumValue={1000}
              step={10}
              value={priceRange.max}
              minimumTrackTintColor={colors.secondary}
              maximumTrackTintColor={colors.quinary}
              onSlidingComplete={(value) => setPriceRange({ ...priceRange, max: value })}
            />
          </View>

          <View style={{ marginVertical: 5 }}>
            <SectionTitle text="Collections" />
            <FlatList
              data={filteredProducts}
              renderItem={({ item }) => (
                <LgTile
                  text={item?.title}
                  category={item?.category}
                  image={{ uri: item?.image?.url }}
                  newItem={true}
                />
              )}
              keyExtractor={item => item._id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{ paddingTop: 5, paddingBottom: 15, paddingHorizontal: 5 }}
            />
          </View>
          <View>
            <SectionTitle text="Top Seller's" />
            <View
              style={{
                flexWrap: 'wrap',
                flexDirection: 'row',
                gap: 10,
                marginTop: 10,
                marginBottom: 70,
              }}
            >
              <FlatList
                data={filteredProducts}
                keyExtractor={item => item._id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  alignItems: 'center',
                }}
                numColumns={2}
                key={2}
                renderItem={({ item }) => (
                  <ProductTile item={item} navigation={navigation} />
                )}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <BottomNavigation navigation={navigation} />
    </SafeAreaView>
  )
}

export default Home