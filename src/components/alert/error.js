import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import {useSelector} from 'react-redux'
import {getError, removeError} from '../../features/error/errorSlice'
import { useEffect, useState } from "react";
import {useDispatch} from 'react-redux'

const Error = (props) => {
  const dispatch = useDispatch()
  const error = useSelector(getError)
  useEffect(() => {
    if(error.show){
      setTimeout( () => dispatch(removeError()), 5000)
    }
  }, [error])
  if(error.show){
    
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>{error.title}</AlertTitle>
        <AlertDescription>
          {error.description}
        </AlertDescription>
      </Alert>
    );
  }
};

export default Error
