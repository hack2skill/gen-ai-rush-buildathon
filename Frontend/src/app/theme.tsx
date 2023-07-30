import { Theme } from "@emotion/react";
import { createTheme } from "@mui/material";
import createPalette from "@mui/material/styles/createPalette";

export const theme: Theme = createTheme({
  palette: createPalette({
    primary: {
      main: "#214354",
    },
  }),
});
