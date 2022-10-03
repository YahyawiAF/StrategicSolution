import { Icon } from "@iconify/react";
import { Box, SxProps, Theme } from "@mui/material";
import { FC } from "react";

type IIconnifyProps = {
  icon: string;
  sx?: SxProps<Theme>;
} & any;

const Iconify: FC<IIconnifyProps> = ({ icon, sx, ...others }) => {
  return <Box component={Icon} icon={icon} sx={{ ...sx }} {...others} />;
};

export default Iconify;
