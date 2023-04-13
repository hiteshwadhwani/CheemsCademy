import { useSelector } from "react-redux";
import { getUserUID } from "../features/user/userSlice";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Protected = ({ children }) => {
  const userUID = useSelector(getUserUID);
  const navigate = useNavigate();

  if(userUID === '' || userUID === null){
    return <Navigate to="/" replace={true} />
  }
  return children
};
export default Protected;
