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
            <CartView product={item}/>
        )
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
            data={cartsState.carts}
            keyExtractor={(item: IProducts) => item.id.toString()}
            renderItem={({item}) => renderItem(item)}
            ListFooterComponent={cartListFooterComponent}
        />
    </View>
  )
}

export default Cart