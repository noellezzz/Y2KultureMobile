import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import Ionicons from '@expo/vector-icons/Ionicons'
import colors from '../styles/colors'
import Divider from './Labels/Divider'

const AddressSuggestions = ({ suggestions = [], onSuggestionPress }) => {
  const limitedSuggestions = suggestions.slice(0, 3)

  return (
    <FlatList
      style={{
        backgroundColor: colors.tertiary,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
      }}
      data={limitedSuggestions}
      keyExtractor={(item, index) => `${item.place_id}-${index}`}
      renderItem={({ item }) => (
        <>
          <TouchableOpacity
            onPress={() => onSuggestionPress(item)}
            style={{ flexDirection: 'row', alignItems: 'center', padding: 8 }}
          >
            <Ionicons name="location-outline" size={24} color={colors.white} />
            <Text
              style={{
                fontFamily: 'regular',
                fontSize: 14,
                marginLeft: 5,
                marginRight: 20,
                color: colors.white,
                marginBottom: 5,
              }}
            >
              {item.formatted}
            </Text>
          </TouchableOpacity>
        </>
      )}
    />
  )
}

export default AddressSuggestions

const styles = StyleSheet.create({})
