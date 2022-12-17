import { View, Text } from 'react-native'
import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import store from './../store'
import Products from './Products'
import { NavigationFunctionComponent } from 'react-native-navigation'

type Props = {}

const ProductsWrapper: NavigationFunctionComponent = ({componentId}) => {
  return (
    <ReduxProvider store={store}>
        <Products componentId={componentId} />
    </ReduxProvider>
  )
}

export default ProductsWrapper