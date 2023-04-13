import { Box, Container, Grid, Heading } from "@chakra-ui/react";
import PopularSubjects from "./PopularSubjects";
import TopCarrerPaths from "./TopCarrerPaths";
import PopularCourses from "./PopularCourses";
import Boxes from "../welcome/Boxes";

const Catalog = (props) => {
  return (
    <>
      <Box padding='3rem' marginX='15rem'>
        <Grid templateColumns="1fr 3fr">
          <Box>LEFT</Box>
          <Box>
            <Heading as="h2" size="xl">
              Explore the catalog
            </Heading>
            <PopularSubjects />
            <TopCarrerPaths />
            <PopularCourses />
          </Box>
        </Grid>
      </Box>
    </>
  );
};

export default Catalog;
