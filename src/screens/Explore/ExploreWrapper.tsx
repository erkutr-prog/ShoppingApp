import React from 'react'
import {Provider as ReduxProvider} from 'react-redux';
import store from '../store';
import Explore from './Explore';
import { NavigationFunctionComponent } from 'react-native-navigation';

type Props = {}

const ExploreWrapper: NavigationFunctionComponent = ({componentId}) => {
  return (
    <ReduxProvider store={store}>
      <Explore componentId={componentId}/>
    </ReduxProvider>
  )
}

export default ExploreWrapper