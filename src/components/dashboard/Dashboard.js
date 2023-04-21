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
} from "@chakra-ui/react";

// import CourseBox from "./CourseBox";
import Recommended from "./Recommended";
import { useSelector } from "react-redux";
import { getUser } from "../../features/user/userSlice";
import { useEffect, useState } from "react";
import { getDoc } from "firebase/firestore";

const CourseBox = ({ user }) => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // const getEnrolledCourses = async () => {
  //   const courses = [];
  //   user.EnrolledCourses.map(async (courseRef) => {
  //     const course = await getDoc(courseRef);
  //     if (course.exists()) {
  //       courses.push({ id: course.id, ...course.data() });
  //     }
  //   });
  //   setEnrolledCourses(courses);
  //   setLoading(false);
  // };
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courses = [];
        for (const reference of user.EnrolledCourses) {
          const course = await getDoc(reference);
          courses.push({ id: course.id, ...course.data() });
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
  if (loading === false) console.log(enrolledCourses);

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
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
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
