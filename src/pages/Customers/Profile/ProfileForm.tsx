import * as Yup from "yup";
import { useState, forwardRef, useEffect, useCallback, FC } from "react";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import {
  Grid,
  Divider,
  Box,
  styled,
  Snackbar,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { SnackbarOrigin } from "@mui/material/Snackbar";

import { MethodeType } from "~/types";
import { FormProvider, RHFTextInputLabel } from "@components/hook-form";
import { Create, Modify } from "~/repositories/product.service";

export const DEFAULT_PROFILE_VALUES = {
  title: "",
  email: "",
  country: "",
  state: "",
  city: "",
  zipCode: "",
  company: "",
  role: "",
};

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export interface State extends SnackbarOrigin {
  open: boolean;
}

const SaveButton = styled(LoadingButton)(
  ({ theme }) => `
    && {
      background: #1CB7EC;
      width:${theme.typography.pxToRem(200)};
      padding:${theme.typography.pxToRem(12)};
    }
`
);

interface PatientProfileProps {
  patient: any;
}

const ProfileForm: FC<PatientProfileProps> = ({ patient }) => {
  const [state, setState] = useState<State>({
    open: false,
    vertical: "top",
    horizontal: "right",
  });

  const FormInputProfileList = [
    { title: "First Name", content: `${patient?.firstname}` },
    { title: "Date Identifier", content: `${patient?.dateofbirth}` },
    { title: "SSN", content: `${patient?.ssn}` },
    { title: "Middle Name", content: `${patient?.middlename}` },
    { title: "Adress 1", content: `${patient?.address1}` },
    { title: "Patient Number", content: `${patient?.patientnumber}` },
    { title: "Last Name", content: `${patient?.lastname}` },
    { title: "Adress 2", content: `${patient?.address2}` },
    { title: "Suffix #", content: `${patient?.suffix}` },
    { title: "Deseased", content: "No" },
    { title: "Servise Line", content: "VA" },
    { title: "Episode", content: "82683029" },
    { title: "DOB", content: `${patient?.dateofbirth}` },
    { title: "Admit Date", content: `${patient?.createdUtc}` },
    { title: "MRN", content: "283838992" },
    { title: "SS #", content: "#####" },
    { title: "Discharge", content: "29/12/2022" },
    { title: "Status", content: "VA ID" },
    { title: "Guaranto", content: "#####" },
    { title: "Date Rec'd", content: "12/02/2023" },
    { title: "Verified", content: "No" },
    { title: "Date", content: "#####" },
    { title: "Date Returne", content: "#####" },
    { title: "Accedent Class", content: "Other" },
    { title: "Location", content: `${patient?.state}` },
    { title: "Return Code", content: "None" },
    { title: "Total Charges", content: "526.22 $" },
    { title: "City", content: `${patient?.city}` },
    { title: "Injury Sustained", content: "#####" },
    { title: "Current Balance", content: "356.22 $" },
    { title: "Country", content: "#####" },
    { title: "Patient Type", content: "Test" },
    { title: "Accedent Info", content: "Link" },
  ];

  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const handleOpen = useCallback(() => {
    setState({ ...state, open: true });
  }, []);

  const RegisterSchema = Yup.object().shape({
    title: Yup.string().required("title required"),
    email: Yup.string().required("Email required"),
    country: Yup.string().required("Country required"),
    state: Yup.string().required("State required"),
    city: Yup.string().required("City required"),
    zipCode: Yup.string().required("ZipCode required"),
    company: Yup.string().required("Company required"),
    role: Yup.string().required("Role required"),
  });

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues: DEFAULT_PROFILE_VALUES,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = useCallback(async () => {
    console.log("data");
  }, [handleOpen, Modify, Create]);

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert severity="success">Saved!</Alert>
      </Snackbar>
      <FormProvider
        methods={methods as unknown as MethodeType}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid
          sx={{ p: 2, pb: 6 }}
          container
          spacing={2}
          // direction="row"
          justifyContent="space-between"
          alignItems="self-start"
        >
          {FormInputProfileList.map((field, index) => (
            <>
              <Grid
                columns={{ xs: 1, sm: 2, md: 3 }}
                key={index}
                sx={{ pb: 1 }}
                item
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
                width="15%"
              >
                <Box display="flex" gap="24px">
                  <Typography variant="h6">{`${field.title}: `} </Typography>
                </Box>
              </Grid>
              <Grid
                columns={{ xs: 1, sm: 2, md: 3 }}
                key={`${index} 2`}
                sx={{ pb: 1 }}
                item
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
                width="15%"
              >
                <Box display="flex" gap="24px" key={index}>
                  <Typography>{`${field.content}`} </Typography>
                </Box>
              </Grid>
            </>
          ))}
        </Grid>
      </FormProvider>
    </>
  );
};

export default ProfileForm;
