import { View, Text } from 'react-native'
import React from 'react'
import { Provider as ReduxProvider } from 'react-redux';
import Purchase from './Purchase';
import store from '../store';
import { NavigationFunctionComponent } from 'react-native-navigation';

type Props = {
    componentId: string
}

const PurchaseWrapper: NavigationFunctionComponent<Props> = ({componentId}) => {
  return (
    <ReduxProvider store={store}>
        <Purchase componentId={componentId} />
    </ReduxProvider>
  )
}

export default PurchaseWrapper