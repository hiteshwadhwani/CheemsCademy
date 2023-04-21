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
import { db } from "../../firebase";
import { useState } from "react";
import { getUserUID, updateCourses } from "../../features/user/userSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const OverViewBox = ({ courses }) => {
  return (
    <Box padding="3rem">
      <Grid templateColumns={"3fr 0.8fr"} gap={8}>
        <Box padding="1rem">
          <Box marginBottom="2rem">
            <Heading marginBottom="1rem" as="h4" size="lg">
              About this course
            </Heading>
            <Text>{courses.description}</Text>
          </Box>
          <Box marginBottom="2rem">
            <Heading marginBottom="1rem" as="h4" size="lg">
              Skills you’ll gain
            </Heading>
            <UnorderedList>
              <ListItem>Build core programming concepts</ListItem>
              <ListItem>Build core programming concepts</ListItem>
              <ListItem>Build core programming concepts</ListItem>
            </UnorderedList>
          </Box>
        </Box>
        <Box marginTop="1rem">
          <Grid templateColumns="1fr" gap={0}>
            <Box border="1px solid grey" borderBottom="none" padding="1rem">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <Text>Earn</Text>
                <Text color="rgb(96,96,97)" fontSize="4xl" fontWeight="bold">
                  Certificate
                </Text>
                <Text>of completion</Text>
              </Box>
            </Box>
            <Box border="1px solid grey" borderBottom="none" padding="1rem">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <Text>Join</Text>
                <Text color="rgb(96,96,97)" fontSize="4xl" fontWeight="bold">
                  3,138,707
                </Text>
                <Text>people who have taken this course</Text>
              </Box>
            </Box>
            <Box border="1px solid grey" borderBottom="none" padding="1rem">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <Text>Time to Complete</Text>
                <Text color="rgb(96,96,97)" fontSize="4xl" fontWeight="bold">
                  25 Hours
                </Text>
              </Box>
            </Box>
            <Box border="1px solid grey" padding="1rem">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <Text>Prerequisites</Text>
                <Text color="rgb(96,96,97)" fontSize="4xl" fontWeight="bold">
                  None
                </Text>
              </Box>
            </Box>
          </Grid>
        </Box>
      </Grid>
      <Employees />
    </Box>
  );
};

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

const Employees = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      marginY="2rem"
    >
      <Heading marginBottom="3rem">
        Codecademy courses have been taken by employees at
      </Heading>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexBasis="column nowrap"
        width="70%"
      >
        <Image src="https://www.codecademy.com/webpack/c41d5739bf341f298860a4e1c0bd432e.svg" />
        <Image src="https://www.codecademy.com/webpack/6a7687a155efb7887a81c9703b4021c8.svg" />
        <Image src="https://www.codecademy.com/webpack/77d0701a433ad10d7ac30c5ed14b13d4.svg" />
        <Image src="https://www.codecademy.com/webpack/0c078975ab7d71b7643795ab182fb143.svg" />
        <Image src="https://www.codecademy.com/webpack/a02a53ff8d84511eae365560aaa12a01.svg" />
      </Box>
    </Box>
  );
};

const Course = (props) => {
  const dispatch = useDispatch();
  const userUID = useSelector(getUserUID);
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
      } catch (error) {
        console.log("something went wrong in appying", error);
      } finally {
        console.log("done");
      }
    }
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
