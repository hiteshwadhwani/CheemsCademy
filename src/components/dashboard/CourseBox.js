import {
  Box,
  Accordion,
  AccordionItem,
  Text,
  AccordionButton,
  Heading,
  AccordionIcon,
  AccordionPanel,
  Skeleton
} from "@chakra-ui/react";

const CourseBox = ({ enrolledCourses, loading }) => {
  return (
    <Skeleton fadeDuration={1} isLoaded={!loading}>
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
                    Learn javascript
                  </Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
    </Skeleton>
  );
};

export default CourseBox;
