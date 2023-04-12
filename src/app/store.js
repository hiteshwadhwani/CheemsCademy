import {configureStore} from '@reduxjs/toolkit'
import userReducer from "../features/user/userSlice"
import errorSlice from '../features/error/errorSlice'

export default configureStore({
    reducer:{
        user:userReducer,
        error:errorSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck:false,
    })
})