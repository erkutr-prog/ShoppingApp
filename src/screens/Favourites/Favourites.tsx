import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from './../store';

import { Navigation, NavigationFunctionComponent } from 'react-native-navigation';
import { IProducts } from '../../models/ProductType';
import ProductCard from '../../components/ProductCard';
import { toggleFavourites } from '../../features/FavouritesSlice';

type Props = {}

const Favourites: NavigationFunctionComponent = ({componentId}) => {
    const favouritesState = useSelector((state: RootState) => state.favouritesSlice);
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        Navigation.mergeOptions(componentId, {
            topBar: {
                title: {
                    text: 'Favourites'
                }
            }
        })
    }, [])
    

    const renderItem = ({item}: {item: IProducts}) => {
        return (
            <ProductCard product={item} onFavCallback={() => dispatch(toggleFavourites(item))} onPressItem={pushToDetails}/>
        )
    }

    const pushToDetails = ({item}: {item: IProducts}) => {
        Navigation.push(componentId, {
          component: {
            name: 'ProductDetails',
            passProps: {
              item
            },
            options: {
              animations: {
                push: {
                  sharedElementTransitions: [
                    {
                      fromId: `image${item.id}`,
                      toId: `image${item.id}Dest`,
                      interpolation: {
                        type: 'linear'
                      }
                    }
                  ]
                }
              }
            }
          }
        })
      }
    

  return (
    <View style={{flex: 1}}>
        {
            favouritesState.favourites.length > 0 
            ?
                <FlatList
                    style={{flex: 1}}
                    data={favouritesState.favourites}
                    keyExtractor={(item: IProducts) => item.id.toString()}
                    renderItem={(item) => renderItem(item)}
                    numColumns={2}
                />
            :
            <Text style={{alignSelf: 'center'}}>
                You didn't add favourites yet.
            </Text>
        }
    </View>
  )
}

export default Favourites