import {View, Text, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomTextInput from './CustomTextInput';
import {IAddress} from '../models/AddressType';
import {StyleSheet} from 'react-native';
import uuid from 'react-native-uuid';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors} from '../assets/colors';
import {store} from '../screens/store';
import { addtoAdresses } from '../features/AddressSlice';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../models/TabParamsList';

type Props = NativeStackScreenProps<AppStackParamList, 'AddAddress'>

const AddAddress = ({route, navigation}: Props) => {
  const [address, setAddress] = useState<IAddress>({
    id: uuid.v4().toString(),
    header: '',
    description: '',
    postalCode: 0,
  });

  const handleChangesInput = (key: string, value: any) => {
    switch (key) {
      case 'header':
        setAddress({
          id: address.id,
          header: value,
          description: address.description,
          postalCode: address.postalCode,
        });
        break;
      case 'description':
        setAddress({
          id: address.id,
          header: address.header,
          description: value,
          postalCode: address.postalCode,
        });
        break;
      case 'postalCode':
        setAddress({
          id: address.id,
          header: address.header,
          description: address.description,
          postalCode: value,
        });
        break;
      default:
        break;
    }
  };

  const saveTheAddress = () => {
      store.dispatch(addtoAdresses(address))
      route.params.addCallback(address)
      navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={{flex: 1 / 3}}>{'Address Header:'}</Text>
        <CustomTextInput
          keyboardType="default"
          onInputChange={(text: string) => handleChangesInput('header', text)}
          textInputstyle={{flex: 2 / 3}}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={{flex: 1 / 3}}>{'Address Description:'}</Text>
        <CustomTextInput
          keyboardType="default"
          onInputChange={(text: string) =>
            handleChangesInput('description', text)
          }
          textInputstyle={{flex: 2 / 3, height: 70}}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={{flex: 1 / 3}}>{'Postal Code:'}</Text>
        <CustomTextInput
          keyboardType="numeric"
          onInputChange={(text: number) =>
            handleChangesInput('postalCode', text)
          }
          textInputstyle={{flex: 2 / 3}}
        />
      </View>
      <View style={styles.inputContainer}>
        <TouchableOpacity
          onPress={() => saveTheAddress()}
          style={styles.saveBtnContainer}>
          <Text style={{alignSelf: 'center', color: colors.PRODUCT_CARD_BG}}>
            {'Save the Address'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 10,
  },
  saveBtnContainer: {
    width: Dimensions.get('screen').width - 10,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.PRODUCT_PRICE_TEXT,
  }
});

export default AddAddress;
