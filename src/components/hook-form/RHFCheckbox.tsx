// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { Checkbox, FormControlLabel } from "@mui/material";

export function RHFCheckbox({
  name,
  label,
  ...other
}: {
  name: string;
  label: string;
}) {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      label={label}
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => <Checkbox {...field} checked={field.value} />}
        />
      }
      {...other}
    />
  );
}

// export function RHFMultiCheckbox({
//   name,
//   options,
//   ...other
// }: {
//   name: string;
//   options: Array<T>;
// }) {
//   const { control } = useFormContext();

//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field }) => {
//         const onSelected = option =>
//           field.value.includes(option)
//             ? field.value.filter(value => value !== option)
//             : [...field.value, option];

//         return (
//           <FormGroup>
//             {options.map(option => (
//               <FormControlLabel
//                 key={option.value}
//                 control={
//                   <Checkbox
//                     checked={field.value.includes(option.value)}
//                     onChange={() => field.onChange(onSelected(option.value))}
//                   />
//                 }
//                 label={option.label}
//                 {...other}
//               />
//             ))}
//           </FormGroup>
//         );
//       }}
//     />
//   );
// }
