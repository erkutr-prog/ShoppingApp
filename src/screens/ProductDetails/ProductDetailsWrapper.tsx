import { View, Text } from 'react-native'
import React from 'react'
import { NavigationFunctionComponent } from 'react-native-navigation'
import {Provider as ReduxProvider } from 'react-redux'
import store from './../store';
import ProductDetails from './ProductDetails';
import { IProducts } from '../../models/ProductType';

type Props = {
    product: IProducts,
    imageId: number
}

const ProductDetailsWrapper: NavigationFunctionComponent<Props> = ({componentId, product, imageId}) => {
  return (
    <ReduxProvider store={store}>
        <ProductDetails componentId={componentId} product={product} imageId={imageId}/>
    </ReduxProvider>
  )
}

export default ProductDetailsWrapper