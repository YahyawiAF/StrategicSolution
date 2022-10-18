import * as Yup from "yup";
import {
  useState,
  forwardRef,
  useEffect,
  useCallback,
  FC,
  useContext,
} from "react";
// @mui
import { Grid, Divider, Box, styled, Snackbar, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { SnackbarOrigin } from "@mui/material/Snackbar";
import { useNavigate } from "react-router-dom";

import { MethodeType, IDefaultValuesProducts as IDefaultValues } from "~/types";
import { FormInput, FormProvider } from "@components/hook-form";
import { Create } from "~/repositories/patientDocument.service";
import DropZone from "react-dropzone";
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

const DocumentForm: FC<any> = ({ notes, pagination, onClose, onFetchData }) => {
  const [state, setState] = useState<State>({
    open: false,
    vertical: "top",
    horizontal: "right",
  });

  const { id } = useParams();

  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const handleOpen = useCallback(() => {
    setState({ ...state, open: true });
  }, []);

  const handleDrop = async (acceptedFiles: File[]) => {
    // setIsLoading(true);
    // setFileNames(acceptedFiles[0].name);
    console.log("acceptedFiles", acceptedFiles[0]);
    const file = acceptedFiles[0];

    // const formData = new FormData();
    // formData.set("file", acceptedFiles[0].name);
    // formData.set("type", acceptedFiles[0].type);

    // console.log("formData", formData.get("file"));

    await Create({
      documenttype: acceptedFiles[0].type,
      patientid: id,
      documentname: acceptedFiles[0].name,
      Attachment: file,
    }).then(
      async () => {
        onFetchData(pagination);
      },
      (error: any) => {
        console.log("error", error);
      }
    );
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert severity="success">Uploaded!</Alert>
      </Snackbar>
      <Box display="flex" justifyContent="space-between" padding="10px">
        <DropZone
          onDrop={handleDrop}
          maxFiles={1}
          multiple={false}
          accept={{
            "application/pdf-msword": [".pdf"],
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <Button
                variant="contained"
                component="label"
                sx={{ height: "100%" }}
              >
                Upload File
              </Button>
            </div>
          )}
        </DropZone>
        <CancelButton
          onClick={() => onClose()}
          size="large"
          type="reset"
          variant="contained"
        >
          Cancel
        </CancelButton>
      </Box>
    </>
  );
};

export default DocumentForm;
