import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, IconButton } from "@mui/material";
import { PlayCircle, PauseCircle, RestartAltRounded } from "@mui/icons-material";

export default function Cronometro(): JSX.Element {
  const [inicial, setInicial] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [timerSum, setTimerSum] = useState(0);
  const [timer, setTimer] = useState(0);
  const [horas, setHoras] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [segundos, setSegundos] = useState(0);
  const [milesimos, setMilesimos] = useState(0);
  
  
  useEffect(() => {
    let id: NodeJS.Timeout | null = null

    if (!isPaused) {
      id = setInterval(() => {
        setTimer((new Date().getTime()) - inicial as number);
      }, 23);
    } else {
      if (!isActive) {
        setTimer(0);
      };
      if (id) {
        clearInterval(id as NodeJS.Timeout);
      };
    }
    return () => clearInterval(id as NodeJS.Timeout);
  }, [inicial]);

  useEffect(() => {
      setMilesimos(timer % 1000);
      setSegundos((timer / 1000) % 60);
      setMinutos((timer / 1000) / 60 % 60);
      setHoras((timer / 1000) / 60 / 60);
  }, [timer]);
  
  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
    setInicial(new Date().getTime());
  };

  const handlePause = () => {
    setIsPaused(true);
    setTimerSum(timer);
    setInicial((timer) * (-1));
  };

  const handleResume = () => {
    setIsPaused(false);
    setInicial(new Date().getTime() - timerSum);
  };

  const handleReset = () => {
    setIsActive(false);
    setInicial(0);
    setIsPaused(true);
    setMilesimos(0);
    setSegundos(0);
    setMinutos(0);
    setTimer(0);
    setTimerSum(0);
  };

  const onClick = () => {
    if (isActive && isPaused)
      handleResume()
    else
      handleStart();
  };

  const formatTime = () => {
    return `${String(Math.trunc(horas)).padStart(2,'0')} : ${String(Math.trunc(minutos)).padStart(2,'0')} : ${String(Math.trunc(segundos)).padStart(2,'0')} : ${String(Math.trunc(milesimos)).padStart(3,'0')}`;
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