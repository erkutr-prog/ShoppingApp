import { View, Text } from 'react-native'
import React from 'react'
import { Provider as ReduxProvider } from 'react-redux';
import store from './../store'
import { NavigationFunctionComponent } from 'react-native-navigation';
import Favourites from './Favourites';

type Props = {}

const FavouritesWrapper: NavigationFunctionComponent = ({componentId}) => {
  return (
    <ReduxProvider store={store}>
        <Favourites componentId={componentId}/>
    </ReduxProvider>
  )
}

export default FavouritesWrapper