import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react-dom/test-utils';

const initialState = {
    uid: '',
    name: '',
    email: '',
    number:'',
    photo: ''
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUserLoginDetails: (state, action) => {
            state.uid = action.payload.uid;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.phone = action.payload.phone
            state.photo = action.payload.photo;
        },
        setSignOutState: (state) => {
            state.uid = null;
            state.name = null;
            state.email = null;
            state.number = null;
            state.photo = null;
        }
    }
})
export const {setUserLoginDetails, setSignOutState} = userSlice.actions

export const getUser = (state) => state.user
export const getUserName = (state) => state.user.name
export const getUserUID = (state) => state.user.uid


export default userSlice.reducer