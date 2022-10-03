import { useState } from "react";

// material-ui
import { useTheme, styled } from "@mui/material/styles";
import {
  Avatar,
  Box,
  ButtonBase,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";

// assets
import { IconAdjustmentsHorizontal, IconSearch } from "@tabler/icons";
import { shouldForwardProp } from "@mui/system";

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(
  ({ theme }) => ({
    width: 434,
    marginLeft: 16,
    paddingLeft: 16,
    paddingRight: 16,
    "& input": {
      background: "transparent !important",
      paddingLeft: "4px !important",
    },
    [theme.breakpoints.down("lg")]: {
      width: 250,
    },
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginLeft: 4,
      background: "#fff",
    },
  })
);

const HeaderAvatarStyle = styled(Avatar, { shouldForwardProp })(
  ({ theme }) => ({
    // ...theme.typography.commonAvatar,
    // ...theme.typography.mediumAvatar,
    background: theme.palette.secondary.light,
    color: theme.palette.secondary.dark,
    "&:hover": {
      background: theme.palette.secondary.dark,
      color: theme.palette.secondary.light,
    },
  })
);

// ==============================|| SEARCH INPUT ||============================== //

const SearchSection = () => {
  const theme = useTheme();
  const [value, setValue] = useState("");

  return (
    <>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <OutlineInputStyle
          id="input-search-header"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Search"
          startAdornment={
            <InputAdornment position="start">
              <IconSearch
                stroke={1.5}
                size="1rem"
                color={theme.palette.grey[500]}
              />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <ButtonBase sx={{ borderRadius: "12px" }}>
                <HeaderAvatarStyle variant="rounded">
                  <IconAdjustmentsHorizontal stroke={1.5} size="1.3rem" />
                </HeaderAvatarStyle>
              </ButtonBase>
            </InputAdornment>
          }
          aria-describedby="search-helper-text"
          inputProps={{ "aria-label": "weight" }}
        />
      </Box>
    </>
  );
};

export default SearchSection;
