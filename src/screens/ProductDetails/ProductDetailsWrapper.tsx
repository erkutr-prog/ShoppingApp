import {View, Text} from 'react-native';
import React from 'react';
import {NavigationFunctionComponent} from 'react-native-navigation';
import {Provider as ReduxProvider} from 'react-redux';
import { store ,persistor} from './../store';
import ProductDetails from './ProductDetails';
import {IProducts} from '../../models/ProductType';
import {PersistGate} from 'redux-persist/integration/react';

type Props = {
  product: IProducts;
  imageId: number;
};

const ProductDetailsWrapper: NavigationFunctionComponent<Props> = ({
  componentId,
  product,
  imageId,
}) => {
  return (
    <React.StrictMode>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ProductDetails
            componentId={componentId}
            product={product}
            imageId={imageId}
          />
        </PersistGate>
      </ReduxProvider>
    </React.StrictMode>
  );
};

export default ProductDetailsWrapper;
