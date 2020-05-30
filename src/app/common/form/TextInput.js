import React from 'react';
import TextField from '@material-ui/core/TextField';

const TextInput = ({ input, placeholder, autoFocus, required, width, fullWidth, type, label, meta: { touched, error, warning } }) => {
  return (
    <TextField
      error={touched && !!error || !!warning}
      helperText={touched && error || warning}
      required={required}
      autoFocus={autoFocus}
      {...input}
      label={label}
      placeholder={placeholder}
      fullWidth={fullWidth}
      width={width}
      type={type}
    >
    </TextField>
  );
};

export default TextInput;