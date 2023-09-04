import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useReducer, useState} from 'react';
import CustomTextInput from '../components/CustomTextInput';
import {FirebaseUserType, UserActions} from '../models/FirebaseUserType';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {colors} from '../assets/colors';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store';
import { setUser } from '../features/UserSlice';

type Props = {};

const {width, height} = Dimensions.get('window');

const emailRegex = new RegExp(
  /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
  'gm',
);

const initialState: FirebaseUserType = {
  email: '',
  password: '',
  displayName: '',
  phoneNumber: '',
  secondPassword: '',
};

function userInfoReducer(state: FirebaseUserType, action: UserActions) {
  switch (action.type) {
    case 'setMail':
      state.email = action.payload;
      return {...state};
    case 'setName':
      state.displayName = action.payload;
      return {...state};
    case 'setPassword':
      state.password = action.payload;
      return {...state};
    case 'setSecondPassword':
      state.secondPassword = action.payload;
      return {...state};
    case 'setPhoneNumber':
      state.phoneNumber = action.payload;
      return {...state};
    default:
      return {...state};
  }
}

const Register = (props: Props) => {
  const [state, dispatch] = useReducer(userInfoReducer, initialState);
  const [passwordValidation, setPasswordValidation] = useState<boolean>(true);
  const [emailValidation, setEmailValidation] = useState<boolean>(true);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const reduxDispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    setPasswordValidation(state.password === state.secondPassword);
  }, [state.password, state.secondPassword]);

  const onSave = () => {
    setModalVisible(true);
    if (!emailRegex.test(state.email)) {
        setEmailValidation(false)
        return
    }
    setEmailValidation(true)
    auth().createUserWithEmailAndPassword(state.email, state.password)
    .then(async function(result) {
      await result.user.updateProfile({
        displayName: state.displayName,
      })
      reduxDispatch(setUser(result.user))
    }).catch(function(error) {
      console.log(error);
    });
    setModalVisible(false);
  };

  const handlePhoneNumberChange = (number: string) => {
    const cleanedNumber = number.replace(/\D/g, '');

    if (cleanedNumber.length > 10) {
      return;
    }
    const formattedPhoneNumber = formatPhoneNumber(cleanedNumber);

    dispatch({type: 'setPhoneNumber', payload: formattedPhoneNumber});
  };

  const formatPhoneNumber = (number: string) => {
    if (number.length <= 3) {
      return `${number}`;
    } else if (number.length <= 6) {
      return `${number.slice(0, 3)}-${number.slice(3)}`;
    } else {
      return `${number.slice(0, 3)}-${number.slice(3, 6)}-${number.slice(
        6,
        10,
      )}`;
    }
  };

  return (
    <View style={styles.container}>
      <Modal animationType="fade" visible={isModalVisible} transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}>
          <View
            style={{
              flexDirection: 'column',
              width: 200,
              height: 200,
              backgroundColor: 'black',
              borderRadius: 12,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size={'small'} style={{alignSelf: 'center'}} />
            <Text
              style={{
                fontSize: 16,
                color: 'white',
                bottom: 50,
                position: 'absolute',
                alignSelf: 'center',
              }}>
              Please wait..
            </Text>
          </View>
        </View>
      </Modal>
      <Text style={styles.label}>Name</Text>
      <CustomTextInput
        textInputstyle={styles.inputStyle}
        onInputChange={(text: string) =>
          dispatch({type: 'setName', payload: text})
        }
        keyboardType="default"
        customValue={state.displayName}
      />
      <Text style={styles.label}>Mail</Text>
      <CustomTextInput
        textInputstyle={styles.inputStyle}
        onInputChange={(text: string) =>
          dispatch({type: 'setMail', payload: text})
        }
        keyboardType="default"
        isError={
          emailValidation ? null : 'Please enter a valid e-mail address.'
        }
        customValue={state.email}
      />
      <Text style={styles.label}>Phone Number</Text>
      <CustomTextInput
        textInputstyle={styles.inputStyle}
        placeholder="555-555-5555"
        onInputChange={
          (text: string) => handlePhoneNumberChange(text)
          //dispatch({type: 'setPhoneNumber', payload: text})
        }
        keyboardType="phone-pad"
        customValue={state.phoneNumber}
        isError={emailValidation ? null : 'Please enter a valid phone number'}
      />
      <Text style={styles.label}>Password</Text>
      <CustomTextInput
        textInputstyle={styles.inputStyle}
        onInputChange={(text: string) => {
          dispatch({type: 'setPassword', payload: text});
        }}
        keyboardType="default"
        secureTextEntry={true}
        multiline={false}
      />
      <Text style={styles.label}>Repeat Password</Text>
      <CustomTextInput
        textInputstyle={styles.inputStyle}
        onInputChange={(text: string) => {
          dispatch({type: 'setSecondPassword', payload: text});
        }}
        keyboardType="default"
        secureTextEntry={true}
        passwordValidation={passwordValidation}
        multiline={false}
      />
      <TouchableHighlight
        onPress={() => onSave()}
        style={{
          marginTop: 12,
          backgroundColor: colors.PRODUCT_PRICE_TEXT,
          borderRadius: 12,
          width: width * 0.35,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{alignSelf: 'center', color: 'white'}}>Save</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 24,
    alignItems: 'center',
    flexDirection: 'column',
  },
  inputStyle: {
    width: width - 20,
    alignSelf: 'center',
    height: 40,
  },
  label: {
    margin: 8,
    marginRight: 'auto',
  },
});

export default Register;
