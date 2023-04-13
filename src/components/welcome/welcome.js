import styled from "styled-components"
import JoinUs from "./JoinUs"
import {useSelector} from 'react-redux'
import {getUserUID} from '../../features/user/userSlice'
import {useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
import PopularCourses from "./poplularCourses"
import StartCoding from "./StartCoding"
const Welcome = (props) => {
    const userUID = useSelector(getUserUID)
    const navigate = useNavigate()
    useEffect(()=> {
        if(userUID){
            navigate("/dashboard")
        } 
    }, [userUID])
        return (
            <>
                <JoinUs />
                <PopularCourses />
                <StartCoding />
            </>
        )
}
export default Welcome
