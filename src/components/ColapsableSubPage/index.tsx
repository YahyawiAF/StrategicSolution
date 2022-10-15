import { ReactNode, memo } from "react";
import { styled, Typography, Box, Card, Divider } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import CropFreeIcon from "@mui/icons-material/CropFree";
import AccordionActions from "@mui/material/AccordionActions";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import AddIcon from "@mui/icons-material/Add";

const ColapsableSubPage = ({
  title,
  children,
  icon,
  edit,
  add,
  expanded,
}: {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  edit: boolean;
  add: boolean;
  expanded?: boolean;
}): JSX.Element => {
  return (
    <StyledAccordion defaultExpanded={expanded}>
      <AccordionSummary
        expandIcon={icon ? icon : <CropFreeIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{ minHeight: "36px !important" }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          width="100%"
          alignItems="center"
        >
          <StyledHeader>{title}</StyledHeader>
          <AccordionActions>
            {add ? <AddIcon /> : null}
            {edit ? <BorderColorIcon fontSize="small" /> : null}
          </AccordionActions>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Divider />
        {children}
      </AccordionDetails>
    </StyledAccordion>
  );
};

const StyledAccordion = styled(Accordion)(
  () => `
    && {
      border-radius: 0;
      box-shadow: 0px 6px 10px rgb(0 0 0 / 15%);
      .MuiAccordionSummary-content {
        margin: 0;

      }
    }
`
);

const StyledHeader = styled(Typography)(
  () => `
    && {
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 19px;
      color: #000000;
    }
`
);

export default memo(ColapsableSubPage);
