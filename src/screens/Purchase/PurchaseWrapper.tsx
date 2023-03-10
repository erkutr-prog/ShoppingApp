import { View, Text } from 'react-native'
import React from 'react'
import { Provider as ReduxProvider } from 'react-redux';
import Purchase from './Purchase';
import { store, persistor } from '../store';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { PersistGate } from 'redux-persist/integration/react';

type Props = {
    componentId: string,
    totalPrice: string
}

const PurchaseWrapper: NavigationFunctionComponent<Props> = ({componentId, totalPrice}) => {
  return (
    <React.StrictMode>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Purchase componentId={componentId} totalPrice={totalPrice} />
        </PersistGate>
      </ReduxProvider>
    </React.StrictMode>
  )
}

export default PurchaseWrapper