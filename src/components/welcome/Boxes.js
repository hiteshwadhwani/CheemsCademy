import {
  useMediaQuery,
  Divider,
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Flex,
} from "@chakra-ui/react";
import { transform } from "framer-motion";
import styled from "styled-components";

const Boxes = (props) => {
  return (
    // <Card height='20rem' borderRadius='0' _hover={{transform: 'translate3d(2px, -2px, 2px)'}} transition='transform 0.2s ease'>
    <CustomCard>
      <video autoPlay={true} loop={true} playsInline={true} muted>
        <source src="/videos/Doge dancing.mp4" type="video/mp4" />
      </video>
      <CardHeader backgroundColor="rgb(234,253,198)">
        <Heading size="xs">Client Report</Heading>
      </CardHeader>
      <CardBody>
        <Heading as="h5" size="md">
          Learn JavaScript: Fundamentals
        </Heading>
        <Text pt="2" fontSize="sm">
          Learn how to use JavaScript to power dynamic behaviors on websites.
        </Text>
      </CardBody>
      <Divider />
      <CardFooter
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>Beginner Friendly</Box>
        <Box>3 lessons</Box>
      </CardFooter>
    </CustomCard>
    // </Card>
  );
};

const CustomCard = styled(Card)`
  height: 20rem;
  border-radius: 0;
  transition: transform 0.2s ease;
  position: relative;
  video {
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0px;
    z-index: 0;
    opacity: 0;
    object-fit: cover;
  }
  &:hover {
    transform: translate3d(2px, -2px, 2px);
    video {
      opacity: 0.3;
    }
  }
`;

export default Boxes;
