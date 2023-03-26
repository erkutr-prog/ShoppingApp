import React from 'react'
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'
import { AppStackParamList } from '../models/TabParamsList'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './store'
import Main from './Main'
import { NavigationContainer } from '@react-navigation/native'
import ProductDetails from './ProductDetails'
import Purchase from './Purchase'
import AddressList from '../components/AddressList'
import AddAddress from '../components/AddAddress'

type Props = NativeStackScreenProps<AppStackParamList, 'Main'>

const Stack = createNativeStackNavigator<AppStackParamList>()

const App = ({route, navigation}: Props) => {
  return (
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <NavigationContainer>
                <Stack.Navigator initialRouteName='Main' screenOptions={{headerShown: false}}>
                  <Stack.Group>
                    <Stack.Screen name='Main' component={Main}/>
                  </Stack.Group>
                  <Stack.Group screenOptions={{ presentation: 'modal' }}>
                    <Stack.Screen  name='ProductDetails' options={{headerShown: true}} component={ProductDetails}/>
                    <Stack.Screen name='Purchase' options={{ presentation: 'fullScreenModal' }} component={Purchase}/>
                    <Stack.Screen name='AddressList' component={AddressList}/>
                    <Stack.Screen name='AddAddress' component={AddAddress}/>
                  </Stack.Group>
                </Stack.Navigator>
              </NavigationContainer>
            </PersistGate>
        </Provider>
    </React.StrictMode>
  )
}

export default App