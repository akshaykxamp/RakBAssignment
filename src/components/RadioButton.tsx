import * as React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {Colors} from '../styles/Colors';
import {Constants} from '../constants/Constants';

interface RadioButtonProps {
  isActivate?: boolean;
  onPress?: () => void;
}

const RadioButton_ = (props: RadioButtonProps) => {
  let {isActivate = false, onPress =()=>{}} = props;
  return (
    <Pressable onPress={onPress}>
      <View
        testID="arrow-circle"
        style={[styles.container, {backgroundColor: Colors.lightGray}]}>
        <View
          testID="arrow-circle-disable"
          style={[
            styles.arrowCircle,
            {
              backgroundColor: isActivate ? Colors.darkGray : Colors.lightGray,
              height: isActivate ? 36 : 30,
            },
          ]}></View>

        <View
          testID="arrow-circle-enable"
          style={[
            styles.arrowCircle,
            {
              backgroundColor: isActivate ? Colors.lightGray : Colors.green,
              height: isActivate ? 30 : 36,
            },
          ]}></View>
      </View>
    </Pressable>
  );
};

export default RadioButton_;

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    marginTop: 20,
    flexDirection: 'row',
    height: 30,
    width: 80,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    fontSize: Constants.PrimaryButtonTitleSize,
    fontWeight: '500',
  },
  upArrow: {
    height: 16,
    width: 16,
    alignSelf: 'center',
  },
  arrowCircle: {
    borderRadius: 18,
    flex: 1,
    height: 36,
    width: 30,
    justifyContent: 'center',
  },
});
