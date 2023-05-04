import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  List,
  ListItem,
  StackItem,
  Text,
  UnorderedList,
  Stack,
  Image,
  Skeleton,
  VStack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { useState, useCallback } from "react";
import { getUserUID, updateCourses, getUser } from "../../features/user/userSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import OverViewBox from "./OverViewBox";

import { ref, getDownloadURL } from "firebase/storage";
import { toast } from "react-hot-toast";
import useRazorpay from "react-razorpay";

const SyllabusBox = ({ courseModule, loadingModules }) => {
  return (
    <>
      <Box padding="3rem">
        <Grid templateColumns="2fr 1fr" marginBottom="1rem">
          <Box>
            <Heading as="h4" size="lg">
              Course Description
            </Heading>
            <Text fontSize="md">
              Learn to code in Java — a robust programming language used to
              create software, web and mobile apps, and more.
            </Text>
          </Box>
          <Box>
            <Heading as="h4" size="lg">
              Details
            </Heading>
            <Text fontSize="md">
              Earn a certificate of completion 25 hours to complete in total
              Beginner
            </Text>
          </Box>
        </Grid>

        <Modules courseModule={courseModule} loadingModules={loadingModules} />
      </Box>
    </>
  );
};

const Modules = ({ courseModule, loadingModules }) => {
  return (
    <Box>
      <Skeleton fadeDuration={1} isLoaded={!loadingModules}>
        <Stack spacing={4}>
          {courseModule.map((module) => (
            <StackItem>
              <Box
                bgColor="rgb(247,245,251)"
                padding="2rem"
                borderRadius="10px"
              >
                <Heading as="h4" size="md" marginBottom="1rem">
                  {module.name}
                </Heading>
                <Text>{module.description}</Text>
              </Box>
            </StackItem>
          ))}
        </Stack>
      </Skeleton>
    </Box>
  );
};

const Course = (props) => {
  const Razorpay = useRazorpay();
  const dispatch = useDispatch();
  const userUID = useSelector(getUserUID);
  const user = useSelector(getUser)
  const { id } = useParams();
  const [courses, setCourse] = useState();
  const [courseModule, setCourseModules] = useState([]);
  const [loadingCoure, setLoadingCourse] = useState(true);
  const [loadingModules, setLoadingModules] = useState(true);
  const [overview, setOverview] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getCourse();
    getModule();
  }, []);

  const getCourse = async () => {
    try {
      const course = await getDoc(doc(db, "courses", id));
      if (course.exists()) {
        setCourse(course.data());
      } else {
        console.log("no course found");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingCourse(false);
    }
  };
  const getModule = async () => {
    try {
      const module = await getDocs(collection(db, "courses", id, "modules"));
      const jsonData = [];
      module.forEach((doc) => {
        jsonData.push({ id: doc.id, ...doc.data() });
      });
      setCourseModules(jsonData);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingModules(false);
    }
  };

  if (loadingModules === false) console.log(courseModule);

  const handleApply = async (e) => {
    e.preventDefault();

    if (userUID === "" || userUID === null) {
      navigate("/login");
    } else {
      try {
        handlePayment();
      } catch (error) {
        toast.error(error);
      } finally {
        console.log("done");
      }
    }
  };

  const handlePayment = async (params) => {
    const options = {
      key: process.env.REACT_APP_YOUR_RAZORPAY_API_KEY, // Enter the Key ID generated from the Dashboard
      amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: user.displayName,
      description: courses.name,
      handler: async function (response) {
        const courseRef = doc(db, "courses", id);
        const userRef = doc(db, "user", userUID);
        await updateDoc(userRef, {
          courses: arrayUnion(courseRef),
        });
        dispatch(
          updateCourses({
            newCourse: courseRef,
          })
        );
        navigate("/dashboard");
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new Razorpay(options);

    rzp1.on("payment.failed", function (response) {
      toast.error(response.error.description);
    });

    rzp1.open();
  };

  return (
    <>
      {loadingCoure ? (
        <Box>Loading</Box>
      ) : (
        <Box bgColor="white">
          <Box
            minH="20rem"
            bgColor="rgb(45, 170, 166)"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <Heading color="white">Learn {courses.name}</Heading>
              <Button onClick={handleApply} bgColor="rgb(255,211,0)" mt="3rem">
                APPLY
              </Button>
            </Box>
          </Box>

          <Box marginY="2rem">
            <Box width="80%" margin="auto">
              <Box borderBottom="1px solid grey">
                <Button
                  onClick={() => setOverview(true)}
                  borderRadius="0px"
                  borderBottom={overview && "1px solid blue"}
                  variant="ghost"
                  size="lg"
                >
                  Overview
                </Button>
                <Button
                  onClick={() => setOverview(false)}
                  borderRadius="0px"
                  borderBottom={!overview && "1px solid blue"}
                  variant="ghost"
                  size="lg"
                >
                  Syllabus
                </Button>
              </Box>
              {overview && <OverViewBox courses={courses} />}
              {!overview && (
                <SyllabusBox
                  courseModule={courseModule}
                  loadingModules={loadingModules}
                />
              )}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};
export default Course;
