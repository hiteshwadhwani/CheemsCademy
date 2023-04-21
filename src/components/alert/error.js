import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
} from "@chakra-ui/react";
import {useSelector} from 'react-redux'
import {getError, removeError} from '../../features/error/errorSlice'
import { useEffect, useState } from "react";
import {useDispatch} from 'react-redux'
import styled from "styled-components";

const Error = (props) => {
  const dispatch = useDispatch()
  const error = useSelector(getError)
  console.log(error)
  useEffect(() => {
    if(error.show){
      setTimeout( () => dispatch(removeError()), 5000)
    }
  }, [error])
  if(error.show){
    // return (
    //   <Alert status="error">
    //     <AlertIcon />
    //     <AlertTitle>{error.title}</AlertTitle>
    //     <AlertDescription>
    //       {error.description}
    //     </AlertDescription>
    //   </Alert>
    // );

    return (
      <CustomBox>
        <Box height='20rem' width='20rem' bgColor='white'>
          error hai nub
        </Box>
      </CustomBox>
    )
  }
};

const CustomBox = styled(Box)`
  height: 100%;
  width: 100%;
  position: fixed;
  inset: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
`

export default Error
