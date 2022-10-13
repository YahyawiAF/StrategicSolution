import { FC, ReactNode, useContext, useState } from "react";
import {
  Box,
  alpha,
  lighten,
  useTheme,
  styled,
  Typography,
  Divider,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import { SidebarContext } from "~/contexts/SidebarContext";
import Sidebar from "./Sidebar";
import Header from "./Header";

import { useAuth } from "~/contexts/authContext";
import { Navigate } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import TasksTag from "~/components/Tasks";

interface SidebarLayoutProps {
  children?: ReactNode;
}

interface EditMenuProps {
  visible: boolean;
}

const SidebarLayout: FC<SidebarLayoutProps> = () => {
  const [isEditMenuVisible, setIsEditMenuVisible] = useState<boolean>(false);
  const theme = useTheme();
  const { sidebarToggle } = useContext(SidebarContext);
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Box
        sx={{
          flex: 1,
          height: "100%",
          display: "flex",
          ".MuiPageTitle-wrapper": {
            background: false ? theme.colors.alpha.trueWhite[5] : "white",
            marginBottom: `${theme.spacing(4)}`,
            boxShadow: false
              ? `0 1px 0 ${alpha(
                  lighten(theme.colors.primary.main, 0.7),
                  0.15
                )}, 0px 2px 4px -3px rgba(0, 0, 0, 0.2), 0px 5px 12px -4px rgba(0, 0, 0, .1)`
              : `0px 2px 4px -3px ${alpha(
                  theme.colors.alpha.black[100],
                  0.1
                )}, 0px 5px 12px -4px ${alpha(
                  theme.colors.alpha.black[100],
                  0.05
                )}`,
          },
        }}
      >
        <Sidebar />
        <Box display="flex" width="100%">
          <EditSideMenu visible={isEditMenuVisible}>
            <Box
              p="25px"
              display="flex"
              justifyContent={isEditMenuVisible ? "space-between" : "center"}
              height={"79px"}
              sx={{ background: "#5c67c6", color: "#FFF" }}
            >
              <Typography
                display={isEditMenuVisible ? "block" : "none"}
                variant="h6"
              >
                TaskList
              </Typography>
              {isEditMenuVisible ? (
                <MenuIcon
                  onClick={() => setIsEditMenuVisible(!isEditMenuVisible)}
                />
              ) : (
                <ArrowForwardIosIcon
                  onClick={() => setIsEditMenuVisible(!isEditMenuVisible)}
                />
              )}
            </Box>
            <Divider />
            {isEditMenuVisible ? <TasksTag /> : null}
          </EditSideMenu>
          <Box
            display="flex"
            flexDirection="column"
            overflow={"hidden"}
            width="100%"
          >
            <Header />
            <Box
              sx={{
                height: "100%",
                // width: "100%",
                position: "relative",
                display: "flex",
                flex: 1,
                overflow: "hidden",
                [theme.breakpoints.up("lg")]: {
                  ml: `${sidebarToggle ? "250px" : "80px"}`,
                },
              }}
            >
              <Box sx={{ height: "100%", width: "100%" }} display="flex">
                <Outlet />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

const EditSideMenu = styled("div", {
  shouldForwardProp: prop => prop !== "visible",
})<EditMenuProps>(
  ({ theme, visible }) => `
  width: ${visible ? "400px" : "50px"};
  position: relative;
  height: 100vh;
  top: 0;
  right: -80px;
  background: #FFF;
  z-index: 11;
  transition: width 0.5s;
      border-top: 1px solid #cecbcb;
    box-shadow: 5px 12px 9px rgb(0 0 0 / 10%);
  form {
    padding: 25px;
    div {
      display: block;
    }
  }
`
);

export default SidebarLayout;
