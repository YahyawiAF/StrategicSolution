import { FC } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";

type IRHFTextField = {
  name: string;
} & TextFieldProps;

const RHFTextField: FC<IRHFTextField> = ({ name, ...other }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          // variant="filled"
          fullWidth
          value={
            typeof field.value === "number" && field.value === 0
              ? ""
              : field.value
          }
          error={!!error}
          helperText={error?.message}
          {...other}
        />
      )}
    />
  );
};

export default RHFTextField;
