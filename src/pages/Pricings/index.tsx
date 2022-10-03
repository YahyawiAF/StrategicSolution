import { Container, Grid, Typography, styled } from "@mui/material";

const StyledContainer = styled(Container)(
  ({ theme }) => `
          padding: ${theme.spacing(4)};
  `
);

function LandingPage() {
  return (
    <>
      <StyledContainer maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>
            <Typography variant="h3" component="h3" gutterBottom>
              About Page
            </Typography>
          </Grid>
        </Grid>
      </StyledContainer>
    </>
  );
}

export default LandingPage;
