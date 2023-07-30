import { Box, BoxProps, Divider, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

export const Section = (props: SectionProps) => {
  const { heading, action, ...boxProps } = props;

  return (
    <Box
      display="flex"
      flexDirection="column"
      flex={1}
      width={0}
      height="100%"
      alignItems="stretch"
      {...boxProps}
    >
      <Stack>
        <Box
          display="flex"
          alignItems="center"
          flexDirection="row"
          justifyContent="space-between"
        >
          <Typography p={2} flex={1} width={0} variant="h5" fontWeight="bold">
            {heading}
          </Typography>
          <Box mr={2}>{action}</Box>
        </Box>
        <Divider />
      </Stack>
      <Box
        height={0}
        flex={1}
        display="flex"
        flexDirection="column"
        alignItems="stretch"
        overflow="auto"
      >
        {props.children}
      </Box>
    </Box>
  );
};

export interface SectionProps extends BoxProps {
  heading: String;
  action?: ReactNode;
}
