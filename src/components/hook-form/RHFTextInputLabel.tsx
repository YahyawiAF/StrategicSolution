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

type IRHFTextField = {
  name: string;
  label: string;
} & InputProps;

const RHFTextField: FC<IRHFTextField> = ({ name, label, ...other }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth {...field} variant="standard">
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
  [".MuiInputBase-input"]: {
    padding: "10px 0 15px 10px",
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
  fontStyle: "normal",
  fontWeight: 400,
  marginBottom: 12,
  fontSize: theme.typography.pxToRem(18),
  lineHeight: theme.typography.pxToRem(19),
  color: "#01061C",
  textTransform: "capitalize",
  [".MuiInputLabel-root.Mui-focused"]: {
    color: "#01061C !important",
  },
}));

export default RHFTextField;
