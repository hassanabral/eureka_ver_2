declare module 'redux-form' {
  import { ComponentType } from 'react';

  export interface FieldProps {
    input: {
      name: string;
      value: any;
      onChange: (value: any) => void;
      onBlur: (value: any) => void;
      onFocus: () => void;
    };
    meta: {
      touched: boolean;
      error?: string;
      warning?: string;
    };
  }

  export interface FormProps {
    handleSubmit: (fn: (values: any) => void) => (e: React.FormEvent) => void;
    pristine: boolean;
    submitting: boolean;
    invalid: boolean;
    initialValues?: any;
    change: (field: string, value: any) => void;
  }

  export function reduxForm(config: {
    form: string;
    validate?: (values: any) => any;
    enableReinitialize?: boolean;
    destroyOnUnmount?: boolean;
  }): (component: ComponentType<any>) => ComponentType<any>;

  export const Field: ComponentType<any>;
  export function reset(form: string): any;
  export const reducer: any;
}
