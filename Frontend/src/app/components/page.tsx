import { Box, BoxProps } from "@mui/material";
import { useWindowSize } from "react-use";

export const Page = (props: PageProps) => {
  const { width, height } = useWindowSize();

  return (
    <Box
      width={width}
      height={height}
      display="flex"
      flexDirection="column"
      alignItems="stretch"
      {...props}
    />
  );
};

export type PageProps = BoxProps;
