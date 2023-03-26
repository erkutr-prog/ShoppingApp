import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import ImageModal from 'react-native-image-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import {ImageDetail} from 'react-native-image-modal';
import Share, {Social} from 'react-native-share';
import {colors} from '../assets/colors';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from './store';
import {addToCart, removeFromCart} from '../features/CartSlice';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../models/TabParamsList';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = NativeStackScreenProps<AppStackParamList, 'ProductDetails'>

const shareTitle = 'Check out this awesome product!';

const ProductDetails = ({route, navigation}: Props) => {
  const cartState = useSelector((state: RootState) => state.cartsSlice);
  const dispatch = useDispatch<AppDispatch>();
  const modalRef = useRef<ImageDetail>(null);
  const [inCart, setInCart] = useState(
    cartState.cartsIdList.includes(route.params.product.id.toString()),
  );

  useEffect(() => {
    navigation.setOptions({
      title: route.params.product.title,
      headerRight: () => (
        <TouchableOpacity onPress={() => {
          navigation.goBack()
        }}>
          <Ionicons name='close' size={25}/>
        </TouchableOpacity>
      )
    })
  }, []) 

  const renderImageModalHeader = () => {
    return (
      <SafeAreaView style={{flex: 1, flexDirection: 'row'}}>
        <TouchableOpacity
          style={{margin: 7}}
          onPress={() => modalRef.current?.close()}>
          <Icon name="close" size={30} color={'white'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginLeft: 'auto', padding: 5}}
          onPress={() => _share()}>
          <Icon name="share-social-outline" size={30} color={'white'} />
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  const _share = () => {
    const options = Platform.select({
      ios: {
        activityItemSources: [
          {
            placeholderItem: {type: 'url', content: route.params.product.image},
            item: {
              default: {type: 'url', content: route.params.product.image},
            },
            subject: {
              default: shareTitle,
            },
          },
        ],
      },
      default: {
        shareTitle,
        subject: shareTitle,
        message: `${shareTitle} ${route.params.product.image}`,
      },
    });
    Share.open(options)
      .then(res => console.log('res', res))
      .catch(err => console.log('err', err));
  };

  const addToCarts = () => {
    dispatch(addToCart(route.params.product));
    setInCart(true);
  };

  const removeFromCarts = () => {
    dispatch(removeFromCart(route.params.product));
    setInCart(false);
  };

  return (
    <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
      <ScrollView>
        <View
          style={{
            height: Dimensions.get('screen').height * 0.6,
            flexDirection: 'column',
          }}>
          <ImageModal
            modalRef={modalRef}
            source={{uri: route.params.product.image}}
            nativeID={`image${route.params.imageId}Dest`}
            style={{
              height: Dimensions.get('screen').height * 0.6,
              width: Dimensions.get('screen').width - 10,
              alignSelf: 'center',
            }}
            resizeMode="contain"
            renderHeader={renderImageModalHeader}
          />
        </View>
        <Text
          style={{fontWeight: 'bold', margin: 8}}
          nativeID={`title${route.params.imageId}Dest`}>
          {route.params.product.title}
        </Text>
        <Text style={{fontSize: 10, margin: 8}}>{route.params.product.description}</Text>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 7,
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={inCart ? () => removeFromCarts() : () => addToCarts()}
          style={{
            flex: 0.85,
            borderRadius: 10,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: inCart
              ? colors.PRODUCT_INFO_BG
              : colors.PRODUCT_PRICE_TEXT,
            marginRight: 5,
          }}>
          <Icon name="cart-outline" size={35} color={'white'} />
          <Text>{inCart ? 'Remove from Cart' : 'Add to Cart'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => _share()}
          style={{
            flex: 0.15,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
            backgroundColor: colors.PRODUCT_RATING_ICON,
          }}>
          <Icon name="share-social-outline" size={35} color={'white'} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetails;
