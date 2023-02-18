import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from './../store';

import { Navigation, NavigationFunctionComponent } from 'react-native-navigation';
import { IProducts } from '../../models/ProductType';
import ProductCard from '../../components/ProductCard';
import { toggleFavourites } from '../../features/FavouritesSlice';
import Icon from 'react-native-vector-icons/Ionicons';


const MULTIPLIER = 1.2;
const POP_MULTIPLIER = 1.0;
const LONG_DURATION = 540 * MULTIPLIER;
const SHORT_DURATION = 210 * MULTIPLIER;

const SPRING_CONFIG = { mass: 2, damping: 500, stiffness: 200 };

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
            <ProductCard product={item} onFavCallback={() => dispatch(toggleFavourites(item))} onPressItem={() => pushToDetails({item})}/>
        )
    }

    const pushToDetails = ({item}: {item: IProducts}) => {
        Navigation.push(componentId, {
          component: {
            name: 'ProductDetailsWrapper',
            passProps: {
              product: item
            },
            options: {
              animations: {
                push: {
                  content: {
                    alpha: {
                      from: 0,
                      to: 1,
                      duration: SHORT_DURATION,
                    },
                  },
                  sharedElementTransitions: [
                    {
                      fromId: `image${item.id}`,
                      toId: `image${item.id}Dest`,
                      interpolation: {
                        type: 'spring', ...SPRING_CONFIG
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
            <View style={styles.emptyScreenContainer}>
              <Icon name='basket-outline' size={70} style={{alignSelf: 'center'}} /> 
              <Text style={{alignSelf: 'center'}}>
                  You didn't add favourites yet.
              </Text>
            </View>
        }
    </View>
  )
}

const styles = StyleSheet.create({
  emptyScreenContainer: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Favourites