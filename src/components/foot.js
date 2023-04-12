import {
  Box,
  Flex,
  Text,
  List,
  ListItem,
  Grid,
  GridItem,
  Divider,
} from "@chakra-ui/react";
import styled from "styled-components";
import { useMediaQuery } from "@chakra-ui/react";

const Foot = (props) => {
  const [isMobile] = useMediaQuery("(max-width: 1028px)");

  const subjects = [
    "AI",
    "Cloud Computing",
    "Code Foundations",
    "Computer Science",
    "Cybersecurity",
    "Data Analytics",
    "Data Science",
    "Data Visualization",
    "Developer Tools",
    "DevOps",
    "Game Development",
    "IT",
    "Machine Learning",
    "Math",
    "Mobile Development",
    "Web Design",
    "Web Development",
  ];

  const languages = [
    "Bash",
    "C",
    "C++",
    "C#",
    "Go",
    "HTML & CSS",
    "Java",
    "JavaScript",
    "Kotlin",
    "PHP",
    "Python",
    "R",
    "Ruby",
    "SQL",
    "Swift",
  ];
  const carrer_building = [
    "Career paths",
    "Career services",
    "Interview prep",
    "Professional certification",
    "Full Catalog",
    "Beta Content",
    "Roadmap",
  ];

  return (
    <Grid
      padding="50px"
      templateColumns={isMobile ? "repeat(1, 1fr)" : "repeat(2, 1fr)"}
      marginX={isMobile ? "0" : "16rem"}
      gap={6}
    >
      <GridItem>
        <Grid templateColumns="repeat(3, 1fr)">
          <GridItem>
            <CustomText>Company</CustomText>
            <List spacing="3">
              <ListItem>About</ListItem>
              <ListItem>Careers</ListItem>
              <ListItem>Affilates</ListItem>
            </List>
          </GridItem>
          <GridItem>
            <Flex flexDirection="column">
              <Box marginBottom="25px">
                <CustomText>Resources</CustomText>
                <List spacing="3">
                  <ListItem>Articles</ListItem>
                  <ListItem>Blog</ListItem>
                  <ListItem>Cheatsheets</ListItem>
                  <ListItem>code challanges</ListItem>
                  <ListItem>Docs</ListItem>
                  <ListItem>Projects</ListItem>
                </List>
              </Box>
              <Box>
                <CustomText>Support</CustomText>
                <List spacing="3">
                  <ListItem>Help Centre</ListItem>
                </List>
              </Box>
            </Flex>
          </GridItem>
          <GridItem>
            <Flex flexDirection="column">
              <Box marginBottom="25px">
                <CustomText>Plans</CustomText>
                <List spacing="3">
                  <ListItem>Paid memberships</ListItem>
                  <ListItem>For students</ListItem>
                  <ListItem>Business Solution</ListItem>
                </List>
              </Box>
              <Box>
                <CustomText>Community</CustomText>
                <List spacing="3">
                  <ListItem>Forums</ListItem>
                  <ListItem>Chapters</ListItem>
                  <ListItem>Events</ListItem>
                </List>
              </Box>
            </Flex>
          </GridItem>
        </Grid>
      </GridItem>
      <GridItem>
        <Grid templateColumns="repeat(3, 1fr)">
          <GridItem>
            <CustomText>Community</CustomText>
            <List spacing="3">
              {subjects.map((item, index) => (
                <ListItem key={index}>{item}</ListItem>
              ))}
            </List>
          </GridItem>
          <GridItem>
            <CustomText>languages</CustomText>
            <List spacing="3">
              {subjects.map((item, index) => (
                <ListItem key={index}>{item}</ListItem>
              ))}
            </List>
          </GridItem>
          <GridItem>
            <CustomText>Community</CustomText>
            <List spacing="3">
              {carrer_building.map((item, index) => (
                <ListItem key={index}>{item}</ListItem>
              ))}
            </List>
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>
  );
};
const CustomBox = styled(Box)`
  border: 1px solid black;
  width: 50%;
`;
const CustomText = styled(Text)`
  line-height: 2.5;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 1rem;
`;
export default Foot;
