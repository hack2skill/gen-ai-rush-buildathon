import { Box, Button, Stack, Typography } from "@mui/material";

export const ConnectableApp = (props: ConnectableAppProps) => {
  return (
    <Button
      variant="text"
      disabled={props.disabled}
      sx={{
        opacity: props.disabled ? 0.5 : 1,
        width: "100%",
        height: "100%",
        pointerEvents: !props.onClick ? "none" : undefined,
      }}
      onClick={props.onClick}
    >
      <Stack alignItems="center">
        <Box pt={1} pl={1} pr={1}>
          <img width="100%" src={props.icon} alt="" />
        </Box>
        <Typography variant="caption">{props.name}</Typography>
      </Stack>
    </Button>
  );
};

export interface ConnectableAppProps {
  id: string;
  icon: string;
  name: string;
  disabled: boolean;
  onClick?: () => void;
}
