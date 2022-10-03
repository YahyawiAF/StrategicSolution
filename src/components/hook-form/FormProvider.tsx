import { FormProvider as Form } from "react-hook-form";
import { IFormProvider, MethodeType } from "~/types";
// ----------------------------------------------------------------------

import { FC } from "react";

const FormProvider: FC<IFormProvider<MethodeType>> = ({
  children,
  onSubmit,
  methods,
}): JSX.Element => {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  );
};

export default FormProvider;
