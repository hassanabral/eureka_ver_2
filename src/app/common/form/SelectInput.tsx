import React from 'react';
import TextField from '@material-ui/core/TextField';

const SelectInput = ({ input, type, required, width, label, meta: { touched, error }, children }) => {
  return (
    <TextField
      {...input}
      width={width}
      required={required}
      select
      label={label}
      margin='dense'
      type={type}
      style={{minWidth: 175}}
      error={touched && !!error}
      helperText={touched && error}
    >
      {children}
    </TextField>
  );
};

export default SelectInput;