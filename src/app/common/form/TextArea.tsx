import React from 'react';
import TextField from '@mui/material/TextField';

const TextArea = ({ error, helperText, ...rest }: any) => {
  return <TextField error={error} helperText={helperText} multiline {...rest} />;
};

export default TextArea;
