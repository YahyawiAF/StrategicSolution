import * as Yup from "yup";
import {
  useState,
  forwardRef,
  useEffect,
  useCallback,
  FC,
  useContext,
} from "react";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { Grid, Divider, Box, styled, Snackbar } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { SnackbarOrigin } from "@mui/material/Snackbar";
import { useNavigate } from "react-router-dom";

import { MethodeType, IDefaultValuesProducts as IDefaultValues } from "~/types";
import { FormInput, FormProvider } from "@components/hook-form";
import { Create } from "~/repositories/notes.service";
import { Create as CreatePatientNote } from "~/repositories/patientsNotes.service";
import { AuthContext } from "~/contexts/authContext";
import { useParams } from "react-router";

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

const FormInputList = [{ name: "Note", field: "note", type: "" }];

const NoteForm: FC<any> = ({ notes, pagination, onClose, onFetchData }) => {
  const [state, setState] = useState<State>({
    open: false,
    vertical: "top",
    horizontal: "right",
  });

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const { id } = useParams();

  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const handleOpen = useCallback(() => {
    setState({ ...state, open: true });
  }, []);

  const DEFAULT_VALUES: any = {
    note: "",
  };

  const RegisterSchema = Yup.object().shape({
    note: Yup.string().required("Name is required"),
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
    async (note: IDefaultValues) => {
      reset(note);
    },
    [reset]
  );

  useEffect(() => {
    if (notes) {
      resetAsyncForm(notes as unknown as IDefaultValues);
    } else {
      resetAsyncForm(DEFAULT_VALUES as unknown as IDefaultValues);
    }
  }, [notes]);

  console.log("notes", notes);
  // console.log("id", id);

  const onSubmit = useCallback(
    async (data: IDefaultValues) => {
      await Create({
        ...data,
        createdBy: user.id,
      }).then(
        async response => {
          // onOpenMenu();
          await CreatePatientNote({
            ...data,
            createdBy: user.id,
            patientid: id,
            noteid: 5,
          }).then(
            async () => {
              // onOpenMenu();
              onFetchData(pagination);
            },
            (error: any) => {
              console.log("error", error);
            }
          );
          onFetchData(pagination);
        },
        (error: any) => {
          console.log("error", error);
        }
      );
    },
    [handleOpen, Create, onFetchData]
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
        <Box>
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
        </Box>
      </FormProvider>
    </>
  );
};

export default NoteForm;
