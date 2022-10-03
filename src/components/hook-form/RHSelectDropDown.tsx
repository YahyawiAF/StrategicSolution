import { FC } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TextField, TextFieldProps, Select, MenuItem } from "@mui/material";

type IRHFTextField = {
  name: string;
  list: any;
} & TextFieldProps;

const RHFTextField: FC<IRHFTextField> = ({ name, list, ...other }) => {
  const { control } = useFormContext();
  console.log("RHFTextField", list);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          select
          {...field}
          fullWidth
          value={
            typeof field.value === "number" && field.value === 0
              ? ""
              : field.value
          }
          error={!!error}
          helperText={error?.message}
          {...other}
        >
          {list.map((item: Record<string, any>, index: number) => (
            <MenuItem key={index} value={item?.id}>
              {item.name}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};

export default RHFTextField;
