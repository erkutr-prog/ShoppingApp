import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {IAddress} from '../models/AddressType';

export type CartSlice = {
  addresses: IAddress[];
};

const initialState: CartSlice = {
  addresses: [
   /*  {
        id: '1',
        header: 'Deneme',
        description: 'deneme adresi',
        postalCode: 2
    },
    {
      id: '2',
      header: 'Deneme2',
      description: 'deneme adresi 2',
      postalCode: 3
    } */
  ],
};

const AddressSlice = createSlice({
  name: 'AdressList',
  initialState: initialState,
  reducers: {
    addtoAdresses(state, action) {
        state.addresses.push(action.payload)
    },
    removeFromAdresses(state, action) {},
    updateAdresses(state, action) {},
  },
});

export const {addtoAdresses, removeFromAdresses, updateAdresses} =
  AddressSlice.actions;
export default AddressSlice.reducer;
