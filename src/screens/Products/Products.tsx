import React, { useEffect } from 'react'
import { View, FlatList } from 'react-native'
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from './../store';
import {Provider as ReduxProvider } from 'react-redux'
import store from './../store';
import ProductCard from '../../components/ProductCard';
import { IProducts } from '../../models/ProductType';
import {fetchProducts} from './../../features/ProductsSlice'
import { toggleFavourites } from './../../features/FavouritesSlice';
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation';

type Props = {}

const MULTIPLIER = 1.2;
const POP_MULTIPLIER = 1.0;
const LONG_DURATION = 300 * MULTIPLIER;
const SHORT_DURATION = 210 * MULTIPLIER;

const SPRING_CONFIG = { mass: 2, damping: 500, stiffness: 200 };

const Products: NavigationFunctionComponent = ({componentId}) => {
  const productsState = useSelector((state: RootState) => state.productsSlice);
  const favouritesState = useSelector((state: RootState) => state.favouritesSlice);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    Navigation.mergeOptions(componentId, {
      topBar: {
        title: {
          text: 'Products'
        }
      }
    })
    dispatch(fetchProducts({limit: productsState.limit}))
  }, [])

  const renderItem = ({item}: {item: IProducts}) => {
    return (
      <ProductCard product={item} onFavCallback={({}) => dispatch(toggleFavourites(item))} onPressItem={({}) => pushToDetails({item})}/>
    )
  }

  const pushToDetails = ({item}: {item: IProducts}) => {
    Navigation.push(componentId, {
      component: {
        name: 'ProductDetails',
        passProps: {
          product: item,
          imageId: item.id
        },
        options: {
          animations: {
            push: {
              content: {
                alpha: {
                  from: 0,
                  to: 1,
                  duration: SHORT_DURATION
                }
              },
              sharedElementTransitions: [
                {
                  fromId: `image${item.id}`,
                  toId: `image${item.id}Dest`,
                  duration: LONG_DURATION,
                  interpolation: {
                    type: 'spring',
                    ...SPRING_CONFIG
                  }
                },
                {
                  fromId: `title${item.id}`,
                  toId: `title${item.id}Dest`,
                  duration: LONG_DURATION,
                  interpolation: {
                    type: 'spring',
                    ...SPRING_CONFIG
                  }
                },
              ]
            },
            pop: {
              content: {
                alpha: {
                  from: 0,
                  to: 1,
                  duration: SHORT_DURATION
                }
              },
              sharedElementTransitions: [
                {
                  fromId: `image${item.id}Dest`,
                  toId: `image${item.id}`,
                  duration: LONG_DURATION,
                  interpolation: {
                    type: 'spring',
                    ...SPRING_CONFIG
                  }
                },
                {
                  fromId: `title${item.id}Dest`,
                  toId: `title${item.id}`,
                  duration: LONG_DURATION,
                  interpolation: {
                    type: 'spring',
                    ...SPRING_CONFIG
                  }
                },
              ]
            }
          }
        }
      }
    })
  }

  return (
    <ReduxProvider store={store}>
      <View style={{flex: 1}}>
        {productsState.products.length > 0 
         ?
         <FlatList
          style={{flex: 1}}
          data={productsState.products}
          keyExtractor={(item: IProducts) => item.id.toString()}
          renderItem={(item) => renderItem(item)}
          numColumns={2}
          />
          :
          null
        }
      </View>
    </ReduxProvider>
  )
}

export default Products