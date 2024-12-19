import * as React from 'react';
import { Text, View, StyleSheet, Pressable, Image } from 'react-native';
import { Colors } from '../styles/Colors';
import { Constants } from '../constants/Constants';

interface ActivateButtonProps {
    isActivate:boolean
    onPress:()=>void
}

const ActivateButton = (props: ActivateButtonProps) => {
    let {isActivate=false,onPress} = props
  return (

    <Pressable onPress={onPress}>
    <View style={[styles.container,{backgroundColor:Colors.blue }]}>
    <View style={[styles.arrowCircle]}>
         <Image
                source={require('../assets/upArrow.png')}
                style={styles.upArrow}
                resizeMode="contain"
              />
    </View>
    <Text style={[styles.buttonTitle,{color: Colors.white}]}>{isActivate ? Constants.Activated : Constants.Activate}</Text>
    </View>
    </Pressable>

  );
};

export default ActivateButton;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal:12,
    paddingVertical:10,
    borderRadius:20,
    flexDirection:'row',
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center'
  },
  buttonTitle:{
    fontSize:Constants.PrimaryButtonTitleSize,
    fontWeight:'500',
  },
  upArrow:{
    height:16,
    width:16,
    alignSelf:'center'
  },
  arrowCircle:{
    borderRadius:11,
    height:22,
    width:22,
    justifyContent:'center',
    backgroundColor:Colors.white,
    marginEnd:5,

  }
});
