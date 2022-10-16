/* eslint-disable prettier/prettier */
import * as Yup from "yup";
import React, { FC, useCallback, useMemo, useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  Snackbar,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { If, Then, Else } from "react-if";
import Iconify from "@components/Iconify";
import { FormProvider, RHFTextField, RHFCheckbox } from "@components/hook-form";
import { MethodeType } from "~/types";
import { useAuth } from "~/contexts/authContext";
import { loginService } from "~/repositories/auth.service";

import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { SnackbarOrigin } from "@mui/material/Snackbar";
import SuspenseLoader from "~/components/SuspenseLoader";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export interface State extends SnackbarOrigin {
  open: boolean;
}

const LoginForm: FC = () => {
  const { login } = useAuth();
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: "top",
    horizontal: "right",
  });
  const { vertical, horizontal, open } = state;

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const LoginSchema = Yup.object().shape({
    userName: Yup.string().required("UserName is required"),
    password: Yup.string().required("Password is required"),
  });

  const defaultValues = {
    userName: "",
    password: "",
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleOpen = () => {
    setState({ ...state, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const onSubmit = useCallback(
    async (data: { userName: string; password: string }) => {
      setIsLoading(true);
      loginService(data.userName, data.password).then(
        async data => {
          await login(data);
        },
        error => {
          handleOpen();
          console.log("error", error);
        }
      );
      setIsLoading(false);
    },
    [setIsLoading]
  );

  const LoginButton = useMemo(() => {
    return (
      <If condition={isSubmitting}>
        <Then>
          <SuspenseLoader />
        </Then>
        <Else>
          <LoadingButton
            fullWidth
            sx={{ borderRadius: 1, color: "#FFF" }}
            size="large"
            type="submit"
            variant="contained"
            loading={isLoading}
          >
            Sign in
          </LoadingButton>
        </Else>
      </If>
    );
  }, [isLoading]);

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert severity="error">Enter your credentials to continue</Alert>
      </Snackbar>

      <FormProvider
        methods={methods as unknown as MethodeType}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack spacing={3} mb={3}>
          <RHFTextField
            type={"text"}
            name="userName"
            label="Email Address / Username *"
            // placeholder="Email Address / Username *"
          />
          <RHFTextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    <Iconify
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <RHFCheckbox name="remember" label="Remember for 30 days" />
          <Link variant="subtitle2" underline="hover">
            Forgot password?
          </Link>
        </Stack>
        {LoginButton}
        <Typography textAlign="center" paddingTop="20px">
          This virsion is 1.0.0.3 10/16/2022
        </Typography>
      </FormProvider>
    </>
  );
};

export default LoginForm;
