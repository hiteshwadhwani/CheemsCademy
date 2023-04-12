import {
  Box,
  Center,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  IconButton,
  Icon,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import styled from "styled-components";
import { FaGoogle } from "react-icons/fa";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import {auth} from '../../firebase'
import { useDispatch } from "react-redux";
import {setError} from '../../features/error/errorSlice'

const JoinUs = (props) => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  
  const handleLogin = () => {
    console.log(typeof(email))
    createUserWithEmailAndPassword(email, password)
    if(error){
      dispatch(setError({
        title:error.name,
        description:error.message
      }))
    }
    if(user){
      console.log(user)
    }
  }

  const isEmailNull = email === "";
  const isPasswordNull = password === "";
  return (
    <Box minH="30rem" p="35px">
      <Flex
        flexDirection={"row"}
        justifyContent="space-around"
        alignItems={"Center"}
        width="80%"
        margin="auto"
      >
        <Box width="35%">
          <Flex justifyContent='center' alignItems='center'>
            
              <Image width='100%' height='100%' src='/images/dogesh.jpeg' />
            
          </Flex>
        </Box>
        <Flex width="35%" flexDirection="column" textAlign="left">
          <CustomText>
            Join the millions learning to code with Codecademy for free
          </CustomText>
          <form action="/" method="POST">
            <FormControl marginBottom="15px" isInvalid={isEmailNull}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {isEmailNull && (
                <FormErrorMessage>Email is required.</FormErrorMessage>
              )}
            </FormControl>
            <FormControl marginBottom="15px" isInvalid={isPasswordNull}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {isPasswordNull && (
                <FormErrorMessage>Password is required.</FormErrorMessage>
              )}
            </FormControl>
            <Button
              mb="15px"
              w="100%"
              bgColor="rgb(58,16,229)"
              color="rgb(255,255,255)"
              _hover={{ bgColor: "rgb(81,49,243)" }}
              onClick={() => handleLogin()}
            >
              Sign Up
            </Button>
          </form>
          <Box as="span" mb="15px">
            By signing up for Codecademy, you agree to Codecademy's Terms of
            Service & Privacy Policy.
          </Box>
          <Box as="span" fontWeight={"bold"} mb="15px">
            Or sign up using:
          </Box>
          <Icon
            cursor="pointer"
            as={FaGoogle}
            boxSize={10}
            border="2px solid black"
            p="4px"
          />
        </Flex>
      </Flex>
    </Box>
  );
};
const CustomText = styled(Text)`
  font-size: 2vw;
  letter-spacing: 1.2px;
  margin-bottom: 25px;
`;
export default JoinUs;
