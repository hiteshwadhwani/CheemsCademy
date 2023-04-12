import { useMediaQuery, Divider, Box, Card, CardHeader, CardBody, CardFooter, Heading,Text, Flex } from "@chakra-ui/react"

const Boxes = (props) => {
    

    return (
        <Card height='20rem' borderRadius='0'>
            <CardHeader backgroundColor='rgb(234,253,198)'>
            <Heading size='xs'>Client Report</Heading>
            </CardHeader>
            <CardBody>
                <Heading as='h5' size='md'>Learn JavaScript: Fundamentals</Heading>
                <Text pt='2' fontSize='sm'>Learn how to use JavaScript to power dynamic behaviors on websites.</Text>
            </CardBody>
            <Divider />
            <CardFooter display='flex' alignItems='center' justifyContent='space-between'>
                
                    <Box>Beginner Friendly</Box>
                    <Box>3 lessons</Box>
                
            </CardFooter>
        </Card>
    )
}

export default Boxes