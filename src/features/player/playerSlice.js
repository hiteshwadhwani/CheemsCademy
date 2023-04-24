import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    url : '',
    show : false
}

const playerSlice = createSlice({
    name:'player',
    initialState,
    reducers:{
        playVideo: (state, action) => {
            state.url = action.payload.url
            state.show = true
        },
        pauseVideo:(state) => {
            state.url = null
            state.show = false
        }
    }
})

export const {playVideo, pauseVideo} = playerSlice.actions

export const getPlayer = (state) => state.player

export default playerSlice.reducer