import { useState, forwardRef } from "react";
import { Snackbar } from "@mui/material";

import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { SnackbarOrigin } from "@mui/material/Snackbar";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export interface State extends SnackbarOrigin {
  open: boolean;
}

export default function RegisterForm() {
  const [state, setState] = useState<State>({
    open: false,
    vertical: "top",
    horizontal: "right",
  });

  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const handleOpen = () => {
    setState({ ...state, open: true });
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handleClose}
      key={vertical + horizontal}
    >
      <Alert severity="error">Please check your credentials!</Alert>
    </Snackbar>
  );
}
