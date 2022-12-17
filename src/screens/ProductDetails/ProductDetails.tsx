import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { NavigationFunctionComponent } from 'react-native-navigation'
import { IProducts } from '../../models/ProductType'
import { ScrollView } from 'react-native-gesture-handler'

type Props = {
    product: IProducts,
    imageId: number
}

const ProductDetails: NavigationFunctionComponent<Props> = ({componentId, product, imageId}) => {
  return (
    <ScrollView style={{flex: 1}}>
        <View style={{height: Dimensions.get('screen').height * 0.6, margin: 30}}>
            <Image source={{uri: product.image}} nativeID={`image${imageId}Dest`} style={{...StyleSheet.absoluteFillObject}} resizeMode='contain'/>
        </View>
        <Text style={{fontWeight: 'bold'}} nativeID={`title${imageId}Dest`}>
          {product.title}
        </Text>
    </ScrollView>
  )
}

export default ProductDetails