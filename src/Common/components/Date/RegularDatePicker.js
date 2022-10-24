import * as React from 'react';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import  "./style.module.css";
export default function RegularDatePicker({ name, source, onChange, label, value }) {

  return (
      <DatePicker
      onChange={(newValue) => {
        console.log('[New Value]',newValue,new Date(newValue));
        onChange(name, new Date(newValue),source);
      }}
        
          
fullWidth

        inputVariant="outlined"
        id="date-picker-dialog"
        format="MM/dd/yyyy"
        label={label ? label : ''}
        value={value ? new Date(value) : new Date()}
        emptyLabel={"Provide Date"}
        
       
        renderInput={(params) => <TextField {...params} size="small" fullWidth 
      
        />}
      />
    

  );
}