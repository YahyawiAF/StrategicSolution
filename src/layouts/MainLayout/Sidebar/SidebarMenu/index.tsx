import { useContext } from "react";

import {
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

import PersonTwoToneIcon from "@mui/icons-material/PersonTwoTone";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import AutoStoriesTwoToneIcon from "@mui/icons-material/AutoStoriesTwoTone";
import AttachMoneyTwoToneIcon from "@mui/icons-material/AttachMoneyTwoTone";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
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
          justify-content: center;
          padding: ${theme.spacing(0)};
          border-radius: ${theme.spacing(0)};
          padding: 14px 0;
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
            color: #01061C;
            font-size: ${theme.typography.pxToRem(20)};
            margin: ${theme.spacing(0)};
          }
          
          .MuiButton-endIcon {
            color: #01061C;
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.active,
          &:hover {
            border-left: 5px solid #282F6C;
            background: linear-gradient(90deg, rgba(1, 163, 212, 0.09) 0%, rgba(1, 163, 212, 0) 100%);
            color: ${theme.colors.alpha.trueWhite[100]};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              transition: ${theme.transitions.create(["color"])};
              .MuiSvgIcon-root {
                color: ${theme.colors.alpha.trueWhite[100]};
                font-size: 26px;
                transition: none;
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
            padding: 1px 0;

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
  const { closeSidebar } = useContext(SidebarContext);

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
                    startIcon={<PersonTwoToneIcon />}
                  ></Button>
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
                    startIcon={<ShoppingCartRoundedIcon />}
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
                    startIcon={<AutoStoriesTwoToneIcon />}
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
                    startIcon={<AttachMoneyTwoToneIcon />}
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
