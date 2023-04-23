import { Box, Button, Heading } from '@chakra-ui/react'
import { useState } from 'react'
import ReactPlayer from 'react-player/lazy'
import styled from 'styled-components'


const Player = (props) => {
    const [isPlaying, setIsPlaying] = useState(false)
    return (
        <CustomBox>
            <ReactPlayer position='absolute' width='50%' playing={isPlaying} onEnded={() => setIsPlaying(!isPlaying)}
          height='50%' url='https://firebasestorage.googleapis.com/v0/b/codecademy-16c7b.appspot.com/o/lectures%2FDoge%20dancing.mp4?alt=media&token=3eb21f9d-6bc3-44d8-b8d8-a3e454bebfca' />
          {isPlaying ? (<Button onClick={() => setIsPlaying(!isPlaying)}>pause</Button>) : (<Button onClick={() => setIsPlaying(!isPlaying)}>play</Button>)}
        </CustomBox>
    )
}

const CustomBox = styled(Box)`
  height: 100%;
  width: 100%;
  position: fixed;
  inset: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  backdrop-filter: blur(5px);
`

export default Player