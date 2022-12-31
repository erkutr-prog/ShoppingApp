import React from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import { store, persistor } from '../store';
import Explore from './Explore';
import {NavigationFunctionComponent} from 'react-native-navigation';
import {PersistGate} from 'redux-persist/integration/react';

type Props = {};

const ExploreWrapper: NavigationFunctionComponent = ({componentId}) => {
  return (
    <React.StrictMode>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Explore componentId={componentId} />
        </PersistGate>
      </ReduxProvider>
    </React.StrictMode>
  );
};

export default ExploreWrapper;
