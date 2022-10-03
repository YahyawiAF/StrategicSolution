import { useContext } from "react";

import {
  Box,
  alpha,
  Stack,
  Divider,
  IconButton,
  Tooltip,
  styled,
  useTheme,
} from "@mui/material";
import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import { SidebarContext } from "~/contexts/SidebarContext";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import HeaderButtons from "./Buttons";
import HeaderUserbox from "./Userbox";
import Breadcrumb from "@components/Breadcrumbs";

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        height: ${theme.header.height};
        color: ${theme.header.textColor};
        padding:${theme.typography.pxToRem(14)};
        right: 0;
        z-index: 6;
        background-color: ${alpha(theme.header.background, 0.95)};
        backdrop-filter: blur(3px);
        position: fixed;
        justify-content: space-between;
        width: 100%;
`
);

function Header() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const theme = useTheme();
  return (
    <HeaderWrapper
      display="flex"
      alignItems="center"
      sx={{
        backgroundColor: "white",
        [theme.breakpoints.up("lg")]: {
          left: `${sidebarToggle ? "250px" : theme.sidebar.width}`,
          width: "auto",
        },
      }}
    >
      <Stack
        direction="row"
        //divider={<Divider orientation="vertical" flexItem />}
        alignItems="center"
        spacing={2}
      >
        <NavigateNextOutlinedIcon
          onClick={toggleSidebar}
          sx={{
            boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.08)",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        />
        <Breadcrumb />
      </Stack>
      <Box display="flex" alignItems="center">
        <HeaderButtons />
        <HeaderUserbox />
        <Box
          component="span"
          sx={{
            ml: 2,
            display: { lg: "none", xs: "inline-block" },
          }}
        >
          <Tooltip arrow title="Toggle Menu">
            <IconButton color="primary" onClick={toggleSidebar}>
              {!sidebarToggle ? (
                <MenuTwoToneIcon fontSize="small" />
              ) : (
                <CloseTwoToneIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </HeaderWrapper>
  );
}

export default Header;
