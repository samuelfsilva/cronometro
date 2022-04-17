import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import theme from "../theme";
import Cronometro from "./Cronometro";

export default function App(): JSX.Element {
  return (
    // Setup theme and css baseline for the Material-UI app
    // https://mui.com/customization/theming/
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <main>
          {/* This is where your app content should go */}
          <Cronometro />
        </main>
      </Box>
    </ThemeProvider>
  );
}