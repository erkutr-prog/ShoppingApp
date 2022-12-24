import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProducts } from "../models/ProductType";
import api from "../utils/Request";

export type CartSlice = {
    carts: IProducts[],
    cartsIdList: string[],
    cartTotalPrice: number
}

const initialState: CartSlice = {
    carts: [],
    cartsIdList: [],
    cartTotalPrice: 0
}


const CartsSlice = createSlice({
    name: 'CartsList',
    initialState: initialState,
    reducers: {
        addToCart(state, action) {
            if (!state.cartsIdList.includes(action.payload.id.toString())) {
                state.carts.push(action.payload)
                state.cartsIdList.push(action.payload.id.toString())
                state.cartTotalPrice += parseFloat(action.payload.price);
            }
        },
        removeFromCart(state, action) {
            state.carts = state.carts.filter((value) => value.id !== action.payload.id)
            state.cartsIdList = state.cartsIdList.filter((value) => value !== action.payload.id.toString())
            state.cartTotalPrice -= parseFloat(action.payload.price)
        }
    },
})

export const {addToCart, removeFromCart} = CartsSlice.actions
export default CartsSlice.reducer;