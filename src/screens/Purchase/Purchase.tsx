import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
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
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from './../store';
import {Modal as RNModal} from 'react-native-navigation';
import TopButtonModal from '../../components/TopButtonModal';
import {colors} from '../../assets/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {IAddress} from '../../models/AddressType';
import CustomTextInput from '../../components/CustomTextInput';
import { clearCart } from '../../features/CartSlice';

type Props = {
  componentId: string;
  totalPrice: string
};

const SCREEN_WIDTH = Dimensions.get('screen').width
const SCREEN_WIDTH_MARGIN = SCREEN_WIDTH - 20;

const Purchase: NavigationFunctionComponent<Props> = ({componentId, totalPrice}) => {
  const addressState = useSelector((state: RootState) => state.addressSlice);
  const dispatch = useDispatch<AppDispatch>();
  const [adressModalVisible, setAddressModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<IAddress>(
    addressState.addresses[0],
  );
  const [creditCardInfo, setCreditCardInfo] = useState({
    cardNumber: '',
    cardExpireDate: '',
    cardCVV: '',
  });
  const [purchaseCompleteModalVisible, setPurchaseCompleteModalVisible] = useState(false);

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


  const changeSelectedAddress = (address: IAddress) => {
    setSelectedAddress(address);
  };

  const handleCardNumber = (number: string) => {
    setCreditCardInfo({
      cardNumber: number
        .replace(/\s?/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim(),
      cardExpireDate: creditCardInfo.cardExpireDate,
      cardCVV: creditCardInfo.cardCVV,
    });
  };

  const handlecardExpire = (number: string) => {
    if (number.indexOf('.') >= 0 || number.length > 5) {
      return;
    }
    if (number.length === 2 && creditCardInfo.cardExpireDate.length === 1) {
      if (parseInt(number) > 12) {
        return;
      }
      number += '/';
    }
    setCreditCardInfo({
      cardNumber: creditCardInfo.cardNumber,
      cardExpireDate: number,
      cardCVV: creditCardInfo.cardCVV,
    });
  };

  const handleCardCvv = (number: string) => {
    setCreditCardInfo({
      cardNumber: creditCardInfo.cardNumber,
      cardExpireDate: creditCardInfo.cardExpireDate,
      cardCVV: number,
    });
  };

  const creditCardForm = () => {
    return (
      <>
        <View style={{marginLeft: 15}}>
          <Text style={{fontWeight: 'bold', fontSize: 10}}>Card Number:</Text>
        </View>
        <CustomTextInput
          textInputstyle={styles.cardInput}
          placeholder={'0000-0000-0000-0000'}
          onInputChange={(text: string) => handleCardNumber(text)}
          keyboardType={'numeric'}
          customValue={creditCardInfo.cardNumber}
          maxValue={19}
        />
        <View style={{flexDirection: 'row', margin: 10}}>
          <View style={{flexDirection: 'column'}}>
            <Text style={{fontWeight: 'bold', fontSize: 10}}>Expire Date:</Text>
            <CustomTextInput
              textInputstyle={styles.expireInput}
              placeholder={'MM/YY'}
              onInputChange={(text: string) => handlecardExpire(text)}
              keyboardType={'numeric'}
              customValue={creditCardInfo.cardExpireDate}
              maxValue={5}
            />
          </View>
          <View style={{flexDirection: 'column'}}>
            <Text style={{fontWeight: 'bold', fontSize: 10}}>CVV:</Text>
            <CustomTextInput
              textInputstyle={styles.cvvInput}
              placeholder={'CVV'}
              onInputChange={(text: string) => handleCardCvv(text)}
              keyboardType={'numeric'}
              customValue={creditCardInfo.cardCVV}
              maxValue={3}
            />
          </View>
        </View>
      </>
    );
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
                  addCallback: (address: IAddress) =>
                    changeSelectedAddress(address),
                },
                options: {
                  modal: {
                    swipeToDismiss: true,
                  },
                  modalPresentationStyle:
                    OptionsModalPresentationStyle.pageSheet,
                  layout: {
                    backgroundColor: 'transparent',
                  },
                },
              },
            },
          ],
        },
      });
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

  const cardInfoValidCheck = () => {
    return (creditCardInfo.cardNumber.length == 19 && creditCardInfo.cardExpireDate.length == 5 && creditCardInfo.cardCVV.length == 3)
  }

  const completePurchase = () => {
    if (addressState.addresses.length == 0) {
      return;
    }
    if (!cardInfoValidCheck()) {
      return false;
    }
    setPurchaseCompleteModalVisible(true)
    setTimeout(() => {
      setPurchaseCompleteModalVisible(false)
    }, 1500)
    setTimeout(() => {
      closeCallback()
      dispatch(clearCart('success'))
    }, 2000)
  }

  const purchaseSuccessModal = () => {
    return (
      <View style={styles.centered}>
        <View style={styles.modal}>
          <View style={{
            height: 90,
            width: 90,
            borderRadius: 45,
            backgroundColor: colors.PRODUCT_PRICE_TEXT,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Icon name='checkmark-outline' size={45} style={{alignSelf: 'center', fontWeight: 'bold'}} color={'white'}/>
          </View>
          <Text style={{paddingTop: 50, fontWeight: '500', fontSize: 20}}>
            Your order has been received successfully!
          </Text>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
      <Modal
        visible={purchaseCompleteModalVisible}
        onRequestClose={() => setPurchaseCompleteModalVisible(false)}
        transparent={true}
        animationType={'slide'}
      >
        {purchaseSuccessModal()}
      </Modal>
      <RNModal
        visible={adressModalVisible}
        onRequestClose={() => setAddressModalVisible(false)}>
        <TopButtonModal closeCb={() => setAddressModalVisible(false)} />
      </RNModal>
      <ScrollView>
        <View style={{flexDirection: 'column', flex: 1, paddingTop: 20}}>
          <View
            style={{
              width: SCREEN_WIDTH_MARGIN,
              flexDirection: 'row',
            }}>
            <Text
              style={{
                marginRight: 'auto',
                marginLeft: 20,
                fontWeight: 'bold',
                fontSize: 15,
              }}>
              Address
            </Text>
          </View>
          <View style={styles.addressContainer}>
            <TouchableWithoutFeedback
              onPress={() => openAddressPicker()}
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
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
              ) : (
                <View
                  style={styles.addressAddBtn}>
                  <Icon
                    name="add-outline"
                    size={30}
                    style={{alignSelf: 'center'}}
                  />
                  <Text style={{alignSelf: 'center'}}>{'Add an address'}</Text>
                </View>
              )}
            </TouchableWithoutFeedback>
          </View>
          <View style={{paddingTop: 40, flexDirection: 'column'}}>
            <TouchableWithoutFeedback style={{width: SCREEN_WIDTH_MARGIN}}>
              <View style={{flexDirection: 'row', marginHorizontal: 20}}>
                <Text
                  style={{
                    marginRight: 'auto',
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  Payment
                </Text>
                <Icon
                  name="caret-down-outline"
                  size={25}
                  style={{marginLeft: 'auto'}}
                />
              </View>
            </TouchableWithoutFeedback>
            {creditCardForm()}
          </View>
        </View>
      </ScrollView>
      <View style={styles.completeFooter}>
        <View style={styles.priceContainer}>
          <Text style={{fontWeight: 'bold'}}>{'Total Price: '}</Text> 
          <Text style={{fontWeight: 'bold'}}>
            {totalPrice}
          </Text>
        </View>
        <TouchableOpacity onPress={() => completePurchase()} style={styles.purchasebtnContainer}>
          <Icon name="cash-outline" size={20} />
          <Text style={{marginLeft: 5}}>{'Complete'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  addressContainer: {
    alignSelf: 'center',
    width: SCREEN_WIDTH_MARGIN,
    height: 70,
    backgroundColor: colors.PRODUCT_CARD_BG,
    borderWidth: 1,
    borderColor: colors.PRODUCT_RATING_ICON,
    borderRadius: 13,
  },
  addressAddBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginRight: Dimensions.get('screen').width * 0.5,
  },
  cardInput: {
    width: SCREEN_WIDTH_MARGIN,
    height: 35,
    textAlignVertical: 'center',
    marginTop: 5,
  },
  expireInput: {
    width: SCREEN_WIDTH_MARGIN / 4,
    height: 35,
    marginRight: 20,
    marginTop: 5,
  },
  cvvInput: {
    width: SCREEN_WIDTH_MARGIN / 4,
    height: 35,
    marginTop: 5,
  },
  completeFooter: {
    height: 70,
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: 'black',
    marginBottom: 50,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  priceContainer: {
    flexDirection: 'row',
    padding: 10,
    width: SCREEN_WIDTH * 0.4,
  },
  purchasebtnContainer: {
    flexDirection: 'row',
    width: SCREEN_WIDTH * 0.45,
    padding: 10,
    borderRadius: 16,
    backgroundColor: colors.PRODUCT_PRICE_TEXT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  modal: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'column',
    justifyContent: 'center',
  }
});

export default Purchase;
