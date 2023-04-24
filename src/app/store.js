import {configureStore} from '@reduxjs/toolkit'
import userReducer from "../features/user/userSlice"
import errorSlice from '../features/error/errorSlice'
import courseSlice from "../features/courses/coursesSlice"
import playerSlice from '../features/player/playerSlice'

export default configureStore({
    reducer:{
        user:userReducer,
        error:errorSlice,
        courses:courseSlice,
        player:playerSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck:false,
    })
})