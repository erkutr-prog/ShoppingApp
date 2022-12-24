import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation'
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from './../store';
import { fetchCategories } from '../../features/CategorySlice';
import { FlatList } from 'react-native-gesture-handler';
import ExploreCardView from '../../components/ExploreCardView';
import { Category } from '../../models/CategoryType';

type Props = {}

const Explore: NavigationFunctionComponent = ({componentId}) => {
  const screenState = useSelector((state: RootState) => state.categoriesSlice);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    Navigation.mergeOptions(componentId, {
      topBar: {
        title: {
          text: 'Categories'
        }
      }
    })
    dispatch(fetchCategories())
  }, [])

  const renderItem = ({item}: {item: string}) => {
    return (
      <ExploreCardView onPress={(item: string) => navigateToProducts(item)} category={item}/>
    )
  }

  const navigateToProducts = (item: string) =>  {
    Navigation.push(componentId, {
      component: {
        name: 'ProductsWrapper',
        passProps: {
          category: item
        }
      }
    })
  }

  const FooterComponent = () => {
    return (
      <View>
        <Text>
          alskdnlasdklaskdlasdasdas
        </Text>
      </View>
    )
  }

  return (
    <View style={{flex: 1}}>
      {screenState.error ? 
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>
            Failed to fetch categories..
          </Text>
        </View>
      :
      (screenState.categories.length > 0) 
      ?
        <>
          <FlatList
            data={screenState.categories}
            renderItem={(item) => renderItem(item)}
            keyExtractor={(item: string, index: Number) => 'key' + index}
          />
          <View style={{flex: 1}}>

          </View>
        </>
        :
        <ActivityIndicator size={'large'} style={{alignSelf: 'center'}}/>
    }
    </View>
  )
}

export default Explore