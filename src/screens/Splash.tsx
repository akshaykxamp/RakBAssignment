import * as React from 'react';
import {View, StyleSheet, Image, Alert, ActivityIndicator} from 'react-native';
import {Colors} from '../styles/Colors';
import {Constants} from '../constants/Constants';
import {
  disableScreenshot,
  enableScreenshot,
} from 'screenshot-control-by-akshay';
import {Error} from '../constants/Error';
import {fetchDeviceInfo} from '../utils/DeviceInfo';
import {updateData} from '../services/Services';
import RadioButton_ from '../components/RadioButton';

interface SplashProps {}

const Splash = (props: SplashProps) => {
  const [buttonStatus, setButtonStatus] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const [checked, setChecked] = React.useState('first');

  React.useEffect(() => {
    if (buttonStatus) {
      try {
        enableScreenshot();
        getDeviceInfo();
      } catch (error) {
        Alert.alert(Error.ErrorEnablingScreenshots);
      }
    } else {
      try {
        disableScreenshot();
      } catch (error) {
        Alert.alert(Error.ErrorDisablingScreenshots);
      }
    }
  }, [buttonStatus]);

  const getDeviceInfo = async () => {
    setLoader(true);
    try {
      const info = await fetchDeviceInfo();
      await updateData(Constants.TemporaryUrl, info);
    } catch (error) {
      console.error('Error fetching or updating data:', error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/RBLogo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.buttonView}>
        {/* <ActivateButton
          isActivate={buttonStatus}
          onPress={() => setButtonStatus(!buttonStatus)}
        /> */}

        <RadioButton_
          isActivate={buttonStatus}
          onPress={() => setButtonStatus(!buttonStatus)}
        />


        <ActivityIndicator
          size={'small'}
          color={loader ? Colors.blue : Colors.white}
          style={{marginTop: 50}}
        />
      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: Constants.LogoHeight,
    width: Constants.LogoWidth,
  },
  buttonView: {
    marginTop: Constants.LogoHeight,
    marginBottom: -Constants.LogoHeight,
  },
});
