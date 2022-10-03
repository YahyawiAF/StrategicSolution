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
  IDefaultValuesProducts as IDefaultValues,
  IPropsproductForm,
} from "~/types";
import {
  FormProvider,
  RHFTextField,
  RHSelectDropDown,
} from "@components/hook-form";
import { Create, Modify } from "~/repositories/product.service";

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
  { name: "Name", type: "" },
  { name: "SKU", type: "" },
  { name: "Type", type: "" },
  { name: "ListPrice", type: "" },
];

const DEFAULT_VALUES: IDefaultValues = {
  ProductCategoryID: 0,
  Name: "",
  Sales_Description: "",
  SKU: "",
  Type: 0,
  SalesPriceRate: "",
  IncomeAccount: 1,
  ExpenseAccount: 1,
  InventoryAssetAccount: 1,
  PurchaseCost: 0,
  QuantityAsOfDate: new Date(),
  ListPrice: 0,
  GP_1: 0,
  Discount_10: 0,
  GP_2: 0,
  Discount_20: 0,
  GP_3: 0,
};

const list: { [key: string]: string } = {
  IncomeAccount: "Accounts",
  ExpenseAccount: "Accounts",
  InventoryAssetAccount: "Accounts",
  ProductCategoryID: "ProductCategory",
};

const productForm: FC<IPropsproductForm> = ({ product, id, listForienKey }) => {
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
    Name: Yup.string().required("Name required"),
    SKU: Yup.string().required("SKU name required"),
    Type: Yup.number().required("Type name required"),
    ListPrice: Yup.number().required("List price name required"),
    ProductCategoryID: Yup.number().required("ProductCategoryID required"),
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
    async (product: IDefaultValues) => {
      reset(product);
    },
    [reset, product]
  );

  useEffect(() => {
    if (product) {
      resetAsyncForm(product as unknown as IDefaultValues);
      reset(product);
    }
  }, [product]);

  const onSubmit = useCallback(
    async (data: IDefaultValues) => {
      if (id) {
        Modify(id, data).then(
          async () => {
            navigate(`/products/`);
            handleOpen();
          },
          (error: any) => {
            console.log("error", error);
          }
        );
      } else {
        await Create(data).then(
          async () => {
            handleOpen();
            navigate(`/products/`);
          },
          (error: any) => {
            console.log("error", error);
          }
        );
      }
    },
    [id, handleOpen, Modify, Create]
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
          {Object.keys(list as any).map((key, index) => {
            return (
              Boolean(listForienKey[list[key]]) && (
                <Grid key={index} item xs={12} md={6} lg={6}>
                  <RHSelectDropDown
                    list={listForienKey[list[key]]}
                    key={index}
                    name={key}
                    label={key}
                  />
                </Grid>
              )
            );
          })}
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

export default productForm;
