import { Box, Button, Heading } from "@chakra-ui/react";
import { useState } from "react";
import ReactPlayer from "react-player/lazy";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getPlayer, pauseVideo } from "../../features/player/playerSlice";

const Player = () => {
  const dispatch = useDispatch()
  const player = useSelector(getPlayer);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleCloseVideo = () => {
    setIsPlaying(false)
    dispatch(pauseVideo())
  }

  return (
    <>
      {player.show && (
        <CustomBox>
          <Button onClick={handleCloseVideo}>Close</Button>
          <ReactPlayer
            position="absolute"
            width="50%"
            playing={isPlaying}
            onEnded={() => setIsPlaying(!isPlaying)}
            height="50%"
            url={player.url}
          />
          {isPlaying ? (
            <Button onClick={() => setIsPlaying(!isPlaying)}>pause</Button>
          ) : (
            <Button onClick={() => setIsPlaying(!isPlaying)}>play</Button>
          )}
        </CustomBox>
      )}
    </>
  );
};

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
`;

export default Player;
