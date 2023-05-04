import styled from "styled-components";
import { Box } from "@chakra-ui/react";
import { setDoc, doc } from "firebase/firestore";
import {db, auth} from '../firebase'
import {useSignInWithGoogle} from 'react-firebase-hooks/auth'
const SignInWithGoogle = (props) => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const handleGoogleAuth = () => {
        signInWithGoogle()
      }
    
      if(user){
        const isNewUser = user.user.metadata.creationTime === user.user.metadata.lastSignInTime;
        if(isNewUser){
          setDoc(doc(db, "user", user.user.uid), {
            displayName: user.user.displayName,
            photoURL: user.user.photoURL,
            email: user.user.email,
            uid: user.user.uid,
            phoneNumber: user.user.phoneNumber,
            courses: []
          })
        }
        
      }
    return (
        <CustomBox
                onClick={() => handleGoogleAuth()}
                position="relative"
                width="100px"
                height="100px"
                border="1px solid black"
                boxSize={9}
                cursor="pointer"
                backgroundColor='rgb(254,255,254)'
                _hover={{backgroundColor:'rgb(241,240,242)'}}
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
    )
}

const CustomBox = styled(Box)`
  svg {
    position: absolute;
    top: 7px;
    right: -7px;
  }
`;
export default SignInWithGoogle