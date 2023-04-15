import {
  Box,
  Container,
  Grid,
  Heading,
  List,
  ListItem,
} from "@chakra-ui/react";
import PopularSubjects from "./PopularSubjects";
import TopCarrerPaths from "./TopCarrerPaths";
import PopularCourses from "./PopularCourses";
import Boxes from "../welcome/Boxes";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  collectionGroup,
  where,
  query,
} from "firebase/firestore";
import { db } from "../../firebase";

const Catalog = (props) => {
  const [showCourses, setShowCourses] = useState("all");
  const [courses, setCourses] = useState()
  const [loading, setLoading] = useState(true)
  console.log(showCourses);

  const getCourses = async (type) => {
    let collection_ref = null;
    if(type === 'all'){
      collection_ref = collection(db, "courses");
    }
    else{
      collection_ref = query(collection(db, "courses"), where("type", "==", type));
    }
    
    try {
      const courses = [];

      const ret = await getDocs(collection_ref);

      ret.forEach(async (response) => {
        let course = {};
        course["course"] = response.data();
        const module_arr = [];
        const modules = await getDocs(
          collection(db, "courses", response.id, "modules")
        );
        modules.forEach((module) => {
          module_arr.push(module.data());
        });
        course["module"] = module_arr;
        courses.push(course);
      });
      setCourses(courses)
    } catch (err) {
      console.log("something went wrong in getting courses", err);
    }
    finally{
      setLoading(false)
    }
  };

  useState(() => {
    getCourses(showCourses)
  }, [showCourses]);

  console.log(courses)

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
              <Link to="/course/:id">
                <Boxes />
              </Link>
              <Boxes />
            </Grid>
          </Box>
        </Grid>
      </Box>
    </>
  );
};

export default Catalog;
