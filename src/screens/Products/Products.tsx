import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from './../store';
import {Provider as ReduxProvider} from 'react-redux';
import {store} from './../store';
import ProductCard from '../../components/ProductCard';
import {IProducts} from '../../models/ProductType';
import {fetchProducts} from './../../features/ProductsSlice';
import {toggleFavourites} from './../../features/FavouritesSlice';
import {
  Navigation,
  NavigationFunctionComponent,
  Modal as RNModal,
  OptionsModalPresentationStyle,
} from 'react-native-navigation';

type Props = {
  componentId: string;
  category: string | undefined;
};

const Products: NavigationFunctionComponent<Props> = ({
  componentId,
  category,
}) => {
  const productsState = useSelector((state: RootState) => state.productsSlice);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    Navigation.mergeOptions(componentId, {
      topBar: {
        title: {
          text: category !== undefined ? category : 'Products',
        },
      },
    });
    dispatch(fetchProducts({limit: productsState.limit}));
  }, []);

  const renderItem = ({item}: {item: IProducts}) => {
    return (
      <ProductCard
        product={item}
        onFavCallback={({}) => dispatch(toggleFavourites(item))}
        onPressItem={({}) => pushToDetails({item})}
      />
    );
  };

  const pushToDetails = ({item}: {item: IProducts}) => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'ProductDetailsWrapper',
              passProps: {
                product: item,
              },
              options: {
                modal: {
                  swipeToDismiss: true,
                },
                modalPresentationStyle: OptionsModalPresentationStyle.pageSheet,
                layout: {
                  backgroundColor: 'transparent',
                },
                topBar: {
                  title: {
                    text: item.title,
                  },
                },
              },
            },
          }
        ]
      }
    });
  };

  return (
    <ReduxProvider store={store}>
      <View style={{flex: 1}}>
        {productsState.products.length > 0 ? (
          <FlatList
            style={{flex: 1}}
            data={
              category !== undefined
                ? productsState.products.filter(
                    value => value.category == category,
                  )
                : productsState.products
            }
            keyExtractor={(item: IProducts) => item.id.toString()}
            renderItem={item => renderItem(item)}
            numColumns={2}
          />
        ) : null}
      </View>
    </ReduxProvider>
  );
};

export default Products;
