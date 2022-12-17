import { View, Text, Dimensions, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { IProducts } from '../models/ProductType'
import { colors } from '../assets/colors'
import Icon from 'react-native-vector-icons/FontAwesome'
import { FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import {useSelector} from 'react-redux';
import {RootState} from './../screens/store';
import { Navigation } from 'react-native-navigation'

type Props = {
  product: IProducts,
  onFavCallback: Function,
  onPressItem: Function
}

type ratingArray = Array<string>

const ProductCard = (props: Props) => {
  const {
    image,
    price,
    title,
    category,
    rating,
    description,
    id
  } = props.product
  const favouritesState = useSelector((state: RootState) => state.favouritesSlice);
  const ratingArray = new Array(Math.floor(rating.rate)).fill('star');
  const [isFav, setFav] = useState(favouritesState.favouritesIdList.includes(props.product.id.toString()))

  const renderRatingStar = () => {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', paddingHorizontal: 2}}>
        <Icon name='star' size={10} color={colors.PRODUCT_RATING_ICON} style={{alignSelf: 'center'}} />
      </View>
    )
  }


  return (
    <TouchableWithoutFeedback onPress={() => props.onPressItem(props.product)} style={styles.cardContainer}>
        <View style={styles.imgContainer}> 
          <Image source={{uri: image}} style={styles.img} nativeID={`image${id}`}/>
        </View>
        <View style={styles.infoContainer}>
          <View style={{flexDirection: 'row', margin: 5}}>
            <Text style={{fontWeight: 'bold', color: 'black', fontSize: 11, flex: 0.8}} numberOfLines={2} nativeID={`title${id}`}>
              {title}
            </Text>

            <Text style={{fontSize: 13, color: colors.PRODUCT_PRICE_TEXT, marginLeft: 'auto'}} nativeID={`price${id}`} >
              {'$' + price.toString()}
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 'auto', marginBottom: 10, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{flex: 0.6}}>
              <FlatList
                data={ratingArray}
                horizontal={true}
                keyExtractor={(item: ratingArray, index: number) => index.toString()}
                renderItem={() => renderRatingStar()}
              />
            </View>
            <View style={{marginLeft: 'auto'}}>
              <TouchableWithoutFeedback onPress={() => {props.onFavCallback(props.product), setFav(!isFav)}} style={{borderRadius: 30, height: 30, width: 30, backgroundColor: 'white', marginRight: 7, justifyContent: 'center', alignItems: 'center'}}>
                <Icon style={{alignSelf: 'center'}} color={isFav ? 'red' : ''} name={isFav ? 'heart' : 'heart-o'} size={15}/>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: colors.PRODUCT_CARD_BG,
    flexDirection: 'column',
    borderRadius: 16,
    justifyContent: 'center', 
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    shadowColor: 'black',
    margin: 20,
    width: Dimensions.get('screen').width * 0.4,
  },
  imgContainer: {
    margin: 10,
    flexDirection: 'column',
    alignSelf: 'center',
    width: Dimensions.get('screen').width * 0.4,
    height: 100,
  },
  img: {
    ...StyleSheet.absoluteFillObject, 
    alignSelf: 'center', 
    resizeMode: 'contain',
    backgroundColor: colors.PRODUCT_CARD_BG
  },
  infoContainer: {
    height: 80, 
    backgroundColor: colors.PRODUCT_INFO_BG, 
    width: Dimensions.get('screen').width * 0.4, 
    borderBottomLeftRadius: 16, 
    borderBottomRightRadius: 16, 
    flexDirection: 'column'
  }
})

export default ProductCard