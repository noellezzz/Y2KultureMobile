import { FlatList, Image, ScrollView, TextInput, View } from 'react-native'
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
import model2 from '../../../assets/images/model2.jpg'
import model3 from '../../../assets/images/model3.jpg'
import model4 from '../../../assets/images/model4.jpg'
import model5 from '../../../assets/images/model5.jpg'
import model6 from '../../../assets/images/model6.jpg'
import Avatar from '../../Components/Layout/Avatar'
import Products from '../../Data/Products'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import baseUrl from '../../../assets/common/baseUrl'

const Home = ({ navigation }) => {
  const [user, setUser] = useState({})
  const [products, setProducts] = useState([])

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

  // console.log('Products:', products)

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
                color={colors.quinary}
                icon={<Ionicons name="shirt" size={20} color="black" />}
              />
              <IconButton
                text="Formal"
                color={colors.quaternary}
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
                color={colors.senary}
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
                color={colors.septary}
                icon={<FontAwesome5 name="vest" size={20} color="black" />}
              />
            </View>
          </View>
          <View style={{ marginVertical: 5 }}>
            <SectionTitle text="Collections" />
            <FlatList
              data={products}
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
                data={products}
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
