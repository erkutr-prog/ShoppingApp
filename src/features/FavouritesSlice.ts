import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProducts } from "../models/ProductType";
import api from "../utils/Request";

export type FavouritesSlice = {
    favourites: IProducts[],
    favouritesIdList: string[]
}

const initialState: FavouritesSlice = {
    favourites: [],
    favouritesIdList: []
}


const FavouritesSlice = createSlice({
    name: 'FavouritesList',
    initialState: initialState,
    reducers: {
        toggleFavourites(state, action) {
            if (state.favouritesIdList.includes(action.payload.id.toString())) {
                state.favourites = state.favourites.filter((value, index) => value.id !== action.payload.id)
                state.favouritesIdList = state.favouritesIdList.filter((value, index) => value !== action.payload.id.toString())
            } else {  
                state.favourites.push(action.payload)
                state.favouritesIdList.push(action.payload.id.toString())
            }
        }
    },
})

export const {toggleFavourites} = FavouritesSlice.actions
export default FavouritesSlice.reducer;