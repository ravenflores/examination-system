import React from 'react'
import TextField from '@material-ui/core/TextField'

export default function InputFieldsText({ register, name, ...rest }) {
    return <TextField name={name} ref={register}  {...rest} />;
  }




  
export function InputFieldsRadio({ register, name, ...rest }) {
    return <TextField name={name} ref={register}  {...rest} />;
  } 