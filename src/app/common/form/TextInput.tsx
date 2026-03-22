import React from 'react';
import TextField from '@mui/material/TextField';

interface TextInputProps {
  name?: string;
  value?: string;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
  placeholder?: string;
  autoFocus?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  type?: string;
  label?: string;
  error?: boolean;
  helperText?: string;
  margin?: 'normal' | 'none' | 'dense';
}

const TextInput = ({ error, helperText, ...rest }: TextInputProps) => {
  return <TextField error={error} helperText={helperText} {...rest} />;
};

export default TextInput;
