import { View, Text, Dimensions, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect } from 'react'
import { IProducts } from '../models/ProductType'
import { colors } from '../assets/colors'
import { TouchableOpacity } from 'react-native-gesture-handler'

type Props = {
    product: IProducts,
    onPressProduct: Function,
}

const CONTAINER_HEIGHT = 150
const CONTAINER_WIDTH = Dimensions.get('screen').width - 10

const CartView = (props: Props) => {
  return (
    <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => props.onPressProduct(props.product)}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: props.product.image}} nativeID={`image${props.product.id}`}/>
            </View>
        </TouchableWithoutFeedback>
        <View style={{flexDirection: 'column', flex: 0.5, alignSelf: 'center', marginRight: 'auto'}}>
            <Text style={{fontWeight: 'bold'}} numberOfLines={1}>
                {props.product.title}
            </Text>
            <Text style={{margin: 5}} numberOfLines={3}>
                {props.product.description}
            </Text>
        </View>
        <View style={{alignItems: 'flex-end', flex: 0.25, justifyContent: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: colors.PRODUCT_PRICE_TEXT}} numberOfLines={1}>
                {'$' + props.product.price.toString()}
            </Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: colors.PRODUCT_INFO_BG,
        width: CONTAINER_WIDTH,
        borderRadius: 20,
        alignSelf: 'center',
        marginVertical: 10,
        height: CONTAINER_HEIGHT,
        marginHorizontal: 10,
      },
      imageContainer: {
        flex: 0.25,
        flexDirection: 'column',
        marginHorizontal: 10,
      },
      image: {
        resizeMode: 'contain',
        alignSelf: 'flex-start',
        ...StyleSheet.absoluteFillObject,
      },
})

export default CartView