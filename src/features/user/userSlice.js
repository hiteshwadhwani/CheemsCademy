import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    uid: '',
    displayName: '',
    email: '',
    phoneNumber:'',
    photoURL: ''
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUserLoginDetails: (state, action) => {
            state.uid = action.payload.uid;
            state.displayName = action.payload.displayName;
            state.email = action.payload.email;
            state.phoneNumber = action.payload.phoneNumber
            state.photoURL = action.payload.photoURL;
        },
        setSignOutState: (state) => {
            state.uid = null;
            state.displayName = null;
            state.email = null;
            state.phoneNumber = null;
            state.photoURL = null;
        }
    }
})
export const {setUserLoginDetails, setSignOutState} = userSlice.actions

export const getUser = (state) => state.user
export const getUserName = (state) => state.user.displayName
export const getUserUID = (state) => state.user.uid


export default userSlice.reducer