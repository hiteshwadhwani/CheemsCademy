import {
  Box,
  Container,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Icon,
} from "@chakra-ui/react";
import { useEffect } from "react";
import styled from "styled-components";
import { auth } from "../firebase";
import { useSignInWithGoogle, useAuthState} from "react-firebase-hooks/auth";
import { setUserLoginDetails } from "../features/user/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginWithEmail from './loginWithEmail'

const Login = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signInWithGoogle, user1, loading1, error1] = useSignInWithGoogle(auth);
  const [user, loading, error] = useAuthState(auth);
  
  useEffect(() => {
    if (user) {
      setUser(user);
      navigate("/home");
    }
  }, [user]);

  if(error1){
    console.log(error)
  }

  const handleGoogleAuth = () => {
    signInWithGoogle()
  }



  const setUser = (user) => {
    const name = user.displayName;
    const photo = user.photoURL;
    const email = user.email;
    const uid = user.uid;
    const phone = user.phoneNumber;
    dispatch(
      setUserLoginDetails({
        uid,
        name,
        email,
        phone,
        photo,
      })
    );
  };

  

  return (
    <>
      <Box borderBottom="1px solid black">
        <Container padding="80px" w="70%">
          <Flex flexDirection="column" flexFlow="column nowrap">
            <Text fontSize="32px" fontWeight="bold" marginBottom="25px">
              Log In to Codecademy
            </Text>
            <LoginWithEmail />
            
            <Text mb="10px">Or log in using:</Text>
            <Flex>
              <CustomBox
                onClick={() => handleGoogleAuth()}
                position="relative"
                width="100px"
                height="100px"
                border="1px solid black"
                boxSize={9}
                cursor="pointer"
              >
                <svg width="100%" height="100%">
                  <title>Google</title>
                  <g fill="none" fill-rule="evenodd">
                    <path
                      d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z"
                      fill="#EA4335"
                    ></path>
                    <path
                      d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z"
                      fill="#4285F4"
                    ></path>
                    <path
                      d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z"
                      fill="#FBBC05"
                    ></path>
                    <path
                      d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z"
                      fill="#34A853"
                    ></path>
                    <path d="M0 0h18v18H0V0z"></path>
                  </g>
                </svg>
              </CustomBox>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

const CustomBox = styled(Box)`
  svg {
    position: absolute;
    top: 7px;
    right: -7px;
  }
`;

export default Login;
