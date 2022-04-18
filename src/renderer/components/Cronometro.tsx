import React, { useState, useRef, useEffect } from "react";

import { Box, Container, Grid, Typography, IconButton } from "@mui/material";
import { PlayCircle, PauseCircle, RestartAltRounded } from "@mui/icons-material";

export default function Cronometro(): JSX.Element {
  const [minutos, setMinutos] = useState(0);
  const [segundos, setSegundos] = useState(0);
  const [milesimos, setMilesimos] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const increment: { current: NodeJS.Timeout | null } = useRef(null);

  useEffect(() => {
    let soma = milesimos > 999 ? 1 : 0
    setSegundos((segundos) => segundos + soma)
  }, [milesimos])

  useEffect(() => {
    let soma = segundos > 59 ? 1 : 0
    setMinutos((minutos) => minutos + soma)
  }, [segundos])

  const handleStart = () => {
    setIsActive(true)
    setIsPaused(false)
    increment.current = setInterval(() => {
      setMilesimos((milesimos) => milesimos + 18)
      setMilesimos((milesimos) => milesimos % 1000)
      setSegundos((segundos) => segundos % 60)
    }, 18)
  }

  const handleResume = () => {
    setIsPaused(false)
    increment.current = setInterval(() => {
      setMilesimos((milesimos) => milesimos + 18)
      setMilesimos((milesimos) => milesimos % 1000)
      setSegundos((segundos) => segundos % 60)
    }, 18)
  }

  const handlePause = () => {
    clearInterval(increment.current as NodeJS.Timeout)
    setIsPaused(true)
  }

  const handleStartResume = () => {
    isPaused && isActive ? handleResume() : handleStart()
  }

  const handleReset = () => {
    clearInterval(increment.current as NodeJS.Timeout)
    setIsActive(false)
    setIsPaused(true)
    setMilesimos(0)
    setSegundos(0)
    setMinutos(0)
  }

  const formatTime = () => {
    const miliseconds = String(milesimos).padStart(3,'0')
    const seconds = String(segundos).padStart(2,'0')
    const minutes = String(minutos).padStart(2,'0')

    return `${minutes} : ${seconds} : ${miliseconds}`
  }

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Grid container justifyContent="center">
        <Typography variant="h1" textAlign="center" sx={{ mt: 8 }}>
          {formatTime()}
        </Typography>
      </Grid>
      <Typography variant="h1" textAlign="center" sx={{ mt: 6 }}>
        {isPaused ? <IconButton aria-label="play" size="large" sx={{ color: "#FFF" }} onClick={handleStartResume}>
          <PlayCircle fontSize="inherit" />
        </IconButton> :
        <IconButton aria-label="pause" size="large" sx={{ color: "#FFF" }} onClick={handlePause}>
          <PauseCircle fontSize="inherit" />
        </IconButton>}
        {isActive &&
        <IconButton aria-label="restart" size="large" sx={{ color: "#FFF" }} onClick={handleReset}>
          <RestartAltRounded fontSize="inherit" />
        </IconButton>}
      </Typography>
    </Container>
  );
}