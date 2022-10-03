import { styled, Typography, Box, Card, Divider } from "@mui/material";
import { ReactNode, memo } from "react";

const SubPage = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}): JSX.Element => {
  return (
    <CardStyled>
      <Box flex={1} p={2}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Typography variant="h5" color="text.secondary">
              {title}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box flex={1} p={2}>
        {children}
      </Box>
    </CardStyled>
  );
};

const CardStyled = styled(Card)(
  () => `
    && {
      box-shadow: unset;
      border-radius:0;
    }
`
);

export default memo(SubPage);
