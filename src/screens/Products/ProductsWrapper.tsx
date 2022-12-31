import {View, Text} from 'react-native';
import React from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import { store, persistor } from './../store';
import Products from './Products';
import {NavigationFunctionComponent} from 'react-native-navigation';
import {PersistGate} from 'redux-persist/integration/react';

type Props = {
  componentId: string;
  category: string | undefined;
};

const ProductsWrapper: NavigationFunctionComponent<Props> = ({
  componentId,
  category,
}) => {
  return (
    <React.StrictMode>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Products category={category} componentId={componentId} />
        </PersistGate>
      </ReduxProvider>
    </React.StrictMode>
  );
};

export default ProductsWrapper;
