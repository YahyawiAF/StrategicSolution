import { useContext, useRef, useState } from "react";

import {
  Stack,
  Tooltip,
  Box,
  List,
  styled,
  Button,
  ListItem,
  Divider,
  Popover,
  Typography,
} from "@mui/material";
import { NavLink as RouterLink, useNavigate } from "react-router-dom";
import { SidebarContext } from "~/contexts/SidebarContext";

import { ReactComponent as ProfileIcon } from "~/assets/icons/profile.svg";
import { ReactComponent as HeartIcon } from "~/assets/icons/heart.svg";
import { ReactComponent as ReportsIcon } from "~/assets/icons/reports.svg";
import { ReactComponent as BillingIcon } from "~/assets/icons/billing.svg";
import { ReactComponent as UmbrellaIcon } from "~/assets/icons/umbrella.svg";
import SettingsIcon from "@mui/icons-material/Settings";

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
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };
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
                    to="/patient"
                    startIcon={<ProfileIcon />}
                  />
                </Tooltip>
              </ListItem>
              <ListItem component="div">
                <Tooltip placement="right" title="Insurance" arrow>
                  <Button
                    disableRipple
                    component={RouterLink}
                    to="/insurance"
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
              <ListItem component="div">
                <Tooltip placement="right" title="Settings" arrow>
                  <Button
                    ref={ref}
                    onClick={handleOpen}
                    disableRipple
                    startIcon={<SettingsIcon />}
                  />
                </Tooltip>
                <Popover
                  anchorEl={ref.current}
                  onClose={handleClose}
                  open={isOpen}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  {/* <Box
                    sx={{ p: 2 }}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <StyledTitle>Notifications</StyledTitle>
                  </Box>
                  <Divider /> */}
                  <List sx={{ p: 0 }}>
                    <ListItem
                      sx={{
                        p: 2,
                      }}
                    >
                      <Box flex="1">
                        <Box display="flex" justifyContent="space-between">
                          <StyledTitle
                            onClick={() => {
                              navigate("/patient");
                              handleClose();
                            }}
                          >
                            Patient
                          </StyledTitle>
                        </Box>
                      </Box>
                    </ListItem>
                    <Divider />
                    <ListItem
                      sx={{
                        p: 2,
                      }}
                    >
                      <Box flex="1">
                        <Box display="flex" justifyContent="space-between">
                          <StyledTitle
                            onClick={() => {
                              navigate("/insurance");
                              handleClose();
                            }}
                          >
                            Insurance
                          </StyledTitle>
                        </Box>
                      </Box>
                    </ListItem>
                  </List>
                </Popover>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>
      </MenuWrapper>
    </>
  );
}

const StyledTitle = styled(Typography)(
  () => `
    && {
      font-style: normal;
      font-weight: 600;
      font-size: 12px;
      line-height: 14px;
      cursor: pointer;  
    }
`
);

export default SidebarMenu;
