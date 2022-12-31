import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Navigation,
  NavigationFunctionComponent,
  OptionsModalPresentationStyle,
} from 'react-native-navigation';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from './../store';
import {Modal as RNModal} from 'react-native-navigation';
import TopButtonModal from '../../components/TopButtonModal';
import {colors} from '../../assets/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {IAddress} from '../../models/AddressType';

type Props = {
  componentId: string;
};

const Purchase: NavigationFunctionComponent<Props> = ({componentId}) => {
  const addressState = useSelector((state: RootState) => state.addressSlice);
  const dispatch = useDispatch<AppDispatch>();
  const [adressModalVisible, setAddressModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<IAddress>(
    addressState.addresses[0],
  );

  useEffect(() => {
    Navigation.mergeOptions(componentId, {
      topBar: {
        title: {
          text: 'Purchase',
        },
        rightButtons: [
          {
            id: 'Topbutton',
            component: {
              name: 'TopButtonModal',
              passProps: {
                closeCb: () => closeCallback(),
              },
            },
          },
        ],
      },
    });
  }, []);

  const closeCallback = () => {
    Navigation.dismissModal(componentId);
  };

  const getCardPicker = () => {
    return (
      <Picker>
        {/* {addressState.addresses.map(( value ) => <Picker.Item key={value.id} label={value.header} value={value.description}/>)} */}
      </Picker>
    );
  };

  const changeSelectedAddress = (address: IAddress) => {
    setSelectedAddress(address);
  };

  const openAddressPicker = () => {
    if (addressState.addresses.length == 0) {
      Navigation.showModal({
        stack: {
          children: [
            {
              component: {
                name: 'AddAddress',
                passProps: {
                  addCallback: (address: IAddress) => changeSelectedAddress(address)
                },
                options: {
                  modal: {
                    swipeToDismiss: true,
                  },
                  modalPresentationStyle: OptionsModalPresentationStyle.pageSheet,
                  layout: {
                    backgroundColor: 'transparent'
                  }
                }
              }
            }
          ]
        }
      })
    } else {
      Navigation.showModal({
        stack: {
          children: [
            {
              component: {
                name: 'AddressList',
                passProps: {
                  componentId: componentId,
                  addressList: addressState.addresses,
                  selectCallback: (address: IAddress) =>
                    changeSelectedAddress(address),
                },
                options: {
                  modal: {
                    swipeToDismiss: true,
                  },
                  modalPresentationStyle:
                    OptionsModalPresentationStyle.overCurrentContext,
                  layout: {
                    backgroundColor: 'transparent',
                  },
                },
              },
            },
          ],
        },
      });
    }
  };

  return (
    <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
      <RNModal
        visible={adressModalVisible}
        onRequestClose={() => setAddressModalVisible(false)}>
        <TopButtonModal closeCb={() => setAddressModalVisible(false)} />
      </RNModal>
      <ScrollView>
        <View style={{flexDirection: 'column', flex: 1, paddingTop: 20}}>
          <View style={styles.addressContainer}>
            <TouchableWithoutFeedback
              onPress={() => openAddressPicker()}
              style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              {addressState.addresses.length > 0 ? (
                <View style={{marginTop: 5}}>
                  <Text style={{marginLeft: 30, fontWeight: 'bold'}}>
                    {selectedAddress.header}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{marginLeft: 30, marginTop: 5}}
                      numberOfLines={2}>
                      {selectedAddress.description}
                    </Text>
                    <View style={{marginLeft: 'auto'}}>
                      <Icon
                        name="caret-down-outline"
                        size={30}
                        color={colors.PRODUCT_PRICE_TEXT}
                      />
                    </View>
                  </View>
                </View>
              ) 
              :
                <View style={{flex: 1,flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center',marginRight: Dimensions.get('screen').width * 0.5}}>
                   <Icon name='add-outline' size={30} style={{alignSelf: 'center'}}/>
                  <Text style={{alignSelf: 'center'}}>
                    {'Add an address'}
                  </Text>
                </View>
              }
            </TouchableWithoutFeedback>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  addressContainer: {
    alignSelf: 'center',
    width: Dimensions.get('screen').width - 20,
    height: 70,
    backgroundColor: colors.PRODUCT_CARD_BG,
    borderWidth: 1,
    borderColor: colors.PRODUCT_RATING_ICON,
    borderRadius: 13,
  },
});

export default Purchase;
