import {View, Text, Dimensions, StyleSheet, KeyboardTypeOptions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {colors} from '../assets/colors';
import { Navigation } from 'react-native-navigation';

type Props = {
    textInputstyle: object,
    onInputChange: Function,
    keyboardType: KeyboardTypeOptions,
};

const CustomTextInput = (props: Props) => {
  const [text, SetText] = useState('');


  return (
    <TextInput
      multiline
      keyboardType={props.keyboardType}
      style={[styles.baseStyle, props.textInputstyle]}
      value={text}
      onChangeText={text => [props.onInputChange(text), SetText(text)]}>
      </TextInput>
  );
};

const styles = StyleSheet.create({
    baseStyle: {
        alignSelf: 'center',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'black',
        height: 45,
        backgroundColor: colors.PRODUCT_CARD_BG,
      }
})

export default CustomTextInput;
