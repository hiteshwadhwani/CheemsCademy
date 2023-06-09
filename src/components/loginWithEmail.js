import {
  Text,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { setUserLoginDetails } from "../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { setError } from "../features/error/errorSlice";
import {toast} from 'react-hot-toast'

const LoginWithEmail = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const setUser = (user) => {
    console.log(user);
    const displayName = user.displayName;
    const photoURL = user.photoURL;
    const email = user.email;
    const uid = user.uid;
    const phoneNumber = user.phoneNumber;
    dispatch(
      setUserLoginDetails({
        uid,
        displayName,
        email,
        phoneNumber,
        photoURL,
      })
    );
  };
  useEffect(() => {
    if (error) {
      toast.error(error.message)
    }
  }, [error]);

  return (
    <>
      <FormControl marginBottom="25px" isInvalid={email === ""}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {email === "" && (
          <FormErrorMessage>Email is required.</FormErrorMessage>
        )}
      </FormControl>
      <FormControl marginBottom="25px" isInvalid={password === ""}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {password === "" && (
          <FormErrorMessage>Password is required.</FormErrorMessage>
        )}
      </FormControl>
      <Text marginBottom="10px">I forgot my password</Text>
      <Button
        marginBottom="25px"
        w="100%"
        bgColor="rgb(58,16,229)"
        color="rgb(255,255,255)"
        _hover={{ bgColor: "rgb(81,49,243)" }}
        onClick={() => signInWithEmailAndPassword(email, password)}
      >
        Login
      </Button>
    </>
  );
};
export default LoginWithEmail;
