import { createSlice } from "@reduxjs/toolkit";

export type UserSlice = {
    mail: string | null,
    displayName: string | null,
    phoneNumber: string | null,
}

const initialState: UserSlice = {
    mail: '',
    displayName: '',
    phoneNumber: '',
}

const UserSlice = createSlice({
    name: 'User',
    initialState: initialState,
    reducers: {
        setUser(state, action) {
            const {
                mail,
                displayName,
                phoneNumber
            } = action.payload;
            state.mail = mail;
            state.displayName = displayName;
            state.phoneNumber = phoneNumber
        }
    },
})

export const {setUser} = UserSlice.actions
export default UserSlice.reducer;