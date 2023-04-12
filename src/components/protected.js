import {useSelector} from 'react-redux'
import {getUserUID} from '../features/user/userSlice'
import { Navigate } from 'react-router-dom'






const Protected = ({children}) => {
    const userUID = useSelector(getUserUID)
    if(!userUID){
        return <Navigate to="/" replace />
    }
    return children
}
export default Protected