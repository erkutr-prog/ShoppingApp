import {View, Text, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from './store';
import {fetchCategories} from '../features/CategorySlice';
import {FlatList} from 'react-native-gesture-handler';
import ExploreCardView from '../components/ExploreCardView';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../models/TabParamsList';
import {Categories, IProducts} from '../models/ProductType';
import ProductCard from '../components/ProductCard';
import {toggleFavourites} from '../features/FavouritesSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'Explore'>;

const Explore = ({navigation}: Props) => {
  const screenState = useSelector((state: RootState) => state.categoriesSlice);
  const productState = useSelector((state: RootState) => state.productsSlice);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedCategory, setSelectedCategory] = useState<Categories | null>(
    null,
  );

  useEffect(() => {
    navigation.setOptions({
      title: 'Categories',
    });
    dispatch(fetchCategories());
  }, []);

  const renderItem = ({item}: {item: string}) => {
    return (
      <ExploreCardView
        onPress={(item: Categories) => navigateToProducts(item)}
        category={item}
      />
    );
  };

  const navigateToProducts = (item: Categories) => {
    setSelectedCategory(item);
    navigation.setOptions({
      title: item
    })
  };

  return (
    <View style={{flex: 1}}>
      {screenState.error ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Failed to fetch categories..</Text>
        </View>
      ) : screenState.categories.length > 0 && selectedCategory == null ? (
        <>
          <FlatList
            data={screenState.categories}
            renderItem={item => renderItem(item)}
            keyExtractor={(item: string, index: Number) => 'key' + index}
          />
          <View style={{flex: 1}}></View>
        </>
      ) : selectedCategory !== null ? (
        <FlatList
          key={'#'}
          data={productState.products.filter(
            value => value.category == selectedCategory,
          )}
          renderItem={({item}) => (
            <ProductCard
              product={item}
              onFavCallback={() => dispatch(toggleFavourites(item))}
              onPressItem={() =>
                navigation.navigate('ProductDetails', {product: item})
              }
            />
          )}
          keyExtractor={(item: IProducts) => item.id.toString()}
          numColumns={2}
        />
      ) : (
        <ActivityIndicator size={'large'} style={{alignSelf: 'center'}} />
      )}
    </View>
  );
};

export default Explore;
