import * as Yup from "yup";
import { useState, forwardRef, useEffect, useCallback, FC } from "react";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { Grid, Divider, Box, styled, Snackbar } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import { FormProvider, FormInput } from "@components/hook-form";
import { MethodeType } from "~/types";
import { Create, Modify } from "~/repositories/patients.servise";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { SnackbarOrigin } from "@mui/material/Snackbar";
import { useNavigate } from "react-router-dom";

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
      background: #282F6C;
      width:${theme.typography.pxToRem(111)};
      padding:${theme.typography.pxToRem(14)};
    }
`
);

const CancelButton = styled(LoadingButton)(
  ({ theme }) => `
    && {
      background: #DADADA;
      width:${theme.typography.pxToRem(111)};
      padding:${theme.typography.pxToRem(14)};
    }
`
);

const FormInputList = [
  { name: "Patient Name", field: "firstname", type: "" },
  { name: "Last Name", field: "lastname", type: "" },
  { name: "Date Of Birth", field: "dateofbirth", type: "" },
  { name: "City", field: "city", type: "" },
  { name: "State", field: "state", type: "" },
  { name: "Phone Number", field: "patientnumber", type: "" },
];
interface IDefaultValues {
  firstname: string;
  lastname: string;
  patientnumber: string;
  city: string;
  state: string;
}
const DEFAULT_VALUES: IDefaultValues = {
  firstname: "",
  lastname: "",
  patientnumber: "",
  city: "",
  state: "",
};

interface IPropscompanyForm {
  patient: any | null;
  id?: string;
  onOpenMenu: (record?: any) => void;
}

const companyForm: FC<IPropscompanyForm> = ({ patient, id, onOpenMenu }) => {
  const [state, setState] = useState<State>({
    open: false,
    vertical: "top",
    horizontal: "right",
  });

  const navigate = useNavigate();

  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const handleOpen = useCallback(() => {
    setState({ ...state, open: true });
  }, []);

  const RegisterSchema = Yup.object().shape({
    firstname: Yup.string().required("Name required"),
    patientnumber: Yup.string().required("phone number required"),
    // email: Yup.string()
    //   .email("Email must be a valid email address")
    //   .required("Email is required"),
    // address1: Yup.string().required("address1 name required"),
    // address2: Yup.string().required("address2 name required"),
    city: Yup.string().required("city name required"),
    state: Yup.string().required("state name required"),
    // country: Yup.string().required("country name required"),
    // comments: Yup.string(),
    // tags: Yup.string(),
  });

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  const resetAsyncForm = useCallback(
    async (patient: IDefaultValues) => {
      reset(patient);
    },
    [reset, patient]
  );

  useEffect(() => {
    if (patient) {
      resetAsyncForm(patient as unknown as IDefaultValues);
    } else {
      resetAsyncForm(DEFAULT_VALUES as unknown as IDefaultValues);
    }
  }, [patient]);

  const onSubmit = useCallback(
    async (data: IDefaultValues) => {
      if (patient) {
        Modify(patient.id, data).then(
          async () => {
            navigate(`/patient/`);
            handleOpen();
          },
          error => {
            console.log("error", error);
          }
        );
      } else {
        await Create({ ...data, dateofbirth: new Date(), suffix: "test" }).then(
          async () => {
            handleOpen();
            navigate(`/patient/`);
          },
          error => {
            console.log("error", error);
          }
        );
      }
    },
    [patient, handleOpen]
  );

  console.log("patient", patient);
  console.log("state", methods.formState.errors);

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
        <Grid sx={{ pb: 3 }} container spacing={2}>
          {FormInputList.map((field, index) => (
            <Grid key={index} item>
              <FormInput
                key={index}
                name={field.field}
                label={field.name}
                placeholder={`${field.name}...`}
              />
            </Grid>
          ))}
        </Grid>
        <Divider />
        <Box
          display="flex !important"
          p="18px 0"
          gap="15px"
          justifyContent="start"
        >
          <CancelButton
            onClick={() => onOpenMenu()}
            size="large"
            type="reset"
            variant="contained"
          >
            Cancel
          </CancelButton>
          <SaveButton
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Save
          </SaveButton>
        </Box>
      </FormProvider>
    </>
  );
};

export default companyForm;
