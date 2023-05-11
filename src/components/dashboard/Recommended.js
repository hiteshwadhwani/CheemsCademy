import {Box, Heading, Grid} from '@chakra-ui/react'
import Boxes from "../welcome/Boxes"

const Recommended = (props) => {
    const courses = [
        {name:"Business Intelligence Data Analyst", short_description:"BI Data Analysts use data to deliver business insights and are in high demand in every industry. ", experience:"None"},
        {name:"Business Intelligence Data Analyst", short_description:"BI Data Analysts use data to deliver business insights and are in high demand in every industry.", experience:"None"},
    ]
    return (
        <Box>
            <Heading marginBottom='2rem'>RECOMMENDED</Heading>
            <Grid templateColumns='1fr 1fr' gap='8' padding='5px'>
                {courses.map(course => (
                    <Boxes name={course.name} short_description={course.short_description} experience={course.experience} />
                ))}
            </Grid>
        </Box>
    )
}

export default Recommended