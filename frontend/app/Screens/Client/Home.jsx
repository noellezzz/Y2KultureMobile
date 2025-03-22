import { Image, ScrollView, TextInput, View } from 'react-native'
import React from 'react'
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

const Home = ({ navigation }) => {
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
            <Avatar image={hanni} />
            <View>
              <Text>Hi, Mark,</Text>
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
                text="Casual"
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
            <ScrollView
              style={{ paddingTop: 5, paddingBottom: 15, paddingHorizontal: 5 }}
              horizontal={true}
            >
              <LgTile
                text="Collection Series"
                category="Formal Wear"
                image={model5}
                newItem={true}
              />
              <LgTile
                text="Collection Series"
                category="Casual Wear"
                image={model6}
                best={true}
              />
              <LgTile
                text="Collection Series"
                category="Sports Wear"
                image={model4}
                sale={true}
              />
            </ScrollView>
          </View>
          <View>
            <SectionTitle text="Top Seller's" />
            <View
              style={{
                flexWrap: 'wrap',
                flexDirection: 'row',
                gap: 10,
                marginTop: 10,
              }}
            >
              <ProductTile title="Black Suit" price="$4.99" image={model2} />
              <ProductTile title="Black Trouser" price="$5.99" image={model3} />
              <ProductTile title="White Sweater" price="$2.99" image={model4} />
              <ProductTile title="Brown Jacket" price="$6.99" image={model5} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home
