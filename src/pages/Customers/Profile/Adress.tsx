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
  return (
    <>
      <StyledAccordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box display="flex" justifyContent="space-between" width="100%">
            <Typography variant="h6" color="text.secondary">
              {title}
            </Typography>
            <AccordionActions>
              <AddIcon />
              <BorderColorIcon fontSize="small" />
            </AccordionActions>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Divider />
          <Grid
            sx={{ p: 2 }}
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
      box-shadow: 0px 6px 10px rgb(0 0 0 / 15%);
    }
`
);

export default Account;
