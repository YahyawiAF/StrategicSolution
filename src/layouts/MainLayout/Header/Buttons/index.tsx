import { Box } from "@mui/material";
import HeaderSearch from "./Search";
import HeaderNotifications from "./Notifications";
import HeaderMessages from "./Messages";

function HeaderButtons() {
  return (
    <Box sx={{ mr: 1 }}>
      <HeaderSearch />
      <Box sx={{ mx: 0.5 }} component="span">
        <HeaderNotifications />
      </Box>
      <HeaderMessages />
    </Box>
  );
}

export default HeaderButtons;
