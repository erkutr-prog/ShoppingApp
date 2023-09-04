import {View, Text, StyleSheet, Dimensions, Image, Pressable} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '../components/CustomTextInput';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {colors} from '../assets/colors';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store';
import { setUser } from '../features/UserSlice';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../models/TabParamsList';

type Props = NativeStackScreenProps<AppStackParamList, 'Login'>

const {width, height} = Dimensions.get('window');

const Login = ({route, navigation}: Props) => {
  const [mail, setMail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();

  const onLogin = async() => {
    await auth().signInWithEmailAndPassword(mail?.toLowerCase(), password)
        .then((user) => {
          console.log("***********user", user);
          dispatch(setUser(user.user))
          if ( typeof route.params.loginCb === 'function') {
            route.params.loginCb();
          }
        })
        .catch((error) => console.log("*********error", error))
  }

  const navigateRegister = ( ) => {
    navigation.navigate('Register');
  }

  return (
    <View style={styles.container}>
      <View style={{height: 100, width: 100}}>
        <Image
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
          }}
          style={{width: 100, height: 100, resizeMode: 'contain'}}
        />
      </View>
      <View style={styles.inputContainer}>
        <CustomTextInput
          multiline={false}
          textInputstyle={styles.input}
          onInputChange={(text: string) => setMail(text)}
          keyboardType="default"
          placeholder="E-mail"
          customValue={mail}
          maxValue={128}
        />
        <CustomTextInput
          multiline={false}
          textInputstyle={[styles.input, {marginTop: 15}]}
          onInputChange={(text: string) => setPassword(text)}
          keyboardType="default"
          placeholder="Password"
          customValue={password}
          maxValue={128}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.loginBtnContainer}>
        <TouchableHighlight
          onPress={() => onLogin()}
          style={styles.loginBtn}
          underlayColor={colors.PRODUCT_INFO_BG}>
          <Text style={styles.loginBtnText}>LOGİN</Text>
        </TouchableHighlight>
      </View>
      <View style={{margin: 12, alignSelf: 'center', flexDirection: 'row'}}>
        <Text style={{fontSize: 15}}>
          Don't have an account?
        </Text>
        <TouchableHighlight onPress={() => navigateRegister()} style={{backgroundColor: 'white'}}>
          <Text style={{color: 'blue'}}>
            Register
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  input: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginHorizontal: 5,
    width: width - 30,
    paddingLeft: 10,
  },
  inputContainer: {
    justifyContent: 'space-around',
  },
  loginBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12,
  },
  loginBtn: {
    width: width * 0.35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.PRODUCT_PRICE_TEXT,
    borderRadius: 12,
    height: 50,
  },
  loginBtnText: {
    alignSelf: 'center',
    color: colors.PRODUCT_INFO_BG,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default Login;
