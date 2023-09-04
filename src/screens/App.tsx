import React, { useEffect, useState } from 'react'
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
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import * as firebase from '@react-native-firebase/auth'
import { firebaseConfig } from '../utils/Config'
import Login from './Login'
import Register from './Register'

type Props = NativeStackScreenProps<AppStackParamList, 'Main'>

const Stack = createNativeStackNavigator<AppStackParamList>()

const App = ({route, navigation}: Props) => {
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  if (!firebase.firebase.app.length) {
    firebase.firebase.initializeApp(firebaseConfig)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(userState => {
      if (userState) {
        setUser(userState)
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    })
    return subscriber;
  }, [])


  return (
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <NavigationContainer>
                <Stack.Navigator initialRouteName={isLoggedIn ? 'Main' : 'Login'} screenOptions={{headerShown: false}}>
                  <Stack.Group>
                    {
                      isLoggedIn ?
                      <Stack.Screen name='Main' component={Main}/>
                      :
                      <>
                        <Stack.Screen name='Login' component={Login} initialParams={{ loginCb: () => {
                          setLoggedIn(true);
                        }}}/>
                        <Stack.Screen options={{ headerShown: true }} name='Register' component={Register}/>                    
                      </>
                    }
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