import { forwardRef, ReactNode } from "react";
// @mui
import { Box } from "@mui/material";

type PropsType = {
  children?: ReactNode;
  other?: any;
  title?: string;
};

const Page = forwardRef<HTMLInputElement, PropsType>(
  ({ children, ...other }, ref): null | JSX.Element => (
    <>
      <Box ref={ref} {...other}>
        {children}
      </Box>
    </>
  )
);

Page.displayName = "Page";
export default Page;
