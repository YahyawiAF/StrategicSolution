import {
  Card,
  styled,
  Grid,
  Paper,
  Box,
  Button,
  Typography,
} from "@mui/material";
import { FC } from "react";
import ProfileForm from "./ProfileForm";

interface AccountProps {
  patient: any;
}

const Account: FC<AccountProps> = ({ patient }) => {
  return (
    <>
      <CardStyled>
        <Container lg={12} container spacing={2}>
          <Grid item>
            <ProfileForm patient={patient} />
          </Grid>
        </Container>
      </CardStyled>
    </>
  );
};

const CardStyled = styled(Card)(
  () => `
      && {
        height: 100%;
        display: flex;
        box-shadow: unset;
        border-radius:0;
      }
  `
);
const Container = styled(Grid)(
  () => `
      && {
        height: 100%;
        margin: 0;
        width: 100%;
      }
  `
);

export default Account;
