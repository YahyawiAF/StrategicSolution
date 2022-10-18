import {
  Card,
  styled,
  Grid,
  Paper,
  Box,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import PhoneIcon from "@mui/icons-material/Phone";
import { ReactNode } from "react";

const Column = ({
  header,
  content,
}: {
  header: ReactNode;
  content: ReactNode;
}): JSX.Element => {
  return (
    <Box display="flex" flexDirection="column">
      <StyledHeader>{header}</StyledHeader>
      <StyledRow>{content}</StyledRow>
    </Box>
  );
};

const PhoneTable = ({ patient }: { patient: any }): JSX.Element => {
  return (
    <>
      <Container>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h5" color="text.secondary">
            Phone Number
          </Typography>
          <Link to="">Validate/Import</Link>
        </Box>
        <Box display="flex" width="100%">
          <Column header={<AddIcon />} content={<PhoneIcon />} />
          <Column header="Phone Number" content={`${patient?.patientnumber}`} />
          <Column header="Type" content="Data" />
          <Column header="Last Seen" content="Data" />
          <Column header="Validate Date" content="Data" />
          <Column header="Carrier" content="Data" />
          <Column header="Status" content="Data" />
          <Column header="In Cell" content="Data" />
          <Column header="Actions" content="Data" />
        </Box>
      </Container>
    </>
  );
};

const Container = styled(Box)(
  () => `
        && {
          display: flex;
          flex-direction: column;
          background: #FFF;
          padding: 10px;
          border-radius: 8px;
        }
    `
);

const StyledHeader = styled(Box)(
  () => `
          && {
            border-right: 1px solid #FFF;
            padding: 8px;
            background: #D5D8EF;
            display: flex;
          }
      `
);

const StyledRow = styled(Box)(
  () => `
          && {
            border-right: 1px solid #FFF;
            padding: 8px;
            background: #F4F4F4;
            display: flex;
          }
      `
);

export default PhoneTable;
