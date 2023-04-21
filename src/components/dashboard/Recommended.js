import {Box, Heading, Grid} from '@chakra-ui/react'
import Boxes from "../welcome/Boxes"

const Recommended = (props) => {
    return (
        <Box>
            <Heading marginBottom='2rem'>RECOMMENDED</Heading>
            <Grid templateColumns='1fr 1fr' gap='8' padding='5px'>
                <Boxes />
                <Boxes />
            </Grid>
        </Box>
    )
}

export default Recommended