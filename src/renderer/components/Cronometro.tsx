import React, { useState, useRef, useEffect } from "react";
import { Container, Grid, Typography, IconButton } from "@mui/material";
import { PlayCircle, PauseCircle, RestartAltRounded } from "@mui/icons-material";

export default function Cronometro(): JSX.Element {
  const [inicial, setInicial] = useState(0);
  const [control, setControl] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [timerSum, setTimerSum] = useState(0);
  const [timer, setTimer] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [segundos, setSegundos] = useState(0);
  const [milesimos, setMilesimos] = useState(0);
  
  
  useEffect(() => {
    let id: NodeJS.Timeout | null = null

    id = setInterval(() => {
      setTimer((control * new Date().getTime()) - inicial as number);
    }, 23);

    return () => clearInterval(id as NodeJS.Timeout);
  }, [inicial, control]);

  useEffect(() => {
      setMilesimos(timer % 1000);
      setSegundos((timer / 1000) % 60);
      setMinutos((timer / 1000) / 60);
  }, [timer]);
  
  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
    setControl(1);
    setInicial(new Date().getTime());
  };

  const handlePause = () => {
    setIsPaused(true);
    setTimerSum(timer);
    setInicial((timer) * (-1));
    setControl(0);
  };

  const handleResume = () => {
    setIsPaused(false);
    setControl(1);
    setInicial(new Date().getTime() - timerSum);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsPaused(true);
    setMilesimos(0);
    setSegundos(0);
    setMinutos(0);
    setTimer(0);
    setControl(0);
    setInicial(0);
    setTimerSum(0);
  };

  const onClick = () => {
    if (isActive && isPaused)
      handleResume()
    else
      handleStart();
  };

  const formatTime = () => {
    return `${String(Math.trunc(minutos)).padStart(2,'0')} : ${String(Math.trunc(segundos)).padStart(2,'0')} : ${String(Math.trunc(milesimos)).padStart(3,'0')}`;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Grid container justifyContent="center">
        <Typography variant="h1" textAlign="center" sx={{ mt: 8, userSelect: 'none' }}>
          {formatTime()}
        </Typography>
      </Grid>
      <Typography variant="h1" textAlign="center" sx={{ mt: 6 }}>
        {isPaused ? 
        <IconButton aria-label="play" size="large" 
          sx={{ color: "#FFF" }} onClick={() => onClick()}>
          <PlayCircle fontSize="inherit" />
        </IconButton> :
        <IconButton aria-label="pause" size="large" 
          sx={{ color: "#FFF" }} onClick={() => handlePause()}>
          <PauseCircle fontSize="inherit" />
        </IconButton>}
        {isActive &&
        <IconButton aria-label="restart" size="large" 
          sx={{ color: "#FFF" }} onClick={() => handleReset()}>
          <RestartAltRounded fontSize="inherit" />
        </IconButton>}
      </Typography>
    </Container>
  );
}