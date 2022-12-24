import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../utils/Request"

export type CategorySlice = {
    categories: readonly string[],
    loading: Boolean,
    error: Boolean
}

const initialState: CategorySlice = {
    categories: [],
    loading: true,
    error: false
}

export const fetchCategories = createAsyncThunk(
    'fetchCategories',
    async () => {
        const response = await api.get(`products/categories/`)
        if (response !== undefined) {
            return response.data
        } else {
            throw "Failed to fetch the categories."
        }
    }
)

const categoriesSlice = createSlice({
    name: 'CategoriesList',
    initialState: initialState,
    reducers: { },
    extraReducers: builder => {
        builder
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
                state.loading = false;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = true
            })
    }
})

export default categoriesSlice.reducer;