import React, { createContext, type ReactNode } from "react";
import "twin.macro";

interface FormContextType {
  form: FormHook;
}

interface FormItemContextType {
  onChange: () => void;
}

interface FormHook {}

interface Rule {}

export const FormContext = createContext<FormContextType>(
  {} as FormContextType
);
export const FormItemContext = createContext<FormItemContextType>(
  {} as FormItemContextType
);

export const Form = ({
  children,
  form,
}: {
  children?: ReactNode;
  form: FormHook;
}) => {
  return (
    <form>
      <FormContext.Provider
        value={{
          form,
        }}
      >
        {children}
      </FormContext.Provider>
    </form>
  );
};

const FormItem = ({
  name,
  rules,
  children,
}: {
  name: string;
  rules?: Rule;
  children?: ReactNode;
}) => {
  return (
    <FormItemContext.Provider value={{ on }}>
      <div tw="mt-10 mb-10">{children}</div>
    </FormItemContext.Provider>
  );
};

const useForm = () => {};
Form.Item = FormItem;
Form.useForm = useForm;
