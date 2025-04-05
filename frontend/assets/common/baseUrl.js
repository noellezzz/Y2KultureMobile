import { Platform } from 'react-native'

let baseUrl = ''
{
  Platform.OS == 'android'
    ? (baseUrl = 'http://192.168.1.147:8080')
    : (baseUrl = 'http://192.168.1.147:8080')
}

export default baseUrl
