import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProducts } from "../models/ProductType";
import api from "../utils/Request";

export type ProductsSlice = {
    products: IProducts[],
    loading: Boolean,
    limit: number
}

const initialState: ProductsSlice = {
    products: [],
    loading: true,
    limit: 20,
}

export const fetchProducts = createAsyncThunk(
    'fetchProducts',
    async ({limit}: {limit: number}) => {
        const response = await api.get(`products?limit${limit}`)
        if (response !== undefined) {
            return response.data
        } else {
            throw "Couldn't fetch products.Try again later"
        }
    }
)

const ProductsSlice = createSlice({
    name: 'ProductsList',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload
                state.loading = false
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false
            })
    }
})

export default ProductsSlice.reducer;