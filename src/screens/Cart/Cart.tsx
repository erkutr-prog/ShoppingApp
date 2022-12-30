import {View, Text, Dimensions, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {Navigation, NavigationFunctionComponent, OptionsModalPresentationStyle} from 'react-native-navigation';
import {RootState, AppDispatch} from './../store';
import {useSelector, useDispatch} from 'react-redux';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {IProducts} from '../../models/ProductType';
import CartView from '../../components/CartView';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../assets/colors';

const MULTIPLIER = 1.2;
const POP_MULTIPLIER = 1.0;
const LONG_DURATION = 300 * MULTIPLIER;
const SHORT_DURATION = 210 * MULTIPLIER;

const SPRING_CONFIG = {mass: 2, damping: 500, stiffness: 200};

type Props = {};

const Cart: NavigationFunctionComponent = ({componentId}) => {
  const cartsState = useSelector((state: RootState) => state.cartsSlice);

  useEffect(() => {
    Navigation.mergeOptions(componentId, {
      topBar: {
        title: {
          text: 'Cart',
        },
      },
    });
  }, []);

  const renderItem = (item: IProducts, index: number) => {
    return (
      <CartView
        key={index}
        onPressProduct={() => pushDetails({item})}
        product={item}
      />
    );
  };

  const pushDetails = ({item}: {item: IProducts}) => {
    Navigation.push(componentId, {
      component: {
        name: 'ProductDetailsWrapper',
        passProps: {
          product: item,
        },
        options: {
          animations: {
            push: {
              content: {
                alpha: {
                  from: 0,
                  to: 1,
                  duration: SHORT_DURATION,
                },
              },
              sharedElementTransitions: [
                {
                  fromId: `image${item.id}`,
                  toId: `image${item.id}Dest`,
                  duration: LONG_DURATION,
                  interpolation: {
                    type: 'spring',
                    ...SPRING_CONFIG,
                  },
                },
              ],
            },
            pop: {
              content: {
                alpha: {
                  from: 0,
                  to: 1,
                  duration: SHORT_DURATION * POP_MULTIPLIER,
                },
              },
              sharedElementTransitions: [
                {
                  fromId: `image${item.id}Dest`,
                  toId: `image${item.id}`,
                  duration: LONG_DURATION * POP_MULTIPLIER,
                  interpolation: {
                    type: 'spring',
                    ...SPRING_CONFIG,
                  },
                },
              ],
            },
          },
        },
      },
    });
  };

  const goToPurchase = () => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'PurchaseWrapper',
              passProps: {
              },
              options: {
                modal: {
                  swipeToDismiss: true,
                },
                modalPresentationStyle: OptionsModalPresentationStyle.fullScreen,
                layout: {
                  backgroundColor: 'transparent',
                },
                topBar: {
                  title: {
                    text: 'Purchase'
                  },
                },
              },
            },
          }
        ]
      }
    })
  }

  return (
    <View style={{flex: 1}}>
      {cartsState.carts.length > 0 ? (
        <ScrollView style={{flex: 1}}>
          {cartsState.carts.map((value, index) => renderItem(value, index))}
        </ScrollView>
      ) : (
        <View style={styles.emptyScreenContainer}>
          <Text style={{alignSelf: 'center', fontSize: 18, flex: 1}}>
            You haven't add any products in your cart yet.
          </Text>
        </View>
      )}
      <View
        style={[
          styles.cartFooterContainer,
          {display: cartsState.carts.length > 0 ? 'flex' : 'none'},
        ]}>
        <View style={styles.priceContainer}>
          <Text style={{fontWeight: 'bold'}}>{'Total Price: '}</Text>
          <Text style={{fontWeight: 'bold'}}>
            {cartsState.cartTotalPrice.toString()}
          </Text>
        </View>
        <TouchableOpacity onPress={() => goToPurchase()} style={styles.purchasebtnContainer}>
          <Icon name="cash-outline" size={20} />
          <Text style={{marginLeft: 5}}>{'Purchase'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartFooterContainer: {
    height: 70,
    width: Dimensions.get('screen').width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: 'black',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  priceContainer: {
    flexDirection: 'row',
    padding: 10,
    width: Dimensions.get('screen').width * 0.4,
  },
  purchasebtnContainer: {
    flexDirection: 'row',
    width: Dimensions.get('screen').width * 0.45,
    padding: 10,
    borderRadius: 16,
    backgroundColor: colors.PRODUCT_PRICE_TEXT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default Cart;
