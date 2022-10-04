import * as Yup from "yup";
import { useState, forwardRef, useEffect, useCallback, FC } from "react";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { Grid, Divider, Box, styled, Snackbar } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import { FormProvider, RHFTextField } from "@components/hook-form";
import { MethodeType } from "~/types";
import { Create, Modify } from "~/repositories/company.service";
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
      background: #1CB7EC;
      width:${theme.typography.pxToRem(111)};
      padding:${theme.typography.pxToRem(14)};
    }
`
);

const FormInputList = [
  { name: "Customer Name", type: "" },
  { name: "Location", type: "" },
  { name: "Orders", type: "" },
  // { name: "address1", type: "" },
  // { name: "address2", type: "" },
  { name: "Registered", type: "" },
  { name: "Status", type: "" },
  // { name: "country", type: "" },
  // { name: "comments", type: "" },
  // { name: "tags", type: "" },
];
interface IDefaultValues {
  name: string;
  phone: string;
  email: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  comments: string;
  tags: string;
}
const DEFAULT_VALUES: IDefaultValues = {
  name: "",
  phone: "",
  email: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  country: "",
  comments: "",
  tags: "",
};

interface IPropscompanyForm {
  company: IDefaultValues | null;
  id?: string;
}

const companyForm: FC<IPropscompanyForm> = ({ company, id }) => {
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
    name: Yup.string().required("phone name required"),
    phone: Yup.string().required("phone name required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
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
    async (company: IDefaultValues) => {
      reset(company);
    },
    [reset, company]
  );

  useEffect(() => {
    if (company) {
      resetAsyncForm(company as unknown as IDefaultValues);
      reset(company);
    }
  }, [company]);

  const onSubmit = useCallback(
    async (data: IDefaultValues) => {
      if (id) {
        Modify(id, data).then(
          async () => {
            navigate(`/dashboard/`);
            handleOpen();
          },
          error => {
            console.log("error", error);
          }
        );
      } else {
        await Create(data).then(
          async () => {
            handleOpen();
            navigate(`/dashboard/`);
          },
          error => {
            console.log("error", error);
          }
        );
      }
    },
    [id, handleOpen]
  );

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
            <Grid key={index} item xs={12} md={6} lg={6}>
              <RHFTextField key={index} name={field.name} label={field.name} />
            </Grid>
          ))}
        </Grid>
        <Divider />
        <Box display="flex" flex={1} p={2} justifyContent="flex-end">
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
