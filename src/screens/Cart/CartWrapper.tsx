import {View, Text} from 'react-native';
import React from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import { store, persistor } from './../store';
import Cart from './Cart';
import {NavigationFunctionComponent} from 'react-native-navigation';
import {PersistGate} from 'redux-persist/integration/react';

type Props = {};

const CartWrapper: NavigationFunctionComponent = ({componentId}) => {
  return (
    <React.StrictMode>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Cart componentId={componentId} />
        </PersistGate>
      </ReduxProvider>
    </React.StrictMode>
  );
};

export default CartWrapper;
