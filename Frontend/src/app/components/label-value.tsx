import { Box, Typography } from "@mui/material";

export const LabelValue = (props: LabelValueProps) => {
  return (
    <Box
      flexDirection="row"
      display="flex"
      gap={3}
      alignItems="start"
      overflow="auto"
    >
      <Typography flex={1} variant="body1" color="text.secondary">
        {props.label}:
      </Typography>
      <Typography flex={5} width={0} variant="body1">
        {props.value}
      </Typography>
    </Box>
  );
};

export interface LabelValueProps {
  label: string;
  value: string;
}
