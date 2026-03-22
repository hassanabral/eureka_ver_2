import React, { ReactNode } from 'react';
import TextField from '@mui/material/TextField';

interface SelectInputProps {
  error?: boolean;
  helperText?: string;
  children?: ReactNode;
  [key: string]: any;
}

const SelectInput = ({ error, helperText, children, ...rest }: SelectInputProps) => {
  return (
    <TextField select error={error} helperText={helperText} margin="dense" style={{minWidth: 175}} {...rest}>
      {children}
    </TextField>
  );
};

export default SelectInput;
