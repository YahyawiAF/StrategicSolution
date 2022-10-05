import { FC } from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  Input,
  InputProps,
  styled,
  FormHelperText,
} from "@mui/material";

type FormInputProps = {
  name: string;
  label: string;
} & InputProps;

const FormInput: FC<FormInputProps> = ({ name, label, ...other }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl
          {...field}
          variant="standard"
          sx={{ display: "flex !important" }}
        >
          <Label shrink={true} htmlFor={name}>
            {label}
          </Label>
          <TextField disableUnderline id={name} {...other} />
          {error && (
            <FormHelperText id={name} error>
              {error?.message}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};

const TextField = styled(Input)(({ theme }) => ({
  border: "1px solid #E3E3ED",
  borderRadius: 10,
  height: "56px",
  marginTop: "24px !important",
  background: "#EAEAEA",
  [".MuiInputBase-input"]: {
    padding: "10px 0 15px 10px",
    borderRadius: 10,
    "::placeholder": {
      fontSize: theme.typography.pxToRem(12),
    },
  },
  [".MuiButtonBase-root"]: {
    padding: 0,
    backgroundColor: "unset",
    marginRight: 10,
    svg: {
      color: "#bfc1c6",
    },
  },
}));
const Label = styled(InputLabel)(({ theme }) => ({
  fontStyle: "normal !important",
  fontWeight: "400 !important",
  //   marginBottom: 12,
  fontSize: theme.typography.pxToRem(18),
  lineHeight: theme.typography.pxToRem(24),
  color: "#01061C",
  textTransform: "capitalize",
  [".MuiInputLabel-root.Mui-focused"]: {
    color: "#01061C !important",
  },
}));

export default FormInput;
