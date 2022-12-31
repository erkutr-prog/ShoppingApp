import {View, Text} from 'react-native';
import React from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import { store, persistor } from './../store';
import {NavigationFunctionComponent} from 'react-native-navigation';
import Favourites from './Favourites';
import {PersistGate} from 'redux-persist/integration/react';

type Props = {};

const FavouritesWrapper: NavigationFunctionComponent = ({componentId}) => {
  return (
    <React.StrictMode>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Favourites componentId={componentId} />
        </PersistGate>
      </ReduxProvider>
    </React.StrictMode>
  );
};

export default FavouritesWrapper;
