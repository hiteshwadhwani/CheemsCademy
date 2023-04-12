import { Button, useMediaQuery, Box, Grid, Image, Flex, Heading, Text } from "@chakra-ui/react"

const StartCoding = () => {
    const [isMobile] = useMediaQuery("(max-width: 1028px)");
    return (
        <Box width='100%' paddingY='3rem' bgColor='rgb(16,22,47)'>
            <Grid marginX='15rem' paddingX='6rem' templateColumns={isMobile ? 'repeat(1, 1fr)' : '1.5fr 1fr'} gap={15}>
                <Box>
                    <Image width='100%' height='100%' src="/images/codeEditor.png" />
                </Box>
                <Box>
                    <Flex gap={4} flexDirection='column' justifyContent='center' alignItems='flex-start'>
                        <Heading letterSpacing={1.2} color='white' as='h6' size='md'>Beginners welcome</Heading>
                        <Heading letterSpacing={1.2} color='white' as='h1' size='2xl'>Start coding in seconds</Heading>
                        <Text marginBottom='5rem' color='white'>Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.</Text>
                        <Box>
                            <Button marginRight='10px'>Continue Lesson</Button>
                            <Button>More Begineer Courses</Button>
                        </Box>
                    </Flex>
                </Box>
            </Grid>
        </Box>
    )
}

export default StartCoding;