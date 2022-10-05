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
import { ReactComponent as UmbrellaIcon } from "~/assets/icons/umbrella.svg";

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
          justify-content: center;
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
            justify-content: center;
            svg {
              path {
                fill: #E3E3ED;
                opacity: 0.5;
              }
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
              border-radius: 5px;
              display: flex;
              align-items: center;
              justify-content: center;
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
                  fill: #FFF;
                  opacity: 1;
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
  return (
    <>
      <MenuWrapper>
        <List component="div">
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <Tooltip placement="right" title="Patients" arrow>
                  <Button
                    disableRipple
                    component={RouterLink}
                    to="/dashboard"
                    startIcon={<ProfileIcon />}
                  />
                </Tooltip>
              </ListItem>
              <ListItem component="div">
                <Tooltip placement="right" title="Insurance" arrow>
                  <Button
                    disableRipple
                    component={RouterLink}
                    to="/products"
                    startIcon={<UmbrellaIcon />}
                  />
                </Tooltip>
              </ListItem>
              <ListItem component="div">
                <Tooltip placement="right" title="Reports" arrow>
                  <Button
                    disableRipple
                    component={RouterLink}
                    to="/orders"
                    startIcon={<ReportsIcon />}
                  />
                </Tooltip>
              </ListItem>
              <ListItem component="div">
                <Tooltip placement="right" title="Billing" arrow>
                  <Button
                    disableRipple
                    component={RouterLink}
                    to="/pricings"
                    startIcon={<BillingIcon />}
                  />
                </Tooltip>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>
      </MenuWrapper>
    </>
  );
}

export default SidebarMenu;
