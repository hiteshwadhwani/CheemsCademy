import styled from "styled-components";
import { Flex, Box, Image } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux'
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from '../firebase'
import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {setUserLoginDetails, setSignOutState} from '../features/user/userSlice'
import { useNavigate } from 'react-router-dom';
import { useSignOut } from 'react-firebase-hooks/auth';
import { useDocument } from 'react-firebase-hooks/firestore';
import {doc, getDoc } from 'firebase/firestore'
import {db} from '../firebase'
import {useState} from 'react'


const Header = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [scrollPosition, setScrollPosition] = useState(0);
  const [user, loading1, error1] = useAuthState(auth);
  const [signOut, loading2, error2] = useSignOut(auth);
  useEffect(() => {
    if(user){
      getUserData(user)
    }
  }, [user])

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };
  
    window.addEventListener("scroll", handleScroll, { passive: true });
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getUserData = async (user) => {
    const login_user = await getDoc(doc(db, "user", user.uid))
    if(login_user.exists()){
      console.log(login_user.data())
      setUser(login_user.data())
    }
  }

  const handleLogOut = async () => {
    const success = await signOut()
    if(success){
      dispatch(setSignOutState())
    }
  }

  const setUser = (user) => {
    const displayName = user.displayName;
    const photoURL = user.photoURL;
    const email = user.email;
    const uid = user.uid;
    const phoneNumber = user.phoneNumber;
    const EnrolledCourses = user.courses
    dispatch(
      setUserLoginDetails({
        uid,
        displayName,
        email,
        phoneNumber,
        photoURL,
        EnrolledCourses
      })
    );
  };
  
  return (
    <>
      <Box position='fixed' top='0' left='0' right='0' bgColor={scrollPosition > 100 ? 'white' : 'rgb(255,240,229)'} zIndex='1' transition='all 1s linear'>
        <Flex
          w="60%"
          flexDirection="row"
          flexWrap="nowrap"
          m="auto"
          justifyContent="space-between"
          mb="px"
        >
          <Flex
            sx={{
              "@media (max-width: 768px)": {
                display: "none",
              },
            }}
          >
            <Link to='/'>
            <CustomBox width='130px' height='35px'>
              <Image src='/images/logo1.png' width='100%' height='100%' />
            </CustomBox>
            </Link>
            {user && (<Link to='/dashboard'><CustomBox>MyHome</CustomBox></Link>)}
            <Link to='/catalog'><CustomBox>Catalog</CustomBox></Link>
            <CustomBox>Resources</CustomBox>
            <CustomBox>Community</CustomBox>
            <CustomBox>Pricing</CustomBox>
            <CustomBox>Business Solutions</CustomBox>
          </Flex>
          <Flex>
            <CustomBox pointer="hover">
              <Search2Icon />
            </CustomBox>
            {!user ? (<Link to='/login'>
            <CustomBox pointer="hover">
              Login
            </CustomBox>
            </Link>) : (
              <CustomBox onClick={handleLogOut} cursor='pointer'>
                Logout
              </CustomBox>
            )}
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
const CustomBox = styled(Box)`
  margin: 10px;
  padding: 5px;
`;
export default Header;
