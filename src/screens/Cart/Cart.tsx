import { View, Text, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation'
import {RootState, AppDispatch} from './../store';
import { useSelector, useDispatch } from 'react-redux'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { IProducts } from '../../models/ProductType';
import CartView from '../../components/CartView';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../assets/colors';

const MULTIPLIER = 1.2;
const POP_MULTIPLIER = 1.0;
const LONG_DURATION = 300 * MULTIPLIER;
const SHORT_DURATION = 210 * MULTIPLIER;

const SPRING_CONFIG = { mass: 2, damping: 500, stiffness: 200 };

type Props = {}

const Cart: NavigationFunctionComponent = ({componentId}) => {
    const cartsState = useSelector((state: RootState) => state.cartsSlice);
    const dispatch = useDispatch<AppDispatch>();


    useEffect(() => {
        Navigation.mergeOptions(componentId, {
            topBar: {
                title: {
                    text: 'Cart'
                }
            }
        })
    }, [])

    const renderItem = (item: IProducts) => {
        return (
            <CartView onPressProduct={() => pushDetails({item})} product={item}/>
        )
    }

    const pushDetails = ({item}: {item: IProducts}) => {
        console.log("*******item", item);
        Navigation.push(componentId, {
            /* stack: {
                children: [
                  { */
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
                                duration: SHORT_DURATION
                              }
                            },
                            sharedElementTransitions: [
                              {
                                fromId: `image${item.id}`,
                                toId: `image${item.id}Dest`,
                                duration: LONG_DURATION,
                                interpolation: {
                                  type: 'spring',
                                  ...SPRING_CONFIG
                                }
                              },
                            ]
                          },
                          pop: {
                            content: {
                              alpha: {
                                from: 0,
                                to: 1,
                                duration: SHORT_DURATION * POP_MULTIPLIER
                              }
                            },
                            sharedElementTransitions: [
                              {
                                fromId: `image${item.id}Dest`,
                                toId: `image${item.id}`,
                                duration: LONG_DURATION * POP_MULTIPLIER,
                                interpolation: {
                                  type: 'spring',
                                  ...SPRING_CONFIG
                                }
                              },
                            ]
                          }
                        }
                      }
                    }
                  }
                /* ]
              },
        } */)
    }

    const cartListFooterComponent = () => {
        return (
            <TouchableOpacity style={{ flexDirection: 'row', borderRadius: 10, alignSelf: 'center', paddingHorizontal: 10,height: 30, width: Dimensions.get('screen').width - 10, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.PRODUCT_PRICE_TEXT }}>
                <Icon name='cash-outline' size={20}/>
                <Text>
                    Purchase
                </Text>
            </TouchableOpacity>
        )
    }


  return (
    <View style={{flex: 1}}>
        <FlatList
            style={{
                display: cartsState.carts.length > 0 ? 'flex' : 'none'
            }}
            data={cartsState.carts}
            keyExtractor={(item: IProducts) => item.id.toString()}
            renderItem={({item}) => renderItem(item)}
            ListFooterComponent={cartListFooterComponent}
        />
    </View>
  )
}

export default Cart