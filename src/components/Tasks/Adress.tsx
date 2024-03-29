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
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionActions from "@mui/material/AccordionActions";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";

const Account = ({
  title,
  insurance,
}: {
  title: string;
  insurance?: any;
}): JSX.Element => {
  const InsuranceForm = [
    { title: "Adress", content: `${insurance?.address}` },
    { title: "Phone Number", content: `${insurance?.phone}` },
    { title: "Contact Name", content: `${insurance?.contactname}` },
    { title: "Contact Phone", content: `${insurance?.contactphone}` },
  ];
  const navigate = useNavigate();
  return (
    <>
      <StyledAccordion expanded={false}>
        <AccordionSummary
          expandIcon={null}
          aria-controls="panel1a-content"
          id="panel1a-header"
          onClick={() =>
            navigate(`/patient/${insurance?.id}?name=${insurance?.firstname}`)
          }
        >
          <Typography variant="h6" color="text.secondary">
            {title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Divider />
          <Grid
            sx={{ p: 1 }}
            container
            spacing={2}
            // direction="row"
            justifyContent="space-between"
            alignItems="self-start"
          >
            {InsuranceForm.map((field, index) => (
              <>
                <Grid
                  columns={{ xs: 1, sm: 1, md: 1 }}
                  key={index}
                  item
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                  width="50%"
                >
                  <Box display="flex" gap="24px">
                    <Typography variant="h6">{`${field.title}: `} </Typography>
                  </Box>
                </Grid>
                <Grid
                  columns={{ xs: 1, sm: 1, md: 1 }}
                  key={`${index} 2`}
                  item
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                  width="50%"
                >
                  <Box display="flex" gap="24px" key={index}>
                    <Typography>{`${field.content}`} </Typography>
                  </Box>
                </Grid>
              </>
            ))}
          </Grid>
        </AccordionDetails>
      </StyledAccordion>
    </>
  );
};

const StyledAccordion = styled(Accordion)(
  () => `
    && {
      border-radius: 0;
      background: rgb(0 0 0 / 10%);
    }
`
);

export default Account;
