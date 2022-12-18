import { View, Text } from 'react-native'
import React from 'react'
import {Provider as ReduxProvider} from 'react-redux'
import store from './../store';
import Cart from './Cart';
import { NavigationFunctionComponent } from 'react-native-navigation';

type Props = {}

const CartWrapper: NavigationFunctionComponent = ({componentId}) => {
  return (
    <ReduxProvider store={store}>
        <Cart componentId={componentId}/>
    </ReduxProvider>
  )
}

export default CartWrapper