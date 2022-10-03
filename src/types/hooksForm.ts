import { UseFormReturn } from "react-hook-form";

export interface IFormData {
  [key: string]: string | boolean;
}

export interface IFormProvider<T> {
  title?: string;
  children?: JSX.Element[] | JSX.Element;
  onSubmit: () => Promise<void>;
  methods: T;
}

export interface IOnSubmit {
  (): Promise<void>;
}

export type MethodeType = UseFormReturn<Record<string, any>, any>;
