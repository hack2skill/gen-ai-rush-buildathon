import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";
import React from "react";

export const AppLogo = () => {
  const theme = useTheme();

  return (
    <Typography
      variant="h6"
      textTransform="uppercase"
      p={2}
      bgcolor={theme.palette.primary.main}
      color="white"
      fontWeight="bold"
    >
      Smart Socio
    </Typography>
  );
};
