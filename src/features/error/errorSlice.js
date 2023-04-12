import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    show:false,
    title:"",
    description:""
}

const errorSlice = createSlice({
    name:"error",
    initialState,
    reducers:{
        setError: (state, action) => {
            state.show = true
            state.title = action.payload.title;
            state.description = action.payload.description;
        },
        removeError: (state) => {
            state.show = false
            state.title = null;
            state.description = null;
        }
    }
})

export const {setError, removeError} = errorSlice.actions

export const getError = (state) => state.error

export default errorSlice.reducer