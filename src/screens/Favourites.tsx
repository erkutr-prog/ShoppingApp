import {View, Text, FlatList, StyleSheet} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from './store';

import {IProducts} from '../models/ProductType';
import ProductCard from '../components/ProductCard';
import {toggleFavourites} from '../features/FavouritesSlice';
import Icon from 'react-native-vector-icons/Ionicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../models/TabParamsList';

type Props = NativeStackScreenProps<RootStackParamList, 'Favourites'>;

const Favourites = ({navigation}: Props) => {
  const favouritesState = useSelector(
    (state: RootState) => state.favouritesSlice,
  );
  const dispatch = useDispatch<AppDispatch>();

  const renderItem = ({item}: {item: IProducts}) => {
    return (
      <ProductCard
        product={item}
        onFavCallback={() => dispatch(toggleFavourites(item))}
        onPressItem={() => pushToDetails({item})}
      />
    );
  };

  const pushToDetails = ({item}: {item: IProducts}) => {
    navigation.navigate('PurchaseDetails', {product: item});
  };

  return (
    <View style={{flex: 1}}>
      {favouritesState.favourites.length > 0 ? (
        <FlatList
          style={{flex: 1}}
          data={favouritesState.favourites}
          keyExtractor={(item: IProducts) => item.id.toString()}
          renderItem={item => renderItem(item)}
          numColumns={2}
        />
      ) : (
        <View style={styles.emptyScreenContainer}>
          <Icon name="basket-outline" size={70} style={{alignSelf: 'center'}} />
          <Text style={{alignSelf: 'center'}}>
            You didn't add favourites yet.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  emptyScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Favourites;
