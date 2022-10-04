import { useContext } from "react";

import {
  Stack,
  Tooltip,
  Box,
  List,
  styled,
  Button,
  ListItem,
  Divider,
} from "@mui/material";
import { NavLink as RouterLink } from "react-router-dom";
import { SidebarContext } from "~/contexts/SidebarContext";

import { ReactComponent as ProfileIcon } from "~/assets/icons/profile.svg";
import { ReactComponent as HeartIcon } from "~/assets/icons/heart.svg";
import { ReactComponent as ReportsIcon } from "~/assets/icons/reports.svg";
import { ReactComponent as BillingIcon } from "~/assets/icons/billing.svg";

import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import Breadcrumb from "@components/Breadcrumbs";
import { NavigateBeforeOutlined } from "@mui/icons-material";

const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(0)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }
    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.colors.alpha.trueWhite[50]};
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`
);

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {

      .MuiListItem-root {
        padding: 1px 0;

        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};

          .MuiBadge-standard {
            background: ${theme.colors.primary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${theme.palette.primary.contrastText};
          }
        }
    
        .MuiButton-root {
          display: flex;
          color: #01061C;
          background-color: transparent;
          width: 100%;
          justify-content: start;
          padding: ${theme.spacing(0)};
          border-radius: ${theme.spacing(0)};
          padding: 14px 14px;
          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(["color"])};
            .MuiSvgIcon-root {
              color: #a3a4a5;
              font-size: 24px;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            color: rgba(255, 255, 255, 0.75);
            font-size: ${theme.typography.pxToRem(20)};
            margin: ${theme.spacing(0)};
            display: flex;
            align-items: center;
            justify-content: start;
            gap: 12px;
            p {
              font-weight: 400;
              font-size: 18px;
              line-height: 20px;
              text-align: center;
              margin: 0;
            }
          }
          
          .MuiButton-endIcon {
            color: #01061C;
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.active,
          &:hover {
            // border-left: 5px solid #282F6C;
            color: ${theme.colors.alpha.trueWhite[100]};

            span {
              width: 100%;
              background: #fff;
              padding: 5px 10px;
              border-radius: 5px;
              display: flex;
              align-items: center;
              justify-content: start;
              gap: 12px;
              margin-left: 8px;
              p {
                color: #01061C;
                margin: 0;
              }
            }

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              transition: ${theme.transitions.create(["color"])};
              .MuiSvgIcon-root {
                color: ${theme.colors.alpha.trueWhite[100]};
                font-size: 26px;
                transition: none;
              }
              svg {
                path {
                  fill: #000;
                }
              }
            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(0)};
          }

          .MuiListItem-root {
            // padding: 1px 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${theme.colors.alpha.trueWhite[100]};
                opacity: 0;
                transition: ${theme.transitions.create([
                  "transform",
                  "opacity",
                ])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.active,
              &:hover {

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
`
);

function SidebarMenu() {
  const { toggleSidebar, sidebarToggle } = useContext(SidebarContext);

  return (
    <>
      <MenuWrapper>
        <List
          component="div"
          // subheader={
          //   <ListSubheader component="div" disableSticky>
          //     <AutoStoriesTwoToneIcon />
          //   </ListSubheader>
          // }
        >
          <Stack
            direction="row"
            //divider={<Divider orientation="vertical" flexItem />}
            alignItems="center"
            justifyContent="end"
            padding="12px"
            spacing={2}
          >
            {sidebarToggle ? (
              <NavigateBeforeOutlined
                onClick={toggleSidebar}
                sx={{
                  boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.08)",
                  borderRadius: "7px",
                  cursor: "pointer",
                  background: "#fff",
                  fill: "#000",
                }}
              />
            ) : (
              <NavigateNextOutlinedIcon
                onClick={toggleSidebar}
                sx={{
                  boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.08)",
                  borderRadius: "7px",
                  cursor: "pointer",
                  background: "#fff",
                  fill: "#000",
                }}
              />
            )}
          </Stack>
          <SubMenuWrapper>
            <List component="div">
              <Divider
                sx={{
                  background: "#FFF",
                  opacity: 0.1,
                }}
              />
              <ListItem component="div">
                <Tooltip placement="right" title="Customers" arrow>
                  <Button
                    disableRipple
                    component={RouterLink}
                    ////onClick={closeSidebar}
                    to="/dashboard"
                    startIcon={
                      <>
                        <ProfileIcon />
                        {sidebarToggle ? <p>Patients</p> : null}
                      </>
                    }
                  />
                </Tooltip>
              </ListItem>
              <Divider
                sx={{
                  background: "#FFF",
                  opacity: 0.1,
                }}
              />
              <ListItem component="div">
                <Tooltip placement="right" title="Products" arrow>
                  <Button
                    disableRipple
                    component={RouterLink}
                    //onClick={closeSidebar}
                    to="/products"
                    startIcon={
                      <>
                        <HeartIcon />
                        {sidebarToggle ? <p>Insurance</p> : null}
                      </>
                    }
                  />
                </Tooltip>
              </ListItem>
              <Divider
                sx={{
                  background: "#FFF",
                  opacity: 0.1,
                }}
              />
              <ListItem component="div">
                <Tooltip placement="right" title="Orders" arrow>
                  <Button
                    disableRipple
                    component={RouterLink}
                    //onClick={closeSidebar}
                    to="/orders"
                    startIcon={
                      <>
                        <ReportsIcon />
                        {sidebarToggle ? <p>Reports</p> : null}
                      </>
                    }
                  />
                </Tooltip>
              </ListItem>
              <Divider
                sx={{
                  background: "#FFF",
                  opacity: 0.1,
                }}
              />
              <ListItem component="div">
                <Tooltip placement="right" title="Pricing" arrow>
                  <Button
                    disableRipple
                    component={RouterLink}
                    //onClick={closeSidebar}
                    to="/pricings"
                    startIcon={
                      <>
                        <BillingIcon />
                        {sidebarToggle ? <p>Billing</p> : null}
                      </>
                    }
                  />
                </Tooltip>
              </ListItem>
              <Divider
                sx={{
                  background: "#FFF",
                  opacity: 0.1,
                }}
              />
            </List>
          </SubMenuWrapper>
        </List>
      </MenuWrapper>
    </>
  );
}

export default SidebarMenu;
