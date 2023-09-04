import {
  StyleSheet,
  KeyboardTypeOptions,
  View,
  Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {colors} from '../assets/colors';

type Props = {
  textInputstyle: object;
  onInputChange: Function;
  keyboardType: KeyboardTypeOptions;
  placeholder?: string;
  customValue?: string;
  maxValue?: number;
  secureTextEntry?: boolean;
  multiline?: boolean;
  passwordValidation?: boolean;
  isError?: string | null
};

const CustomTextInput = (props: Props) => {
  const [text, SetText] = useState('');
  const [isFocused, setFocused] = useState<boolean>();

  const checkInputBorder = () => {
    if (props.passwordValidation === undefined) {
      if (!isFocused) {
        return colors.PRODUCT_PRICE_TEXT
      } else {
        return 'black'
      }
    } else {
      if (isFocused) {
        return 'black'
      }
      if (props.passwordValidation) {
        return colors.PRODUCT_PRICE_TEXT
      } else {
        return 'red'
      }
    }
  }

  return (
    <View style={{flexDirection: 'column'}}>
      <TextInput
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        multiline={props.multiline !== undefined ? false : true}
        secureTextEntry={props.secureTextEntry ? true : false}
        keyboardType={props.keyboardType}
        style={[
          styles.baseStyle,
          props.textInputstyle,
          {borderColor: checkInputBorder()},
          {borderWidth: props.passwordValidation !== undefined && !props.passwordValidation ? 3 : 1}
        ]}
        value={props.customValue !== undefined ? props.customValue : text}
        textAlignVertical={'center'}
        placeholder={props.placeholder !== undefined ? props.placeholder : ''}
        maxLength={props.maxValue !== undefined ? props.maxValue : undefined}
        onChangeText={text => [props.onInputChange(text), SetText(text)]}
      />
      {
        props.passwordValidation !== undefined && !props.passwordValidation
        ?
        <Text style={{fontSize: 15, color: 'red'}}>
          Your passwords doesn't match.
        </Text>
        :
        null
      }
      {
        !!props.isError && typeof props.isError === 'string'
        ?
        <Text style={{fontSize: 15, color: 'red'}}>
          {props.isError}
        </Text>
        :
        null
      }
    </View>
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
  },
});

export default CustomTextInput;
