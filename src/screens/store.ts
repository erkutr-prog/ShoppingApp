import {combineReducers, configureStore, createStore} from '@reduxjs/toolkit';
import AddressSlice from '../features/AddressSlice';
import CartSlice from '../features/CartSlice';
import CategorySlice from '../features/CategorySlice';
import FavouritesSlice from '../features/FavouritesSlice';
import ProductsSlice from '../features/ProductsSlice';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['categoriesSlice']
}

const categoryPersistConfig = {
  key: 'categoriesSlice',
  storage: AsyncStorage,
  blacklist: ['categories']
}

const rootReducer = combineReducers({
  productsSlice: ProductsSlice,
  favouritesSlice: FavouritesSlice,
  cartsSlice: CartSlice,
  categoriesSlice: persistReducer(categoryPersistConfig, CategorySlice),
  addressSlice: AddressSlice
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export const persistor = persistStore(store)