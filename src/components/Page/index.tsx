import PropTypes from "prop-types";
import { forwardRef, ReactNode } from "react";
// @mui
import { Container, Grid, styled } from "@mui/material";

// ----------------------------------------------------------------------

type PropsType = {
  children?: ReactNode;
  other?: any;
  title?: string;
};

const ContainerPage = styled(Container)(
  ({ theme }) => `
    && {
      padding:${theme.typography.pxToRem(15)};
    }
`
);

const Page = forwardRef<HTMLInputElement, PropsType>(
  ({ children, ...other }, ref): null | JSX.Element => (
    <>
      <ContainerPage sx={{ height: "100%" }} maxWidth={false} {...other}>
        <Grid sx={{ height: "100%" }} item xs={12}>
          {children}
        </Grid>
      </ContainerPage>
    </>
  )
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

Page.displayName = "Page";

export default Page;
