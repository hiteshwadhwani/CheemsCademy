import {
  Box,
  Grid,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Image,
} from "@chakra-ui/react";

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

export default OverViewBox;
