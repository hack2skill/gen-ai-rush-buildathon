import React from "react";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme";
import { DataProvider } from "./providers/data-provider";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./router";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <DataProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Router />
          </LocalizationProvider>
        </DataProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
