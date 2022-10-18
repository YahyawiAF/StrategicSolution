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
  Card,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { SnackbarOrigin } from "@mui/material/Snackbar";

import { IDefaultValuesProducts, MethodeType } from "~/types";
import {
  FormInput,
  FormProvider,
  RHFTextInputLabel,
} from "@components/hook-form";
import { Create, Modify } from "~/repositories/patients.servise";

export const DEFAULT_PROFILE_VALUES = {
  firstname: "",
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

const StyledInput = styled(FormInput)(
  ({ theme }) => `
    && {
      margin-top: 0 !important;
      height: 25px;
    }
`
);

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
  edit: boolean;
  onFetchData: (id: string) => void;
}

const ProfileForm: FC<PatientProfileProps> = ({
  patient,
  edit,
  onFetchData,
}) => {
  const [state, setState] = useState<State>({
    open: false,
    vertical: "top",
    horizontal: "right",
  });

  const FormInputProfileList = [
    {
      title: "First Name",
      content: `${patient?.firstname}`,
      name: "firstname",
    },
    {
      title: "Date Identifier",
      content: `${patient?.dateofbirth}`,
      name: "dateofbirth",
    },
    { title: "SSN", content: `${patient?.ssn}`, name: "ssn" },
    {
      title: "Middle Name",
      content: `${patient?.middlename}`,
      name: "middlename",
    },
    { title: "Adress 1", content: `${patient?.address1}`, name: "address1" },
    {
      title: "Patient Number",
      content: `${patient?.patientnumber}`,
      name: "patientnumber",
    },
    { title: "Last Name", content: `${patient?.lastname}`, name: "lastname" },
    { title: "Adress 2", content: `${patient?.address2}`, name: "address2" },
    { title: "Suffix #", content: `${patient?.suffix}`, name: "suffix" },
    { title: "Deseased", content: "No", name: "" },
    { title: "Servise Line", content: "VA", name: "" },
  ];
  const Column2 = [
    { title: "Episode", content: "82683029", name: "" },
    { title: "DOB", content: `${patient?.dateofbirth}`, name: "dateofbirth" },
    {
      title: "Admit Date",
      content: `${patient?.createdUtc}`,
      name: "dateofbirth",
    },
    { title: "MRN", content: "283838992", name: "" },
    { title: "SS #", content: "#####", name: "" },
    { title: "Discharge", content: "29/12/2022", name: "" },
    { title: "Status", content: "VA ID", name: "" },
    { title: "Guaranto", content: "#####", name: "" },
    { title: "Date Rec'd", content: "12/02/2023", name: "" },
    { title: "Verified", content: "No", name: "" },
    { title: "Date", content: "#####", name: "" },
  ];
  const Column3 = [
    { title: "Date Returne", content: "#####", name: "" },
    { title: "Accedent Class", content: "Other", name: "" },
    { title: "Location", content: `${patient?.state}`, name: "state" },
    { title: "Return Code", content: "None", name: "" },
    { title: "Total Charges", content: "526.22 $", name: "" },
    { title: "City", content: `${patient?.city}`, name: "city" },
    { title: "Injury Sustained", content: "#####", name: "" },
    { title: "Current Balance", content: "356.22 $", name: "" },
    { title: "Country", content: "#####", name: "" },
    { title: "Patient Type", content: "Test", name: "" },
    { title: "Accedent Info", content: "Link", name: "" },
  ];

  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const handleOpen = useCallback(() => {
    setState({ ...state, open: true });
  }, []);

  const RegisterSchema = Yup.object().shape({
    // firstname: Yup.string().required("title required"),
    // email: Yup.string().required("Email required"),
    // country: Yup.string().required("Country required"),
    // state: Yup.string().required("State required"),
    // city: Yup.string().required("City required"),
    // zipCode: Yup.string().required("ZipCode required"),
    // company: Yup.string().required("Company required"),
    // role: Yup.string().required("Role required"),
  });

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues: DEFAULT_PROFILE_VALUES,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  const resetAsyncForm = useCallback(
    async (patient: any) => {
      reset(patient);
    },
    [reset, patient]
  );

  useEffect(() => {
    if (patient) {
      resetAsyncForm(patient as unknown as any);
    } else {
      resetAsyncForm(DEFAULT_PROFILE_VALUES as unknown as any);
    }
  }, [patient]);

  const onSubmit = useCallback(
    async (data: any) => {
      Modify(patient.id, data).then(
        async () => {
          handleOpen();
          onFetchData(patient.id);
        },
        error => {
          console.log("error", error);
        }
      );
    },
    [patient, handleOpen]
  );

  console.log("FormInputProfileList", FormInputProfileList);
  console.log("Column2", Column2);
  console.log("methods", methods.formState);

  return (
    <>
      <CardStyled>
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
          <Box>
            <FormContainer>
              {FormInputProfileList.map((field, index) => (
                <>
                  <Box display="flex" justifyContent="space-between">
                    <StyledTitle key={field.title}>
                      {`${field.title}: `}{" "}
                    </StyledTitle>
                    {edit ? (
                      <StyledInput key={field.title} name={field.name} />
                    ) : (
                      <StyledTitle key={field.title}>
                        {`${field.content}`}{" "}
                      </StyledTitle>
                    )}
                  </Box>
                </>
              ))}
            </FormContainer>
            <Divider orientation="vertical" />
            <FormContainer>
              {Column2.map((field, index) => (
                <>
                  <Box display="flex" justifyContent="space-between">
                    <StyledTitle key={field.title}>
                      {`${field.title}: `}{" "}
                    </StyledTitle>
                    {edit ? (
                      <StyledInput key={index} name={field.name} />
                    ) : (
                      <StyledTitle>{`${field.content}`} </StyledTitle>
                    )}
                  </Box>
                </>
              ))}
            </FormContainer>
            <Divider orientation="vertical" />
            <FormContainer>
              {Column3.map((field, index) => (
                <>
                  <Box display="flex" justifyContent="space-between">
                    <StyledTitle key={field.title}>
                      {`${field.title}: `}{" "}
                    </StyledTitle>
                    {edit ? (
                      <StyledInput key={field.name} name={field.name} />
                    ) : (
                      <StyledTitle key={field.name}>
                        {`${field.content}`}{" "}
                      </StyledTitle>
                    )}
                  </Box>
                </>
              ))}
            </FormContainer>
          </Box>
          {edit ? (
            <SaveButton
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Save
            </SaveButton>
          ) : (
            <>{null}</>
          )}
        </FormProvider>
      </CardStyled>
    </>
  );
};

const CardStyled = styled(Box)(
  () => `
      && {
        height: 100%;
        display: flex;
        box-shadow: unset;
        border-radius:0;
        padding: 10px;

        > form {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: end;
          gap: 10px;
          > div {
            width: 100%;
            display: flex;
            gap: 10px;
          }
        }
      }
  `
);

const StyledHeader = styled(Box)(
  () => `
      && {
        display: flex;
        flex-direction: column;
        background: #D5D8EF;
        padding: 10px;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        margin-bottom: 10px;
      }
  `
);

const FormContainer = styled(Box)(
  () => `
      && {
        display: flex;
        flex-direction: column;
        width: 33%;
        gap: 5px;
      }
  `
);

const StyledTitle = styled(Typography)(
  () => `
      && {
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;

        color: #000000;
      }
  `
);

export default ProfileForm;
