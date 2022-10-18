import * as Yup from "yup";
import { useState, forwardRef, useEffect, useCallback, FC } from "react";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { Grid, Divider, Box, styled, Snackbar } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { SnackbarOrigin } from "@mui/material/Snackbar";
import { useNavigate } from "react-router-dom";

import {
  MethodeType,
  IPropsproductForm,
  IDefaultValuesProducts as IDefaultValues,
} from "~/types";
import {
  FormInput,
  FormProvider,
  RHFTextField,
  RHSelectDropDown,
} from "@components/hook-form";
import { Create, Modify } from "~/repositories/patientInsurance.servise";

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

const StyledInput = styled(FormInput)(
  ({ theme }) => `
      && {
        background: #FFF;
      }
  `
);

const FormInputList = [
  { name: "Insurance Name", field: "insurancename", type: "" },
  { name: "Email", field: "email", type: "" },
  { name: "Contact Name", field: "contactname", type: "" },
  { name: "City", field: "city", type: "" },
  { name: "State", field: "state", type: "" },
  { name: "Phone Number", field: "phone", type: "" },
];

const list: { [key: string]: string } = {
  IncomeAccount: "Accounts",
  ExpenseAccount: "Accounts",
  InventoryAssetAccount: "Accounts",
  ProductCategoryID: "ProductCategory",
};

const InsuranceForm: FC<any> = ({
  id,
  insurance,
  pagination,
  onClose,
  onFetchData,
}) => {
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

  const DEFAULT_VALUES: IDefaultValues = {
    insurancename: "",
    email: "",
    contactname: "",
    city: "",
    state: "",
    phone: "",
  };

  const RegisterSchema = Yup.object().shape({
    insurancename: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required"),
    contactname: Yup.string().required("Contact name required"),
    city: Yup.string().required("city is required"),
    state: Yup.string().required("State required"),
    phone: Yup.string().required("Phone Number is required"),
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
    async (insurance: IDefaultValues) => {
      reset(insurance);
    },
    [reset]
  );

  useEffect(() => {
    if (insurance) {
      resetAsyncForm(insurance as unknown as IDefaultValues);
    } else {
      resetAsyncForm(DEFAULT_VALUES as unknown as IDefaultValues);
    }
  }, [insurance]);

  console.log("insurance", insurance);
  console.log("id", id);

  const onSubmit = useCallback(
    async (data: IDefaultValues) => {
      if (id) {
        Modify(id, {
          ...data,
          adjustername: "test",
          address: "test",
          address1: "test",
          zip: "",
          fax: "",
          contactphone: "",
        }).then(
          async () => {
            // onOpenMenu();
            onFetchData(pagination);
          },
          (error: any) => {
            console.log("error", error);
          }
        );
      } else {
        await Create({
          ...data,
          adjustername: "test",
          address: "test",
          address1: "test",
          zip: "",
          fax: "",
          contactphone: "",
        }).then(
          async () => {
            // onOpenMenu();
            onFetchData(pagination);
          },
          (error: any) => {
            console.log("error", error);
          }
        );
      }
    },
    [id, handleOpen, Modify, Create, onFetchData]
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
            <Grid key={index} item>
              <StyledInput
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
          justifyContent="space-between"
        >
          <SaveButton
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Save
          </SaveButton>
          <CancelButton
            onClick={() => onClose()}
            size="large"
            type="reset"
            variant="contained"
          >
            Cancel
          </CancelButton>
        </Box>
      </FormProvider>
    </>
  );
};

export default InsuranceForm;
