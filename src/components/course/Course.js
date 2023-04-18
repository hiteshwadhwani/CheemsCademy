import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useState } from "react";
import styled from "styled-components";

const OverViewBox = () => {
  return (
    <Box>overview</Box>
  )
}

const Course = (props) => {
  const { id } = useParams();
  const [course, setCourse] = useState();
  const [loadingCoure, setLoadingCourse] = useState(true);
  const [loadingModules, setLoadingModules] = useState(true);
  const [overview, setOverview] = useState(true)

  useEffect(() => {
    getCourse();
    getModule();
  }, [id]);

  const getCourse = async () => {
    try {
      const course = await getDoc(doc(db, "courses", id));
      if (course.exists()) {
        console.log(course.data());
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
    const modules = [];
    try {
      const module = await getDocs(collection(db, "courses", id, "modules"));
      module.forEach((doc) => modules.push(doc.data()));
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingModules(false);
      console.log(modules);
    }
  };

  return (
    <>
    <Box>
     <Box minH='20rem' bgColor='rgb(45, 170, 166)' display='flex' justifyContent='center' alignItems='center'>
      <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
        <Heading color='white'>Learn Java</Heading>
        <Button bgColor='rgb(255,211,0)' mt='3rem'>APPLY</Button>
      </Box>
     </Box>

     <Box>
      <Box width='80%' margin='auto'>
      <Box borderBottom='1px solid grey' >
        <Button onClick={() => setOverview(true)} borderRadius='0px' borderBottom={overview && '1px solid blue'} bgColor='transparent'>Overview</Button>
        <Button onClick={() => setOverview(false)} borderRadius='0px' borderBottom={!overview && '1px solid blue'} bgColor='transparent'>Syllabus</Button>
      </Box>
      {overview && (
        <OverViewBox />
      )}
      {!overview && (
        <Box>Syllabus</Box>
      )}
      </Box>
     </Box>
     </Box>
    </>
  );
};
export default Course;
