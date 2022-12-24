import { View, Text } from 'react-native'
import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import store from './../store'
import Products from './Products'
import { NavigationFunctionComponent } from 'react-native-navigation'

type Props = {
  componentId: string,
  category: string | undefined
}

const ProductsWrapper: NavigationFunctionComponent<Props> = ({componentId, category}) => {
  return (
    <ReduxProvider store={store}>
        <Products category={category} componentId={componentId} />
    </ReduxProvider>
  )
}

export default ProductsWrapper