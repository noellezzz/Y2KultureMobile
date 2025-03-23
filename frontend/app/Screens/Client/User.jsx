import { Image, TouchableOpacity, View } from 'react-native'
import React from 'react'
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

const User = ({ navigation }) => {
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
              source={hanni}
              style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
            />
          </View>
          <View>
            <Text style={{ fontSize: 22 }}>Mark Codog</Text>
            <Text style={{ color: '#5c5c5c' }}>Standard User</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}
          >
            <AntDesign name="edit" size={24} color="black" />
          </View>
        </View>
        <View style={{ marginVertical: 10, gap: 10 }}>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <AntDesign name="phone" size={18} color="black" />
            <Text>+123456789</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Entypo name="email" size={18} color="black" />
            <Text>sample@gmail.com</Text>
          </View>
        </View>
        <View
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
            <Text style={{ fontSize: 18 }}>$140.00</Text>
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
            <Text style={{ fontSize: 18 }}>12</Text>
            <Text style={{ fontSize: 12 }}>Orders</Text>
          </View>
        </View>
        <View>
          <ItemButton
            icon={<AntDesign name="hearto" size={24} color="black" />}
            text="Your Favorites"
          />
          <ItemButton
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
