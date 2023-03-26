import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from './store';
import ProductCard from '../components/ProductCard';
import {IProducts} from '../models/ProductType';
import {fetchProducts} from '../features/ProductsSlice';
import {toggleFavourites} from '../features/FavouritesSlice';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../models/TabParamsList';

type Props = NativeStackScreenProps<RootStackParamList, 'Products'>

const Products = ({route, navigation}: Props) => {
  const productsState = useSelector((state: RootState) => state.productsSlice);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProducts({limit: productsState.limit}));
  }, []);

  const renderItem = ({item}: {item: IProducts}) => {
    return (
      <ProductCard
        product={item}
        onFavCallback={({}) => dispatch(toggleFavourites(item))}
        onPressItem={({}) => {pushToDetails({item})}}
      />
    );
  };

  const pushToDetails = ({item}: {item: IProducts}) => {
    navigation.navigate('ProductDetails', {product: item} )
  };

  return (
    <View style={{flex: 1}}>
      {productsState.products.length > 0 ? (
        <FlatList
          style={{flex: 1}}
          data={
            route.params.category !== 'all'
              ? productsState.products.filter(
                  value => value.category == route.params.category,
                )
              : productsState.products
          }
          keyExtractor={(item: IProducts) => item.id.toString()}
          renderItem={item => renderItem(item)}
          numColumns={2}
        />
      ) : null}
    </View>
  );
};

export default Products;
