import React, { useState, useRef } from "react";

import { Box, Container, Grid, Typography, IconButton } from "@mui/material";
import { PlayCircle, PauseCircle, RestartAltRounded } from "@mui/icons-material";

export default function Cronometro(): JSX.Element {
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const increment: { current: NodeJS.Timeout | null } = useRef(null);

  const handleStart = () => {
    setIsActive(true)
    setIsPaused(false)
    increment.current = setInterval(() => {
      setTimer((timer) => timer + 10)
    }, 10)
  }

  const handlePause = () => {
    clearInterval(increment.current as NodeJS.Timeout)
    setIsPaused(true)
  }

  const handleResume = () => {
    setIsPaused(false)
    increment.current = setInterval(() => {
      setTimer((timer) => timer + 10)
    }, 10)
  }

  const handleReset = () => {
    clearInterval(increment.current as NodeJS.Timeout)
    setIsActive(false)
    setIsPaused(true)
    setTimer(0)
  }

  const formatTime = () => {
    const miliseconds = String(timer % 1000).padStart(3,'0')
    const seconds = String(Math.trunc(timer / 1000)).padStart(2,'0')
    const minutes = String(Math.trunc(timer / 60000)).padStart(2,'0')
    //const hours = String(Math.trunc(timer / 216000000)).padStart(2,'0')

    return /*`${hours} : */`${minutes} : ${seconds} : ${miliseconds}`
  }

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Grid container justifyContent="center">
        <Typography variant="h1" textAlign="center" sx={{ mt: 8 }}>
          {formatTime()}
        </Typography>
      </Grid>
      <Typography variant="h1" textAlign="center" sx={{ mt: 6 }}>
        {isPaused ? <IconButton aria-label="play" size="large" sx={{ color: "#FFF" }} onClick={handleStart}>
          <PlayCircle fontSize="inherit" />
        </IconButton> :
        <IconButton aria-label="pause" size="large" sx={{ color: "#FFF" }} onClick={handlePause}>
          <PauseCircle fontSize="inherit" />
        </IconButton>}
        {timer !== 0 &&
        <IconButton aria-label="restart" size="large" sx={{ color: "#FFF" }} onClick={handleReset}>
          <RestartAltRounded fontSize="inherit" />
        </IconButton>}
      </Typography>
    </Container>
  );
}