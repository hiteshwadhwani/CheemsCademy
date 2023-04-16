import {
  Box,

  Grid,
  Heading,
  List,
  ListItem,
} from "@chakra-ui/react";
import Boxes from "../welcome/Boxes";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import { db } from "../../firebase";
import {useDispatch, useSelector} from 'react-redux'
import {setCourses, getCourses} from '../../features/courses/coursesSlice'
import { useEffect } from "react";

const ShowBoxes = ({type, courses}) => {
  if(type === 'all'){
    return (
      <>
      {courses.map((course, idx) => (
        <Boxes key={idx} />
      ))}
      </>
    )
  }
  else{
    return (
      <>
      {courses.filter((course) => course.type.toLowerCase() === type.toLowerCase()).map((course, idx) => (
        <Boxes key={idx} />
      ))}
      </>
    )
  }
}


const Catalog = (props) => {
  const dispatch = useDispatch()
  const [showCourses, setShowCourses] = useState("all");
  const [loading, setLoading] = useState(true)
  // const [coursesToShow, setCourses] = useState(null)
  const courses = useSelector(getCourses)

  // console.log(courses)

  const fetchCourses = async () => {
    let collection_ref = collection(db, "courses");
    let courses = [];
    try {
      const ret = await getDocs(collection_ref);
      ret.forEach(async (response) => {
        // const module_arr = [];
        // const modules = await getDocs(
        //   collection(db, "courses", response.id, "modules")
        // );
        // modules.forEach((module) => {
        //   module_arr.push(module.data());
        // });
        
        //pushing in final courses
        courses.push(response.data())
      });
    } catch (err) {
      console.log("something went wrong in getting courses", err);
    }
    finally{
      dispatch(setCourses({
        course:courses
      }))
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchCourses()
    console.log("again")
  }, []);

  return (
    <>
      <Box padding="3rem" marginX="15rem">
        <Grid templateColumns="1fr 3fr">
          <Box>
            <Heading marginTop="10px" as="h4" size="sm" marginBottom="25px">
              Top Languages and Subjects
            </Heading>
            <List>
              <ListItem
                marginBottom="5px"
                _hover={{ cursor: "pointer" }}
                onClick={() => setShowCourses("Python")}
              >
                Python
              </ListItem>
              <ListItem
                marginBottom="5px"
                _hover={{ cursor: "pointer" }}
                onClick={() => setShowCourses("Java")}
              >
                Java
              </ListItem>
              <ListItem
                marginBottom="5px"
                _hover={{ cursor: "pointer" }}
                onClick={() => setShowCourses("Javascript")}
              >
                Javascript
              </ListItem>
              <ListItem
                marginBottom="5px"
                _hover={{ cursor: "pointer" }}
                onClick={() => setShowCourses("C++")}
              >
                C++
              </ListItem>
            </List>
          </Box>
          <Box>
            <Heading as="h2" size="xl" marginBottom="25px">
              {showCourses === "all"
                ? "Explore the catalog"
                : `Explore ${showCourses}`}
            </Heading>
            <Grid templateColumns="repeat(3, 1fr)" gap={5}>
              {/* <Link to="/course/:id">
                <Boxes />
              </Link>
              <Boxes /> */}
              {!loading && (<ShowBoxes type={showCourses} courses={courses} />)}
            </Grid>
          </Box>
        </Grid>
      </Box>
    </>
  );
};

export default Catalog;
