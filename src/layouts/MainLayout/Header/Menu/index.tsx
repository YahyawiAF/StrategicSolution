import { Box } from "@mui/material";
import { useRef, useState } from "react";
import { styled } from "@mui/material/styles";

const ListWrapper = styled(Box)(
  ({ theme }) => `
        .MuiTouchRipple-root {
            display: none;
        }
        
        .MuiListItem-root {
            transition: ${theme.transitions.create(["color", "fill"])};
            
            &.MuiListItem-indicators {
                padding: ${theme.spacing(0, 0)};
            
                .MuiListItemText-root {
                    .MuiTypography-root {
                        &:before {
                            height: 4px;
                            opacity: 0;
                            visibility: hidden;
                            display: block;
                            position: absolute;
                            bottom: -10px;
                            transition: all .2s;
                            border-radius: ${theme.general.borderRadiusLg};
                            content: "";
                        }
                    }
                }

                &.active,
                &:active,
                &:hover {
                
                    background: transparent;
                
                    .MuiListItemText-root {
                        .MuiTypography-root {
                            &:before {
                                opacity: 1;
                                visibility: visible;
                                bottom: 0px;
                            }
                        }
                    }
                }
            }
        }
`
);

function HeaderMenu() {
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <>
      <ListWrapper
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
        }}
      >
        {/* <List disablePadding component={Box} display="flex">
          <ListItem
            classes={{ root: "MuiListItem-indicators" }}
            button
            ref={ref}
            onClick={handleOpen}
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary={
                <Box display="flex" alignItems="start">
                  <SearchSection />
                </Box>
              }
            />
          </ListItem>
        </List> */}
      </ListWrapper>
      {/* <SearchSection /> */}
    </>
  );
}

export default HeaderMenu;
