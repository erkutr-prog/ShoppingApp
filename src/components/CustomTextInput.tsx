import {View, Text, Dimensions, StyleSheet, KeyboardTypeOptions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {colors} from '../assets/colors';

type Props = {
    textInputstyle: object,
    onInputChange: Function,
    keyboardType: KeyboardTypeOptions,
    placeholder?: string,
    customValue?: string,
    maxValue?: number
};

const CustomTextInput = (props: Props) => {
  const [text, SetText] = useState('');


  return (
    <TextInput
      multiline
      keyboardType={props.keyboardType}
      style={[styles.baseStyle, props.textInputstyle]}
      value={props.customValue !== undefined ? props.customValue : text}
      textAlignVertical={'center'}
      placeholder={props.placeholder !== undefined ? props.placeholder : ''}
      maxLength={props.maxValue !== undefined ? props.maxValue : undefined}
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
