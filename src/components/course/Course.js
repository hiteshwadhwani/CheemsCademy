import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useState } from "react";

const Course = (props) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCourse();
    getModule();
  }, [id]);

  const getCourse = async () => {
    try {
      const course = await getDoc(doc(db, "courses", id));
      if (course.exists()) {
        console.log(course.data());
      } else {
        console.log("no course found");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
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
      console.log(modules);
    }
  };

  return (
    <>
      <Box> courses {id} </Box>
    </>
  );
};
export default Course;
