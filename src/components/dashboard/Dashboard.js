import {
  Box,
  Grid,
  Heading,
  Text,
  useMediaQuery,
  Image,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Skeleton,
  UnorderedList,
  ListItem,
  List,
  ListIcon,
} from "@chakra-ui/react";

// import CourseBox from "./CourseBox";
import Recommended from "./Recommended";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../features/user/userSlice";
import { useEffect, useState } from "react";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { MdPending } from "react-icons/md";
import {playVideo} from "../../features/player/playerSlice"

const CourseBox = ({ user }) => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courses = [];
        for (const reference of user.EnrolledCourses) {
          const course = await getDoc(reference);
          const module = await getDocs(
            collection(db, "courses", course.id, "modules")
          );
          const moduleArr = [];
          module.forEach((doc) => {
            moduleArr.push({ id: doc.id, ...doc.data() });
          });
          courses.push({ id: course.id, ...course.data(), modules: moduleArr });
        }
        setEnrolledCourses(courses);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) {
    return <Box>loading</Box>;
  }

  return (
    <Box padding="5px" marginY="2rem">
      <Accordion defaultIndex={[0]} allowMultiple>
        {enrolledCourses.map((course) => (
          <AccordionItem
            borderRadius="5px"
            border="none"
            boxShadow="0px 0px 18px 3px rgba(194,194,194,1)"
            bgColor="white"
            marginBottom="1.5rem"
            key={course.id}
          >
            <h2>
              <AccordionButton padding="25px">
                <Box as="span" flex="1" textAlign="left">
                  <Text>Course</Text>
                  <Heading as="h6" size="sm">
                    {course.name}
                  </Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {course.description}
              {course.modules.map((module) => (
                <ModuleBox key={module.id} module={module} />
              ))}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
};

const ModuleBox = ({ module }) => {
  const dispatch = useDispatch()
  const handlePlayVideo = (url) => {
    dispatch(playVideo({
      url
    }))
  }
  return (
    <Box margin="1rem" padding="1rem" border="1px solid #E9E9E9">
      <Heading as="h6" size="sm" fontWeight="600">
        {module.name}
      </Heading>
      <Box>
        {module.lectures && (
          <List marginY="1rem" spacing={2}>
            {module.lectures.map((video) => (
              <ListItem padding='4px' onClick={() => handlePlayVideo(video)} _hover={{ bgColor: "#EDEDED", cursor:'pointer' }}>
                <ListIcon  as={MdPending} color="red.500" />
                Intro to javascript
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};

const Dashboard = (props) => {
  const user = useSelector(getUser);

  const [isMobile] = useMediaQuery("(max-width: 1028px)");
  return (
    <>
      <Box marginX={isMobile ? "2rem" : "20rem"} marginY="4rem">
        <Grid templateColumns={isMobile ? "1fr" : "2fr 0.7fr"} gap="5">
          <Box>
            <Heading as="h4" size="lg" fontWeight="600">
              My Courses
            </Heading>
            <CourseBox user={user} />
            <Recommended />
          </Box>
          {!isMobile && (
            <Box>
              <Heading as="h4" size="lg" fontWeight="600">
                My Goals
              </Heading>

              <Box padding="4rem">
                <Image src="/images/goal.svg" />
                <Heading as="h6" size="md">
                  No Goals set yet
                </Heading>
                <Text>
                  Increase your chance of <br /> success by 43%!
                </Text>
              </Box>
            </Box>
          )}
        </Grid>
      </Box>
    </>
  );
};
export default Dashboard;
