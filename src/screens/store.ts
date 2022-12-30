import {combineReducers, configureStore} from '@reduxjs/toolkit';
import AddressSlice from '../features/AddressSlice';
import CartSlice from '../features/CartSlice';
import CategorySlice from '../features/CategorySlice';
import FavouritesSlice from '../features/FavouritesSlice';
import ProductsSlice from '../features/ProductsSlice';


const rootReducer = combineReducers({
    productsSlice: ProductsSlice,
    favouritesSlice: FavouritesSlice,
    cartsSlice: CartSlice,
    categoriesSlice: CategorySlice,
    addressSlice: AddressSlice
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: rootReducer,
});

export default store;