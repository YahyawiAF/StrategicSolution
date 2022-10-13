import { ReactNode, memo } from "react";
import { styled, Typography, Box, Card, Divider } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import CropFreeIcon from "@mui/icons-material/CropFree";
import AccordionActions from "@mui/material/AccordionActions";

const ColapsableSubPage = ({
  title,
  children,
  expanded,
}: {
  title: string;
  children: ReactNode;
  expanded?: boolean;
}): JSX.Element => {
  return (
    <StyledAccordion defaultExpanded={expanded}>
      <AccordionSummary
        expandIcon={<CropFreeIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h5" color="text.secondary">
          {title}
        </Typography>
        {/* <AccordionActions>ZZZ</AccordionActions> */}
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
      border-radius: 5px;
      box-shadow: 0px 6px 10px rgb(0 0 0 / 15%);
    }
`
);

export default memo(ColapsableSubPage);
