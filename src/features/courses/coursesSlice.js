import {createSlice} from "@reduxjs/toolkit"
const nestedHardCopy = require('nest-object-deep-copy');

const initialState = {
    course : null
}

const courseSlice = createSlice({
    name:'courses',
    initialState,
    reducers:{
        setCourses: (state, action) => {
            const fetched_courses = action.payload.course
            state.course = fetched_courses
        }
    }
})

export const {setCourses} = courseSlice.actions

export const getCourses = (state) => state.courses.course
export const getCourseWithID = (state, id) => {
    const course = state.courses.course.filter((course) => course.id === id)
    return course
}

export default courseSlice.reducer