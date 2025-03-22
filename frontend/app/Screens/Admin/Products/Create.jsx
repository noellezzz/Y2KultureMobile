import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TouchableOpacity,
} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker'
import { Camera } from 'expo-camera'
import Floater from '../../../Components/Buttons/Floater'
import Feather from '@expo/vector-icons/Feather'
import colors from '../../../styles/colors'
import LgText from '../../../Components/Labels/LgText'
import PrimeButton from '../../../Components/Buttons/PrimeButton'
import Dropdown from '../../../Components/Input/Dropdown'
import ProductTypes from '../../../Data/ProductTypes'
import ProductStatus from '../../../Data/ProductStatus'
import InputField from '../../../Components/Input/InputField'
import AntDesign from '@expo/vector-icons/AntDesign'

const CreateProduct = ({ navigation }) => {
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [productImage, setProductImage] = useState(null)
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    let isValid = true
    const newErrors = {}

    if (!productName.trim()) {
      newErrors.productName = 'Product name is required'
      isValid = false
    }

    if (!productPrice.trim()) {
      newErrors.productPrice = 'Price is required'
      isValid = false
    } else if (!/^\$?\d+(\.\d{1,2})?$/.test(productPrice.replace('$', ''))) {
      newErrors.productPrice = 'Price must be a valid amount'
      isValid = false
    }

    if (!selectedType) {
      newErrors.productType = 'Product type is required'
      isValid = false
    }

    if (!selectedStatus) {
      newErrors.productStatus = 'Product status is required'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleCreateProduct = () => {
    if (validateForm()) {
      const formattedPrice = productPrice.startsWith('$')
        ? productPrice
        : `$${productPrice}`
      const newProduct = {
        name: productName,
        price: formattedPrice,
        type: selectedType,
        status: selectedStatus,
        image: productImage,
      }
      console.log('New Product Created:', newProduct)
      navigation.navigate('Products')
    }
  }

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      alert('Permission to access gallery is required!')
      return
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    if (!result.canceled) {
      setProductImage(result.assets[0].uri)
    }
  }

  const takePhoto = async () => {
    console.log('Requesting camera permissions...')

    try {
      const permissionResult = await Camera.requestCameraPermissionsAsync()
      console.log('Camera permission result:', permissionResult)

      if (permissionResult.status !== 'granted') {
        alert('Permission to access camera is required!')
        return
      }

      console.log('Launching camera...')

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      })

      console.log('Camera result:', result)

      if (!result.canceled) {
        console.log('Photo taken:', result.assets[0].uri)
        setProductImage(result.assets[0].uri)
      } else {
        console.log('Camera action was canceled')
      }
    } catch (error) {
      console.error('Error while requesting camera permissions:', error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <View style={{ marginBottom: 20, zIndex: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Floater
                icon={<Feather name="arrow-left" size={16} color="black" />}
                onPress={() => navigation.goBack()}
              />
              <View style={{ marginLeft: 10 }}>
                <LgText text="Create New Product" />
              </View>
            </View>
          </View>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            style={{ padding: 5 }}
          >
            <View
              style={{
                marginVertical: 10,
                width: '100%',
                flex: 1,
                boxShadow: '1px 1px 0px 2px rgba(0,0,0,1)',
                height: 200,
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  height: '100%',
                  backgroundColor: '#fefefe',
                  borderRadius: 10,
                }}
              >
                <View style={styles.imageContainer}>
                  {productImage && (
                    <Image
                      source={{ uri: productImage }}
                      style={styles.image}
                    />
                  )}
                  {!productImage && (
                    <View style={{ height: '100%', justifyContent: 'center' }}>
                      <LgText
                        text="No Image Selected"
                        style={{ color: 'gray' }}
                      />
                    </View>
                  )}
                </View>
              </View>
              <View style={styles.imageButtons}>
                <TouchableOpacity
                  onPress={pickImage}
                  style={styles.imageButton}
                >
                  <AntDesign name="upload" size={16} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={takePhoto}
                  style={styles.imageButton}
                >
                  <AntDesign name="camera" size={16} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <InputField
                label="Product Name"
                value={productName}
                onChangeText={setProductName}
                errors={errors}
                keyboardType="default"
              />
            </View>

            <View style={styles.inputContainer}>
              <InputField
                label="Price"
                value={productPrice}
                onChangeText={setProductPrice}
                errors={errors}
                keyboardType="numeric"
              />
            </View>

            <View style={{ marginTop: 10 }}>
              <Dropdown
                items={ProductTypes}
                selectedValue={selectedType}
                onValueChange={setSelectedType}
                label="Product Type"
              />
              {errors.productType && (
                <LgText text={errors.productType} style={styles.errorText} />
              )}
            </View>

            <View style={styles.dropdownContainer}>
              <Dropdown
                items={ProductStatus}
                selectedValue={selectedStatus}
                onValueChange={setSelectedStatus}
                label="Product Status"
              />
              {errors.productStatus && (
                <LgText text={errors.productStatus} style={styles.errorText} />
              )}
            </View>

            <View style={styles.buttonContainer}>
              <PrimeButton
                text="Create Product"
                onPress={handleCreateProduct}
              />
              <PrimeButton
                text="Cancel"
                onPress={() => navigation.goBack()}
                style={styles.cancelButton}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: '100%',
    padding: 10,
  },
  inputContainer: {
    marginBottom: 10,
    marginTop: 10,
  },
  input: {
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    borderBottomWidth: 1,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  imageButtons: {
    flexDirection: 'row',
    gap: 8,
    flex: 1,
    padding: 5,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    borderRadius: 10,
    position: 'absolute',
    right: 10,
  },
  imageButton: {
    padding: 5,
    backgroundColor: colors.quaternary,
    borderRadius: 5,
    boxShadow: '1px 1px 0px 2px rgba(0,0,0,1)',
  },
  buttonContainer: {
    gap: 15,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    backgroundColor: '#fefefe',
  },
})

export default CreateProduct
