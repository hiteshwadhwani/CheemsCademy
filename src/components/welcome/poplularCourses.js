import {useMediaQuery, Box, Container, Grid, Heading, Button } from "@chakra-ui/react"
import Boxes from "./Boxes"
import { Link } from "react-router-dom";


const PopularCourses = (props) => {
    const courses = [
        {name:"Business Intelligence Data Analyst", short_description:"BI Data Analysts use data to deliver business insights and are in high demand in every industry. ", experience:"None"},
        {name:"Business Intelligence Data Analyst", short_description:"BI Data Analysts use data to deliver business insights and are in high demand in every industry.", experience:"None"},
        {name:"Business Intelligence Data Analyst", short_description:"BI Data Analysts use data to deliver business insights and are in high demand in every industry.", experience:"None"},
        {name:"Business Intelligence Data Analyst", short_description:"BI Data Analysts use data to deliver business insights and are in high demand in every industry.", experience:"None"},
    ]
    const [isMobile] = useMediaQuery("(max-width: 1028px)");
    return (
        <Box padding='50px' width='100%' bgGradient='linear(180deg, rgb(16,22,47), rgb(16,50,150))'>
            <Box>
                <Heading color='white' textAlign='center' as='h6' size='md'>Start Learning</Heading>
                <Heading color='white' textAlign='center' as='h2' size='xl'>Popular Courses</Heading>
            </Box>
            <Grid padding='40px' marginY='20px' marginX={isMobile ? '50px' : '300px'} templateColumns={isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)'} gap={8}>
            {courses.map(course => (
                    <Boxes name={course.name} short_description={course.short_description} experience={course.experience} />
                ))}
            </Grid>
            <Link to='/catalog'><Button display='block' margin='auto' bgColor='rgb(255,211,0)' borderRadius='0' _hover={{opacity:0.8}}>Explore Full Catalog</Button></Link>
        </Box>
    )
}


export default PopularCourses