import {PermissionsAndroid, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Geolocation from 'react-native-geolocation-service';
import WifiManager from 'react-native-wifi-reborn';

export const fetchDeviceInfo = async () => {
  try {
    const os = Platform.OS;
    const deviceName = await DeviceInfo.getDeviceName();

    let macAddress = 'Not Available';
    try {
      macAddress = await WifiManager.getBSSID();
    } catch (error) {
      console.log('MAC Address Error:', error);
    }

    const imei = await DeviceInfo.getUniqueId();
    let location = { latitude: 'Not Available', longitude: 'Not Available' };
    return {
      os,
      deviceName,
      macAddress,
      imei,
      location,
    };
  } catch (error) {
    console.error('Error Fetching Device Info:', error);
    throw error;
  }
};



export const requestLocationPermission = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'This app needs access to your location.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } else if (Platform.OS === 'ios') {
    try {
      const { PERMISSIONS, request, RESULTS } = require('react-native-permissions');
      const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      return result === RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
};

export const getCurrentLocation = async () => {
  const hasPermission = await requestLocationPermission();
  if (hasPermission) {
    Geolocation.getCurrentPosition(
      position => {
        console.log('Location:', position);
      },
      error => {
        console.error('Location Error:', error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  } else {
    console.warn('Location permission denied');
  }
};
