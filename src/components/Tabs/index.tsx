import { Tab, styled, TabProps } from "@mui/material";
import { type } from "os";
import React from "react";

// -------------------------------------------------------

type LinkTabProps = {
  label?: string;
  href?: string;
} & TabProps;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  title?: string;
}

const CustomTab = styled(Tab)(
  () => `
    min-width: 120px; 
    width: 120px;
    `
);

export function LinkTab(props: LinkTabProps) {
  return (
    <CustomTab
      disableRipple
      disableFocusRipple
      onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

export function TabPanel(props: TabPanelProps) {
  const { children, title, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

export function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
