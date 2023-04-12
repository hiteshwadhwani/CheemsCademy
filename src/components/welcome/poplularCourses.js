import {useMediaQuery, Box, Container, Grid, Heading, Button } from "@chakra-ui/react"
import Boxes from "./Boxes"


const PopularCourses = (props) => {
    const [isMobile] = useMediaQuery("(max-width: 1028px)");
    return (
        <Box padding='50px' width='100%' bgGradient='linear(180deg, rgb(16,22,47), rgb(16,50,150))'>
            <Box>
                <Heading color='white' textAlign='center' as='h6' size='md'>Start Learning</Heading>
                <Heading color='white' textAlign='center' as='h2' size='xl'>Popular Courses</Heading>
            </Box>
            <Grid padding='40px' marginY='20px' marginX={isMobile ? '50px' : '300px'} templateColumns={isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)'} gap={8}>
                <Boxes />
                <Boxes />
                <Boxes />
                <Boxes />
            </Grid>
            <Button display='block' margin='auto' bgColor='rgb(255,211,0)' borderRadius='0' _hover={{opacity:0.8}}>Explore Full Catalog</Button>
        </Box>
    )
}


export default PopularCourses