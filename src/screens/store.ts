import {combineReducers, configureStore} from '@reduxjs/toolkit';
import FavouritesSlice from '../features/FavouritesSlice';
import ProductsSlice from '../features/ProductsSlice';


const rootReducer = combineReducers({
    productsSlice: ProductsSlice,
    favouritesSlice: FavouritesSlice
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: rootReducer,
});

export default store;