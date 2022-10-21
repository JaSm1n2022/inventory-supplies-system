import React, { lazy, Suspense } from 'react';
import { makeStyles } from '@mui/styles';
import { Tooltip, TextField,InputAdornment  } from '@mui/material';

const SearchIcon = lazy(() => import(/* webpackChunkName: 'SearchIcon' */ "@mui/icons-material/Search"));

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: 0,
      width: '100%',
      height: '40px'
    },
  },
  inputRoot: {
    width: '100%',
    height: '40px'

  },
  noBorder: {
    border: "none",
    width: '100%',
    height: '40px'

  }
}));

/*** 
 * Author 
 * Nargel Velasco - Tech Team
 * @param {Function} onChange - Component onChange function
 * @param {String} variant - outlined/filled/standard
 * @param {String} type - number/text/search and default is text
 * @param {String} name - target component name
 * @param {String} value - target component value
 * @param {Boolean} isError - flag to indicate if component is in error state
 * @param {Boolean} errorMsg - Error message
 * @param {Boolean} readonly - Flag to indicate if component is in readonly state
 * @param {String} placeholder - Placeholder text
 * @param {String} border - set border
 * @param {Object} source - item object
 * @param {Object} background - set background color
 * 
*/

export default function SearchLookupTextField(
  { id, source, isAllowEnterKey, onImport, onChange, onPressEnterKeyHandler,variant, label, isError, type, value, errorMsg, readonly, name, placeholder, border, background, disabled, size, height }) {
  const classes = useStyles();
  let colorBkg = background || '';
  colorBkg = disabled ? '#e9ecef' : colorBkg;
  let topLabel = label ? label : placeholder;

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        error={isError || false}
        id={id||'txt-fld'}
        disabled={disabled || false}
        type={type || "text"}
        margin="dense"
        label={isError ? 'Error' : <label hmtlfor="" style={{ fontSize: '10pt' }}>{topLabel}</label>}
        defaultValue={value}
        helperText={isError ? <label hmtlFor="" style={{ fontSize: '10pt' }}>{errorMsg}</label> : ''}
        classes={classes.inputRoot}  readonly={readonly || false}
           
        onKeyPress={(ev) => {
          if (ev.key === 'Enter') {
            ev.preventDefault();
            // Do code here
            if(isAllowEnterKey) {
           onPressEnterKeyHandler(value);
            }
          }
        }}
        
        onChange={(e) => onChange(e, source)}
        name={name}
        value={value}
        placeholder={placeholder}
        variant={variant || 'outlined'} InputProps={{
          style: {
            fontSize: size || 14,
            height: height || 40,
            marginLeft: '0',
            marginRight: '0',
            background: colorBkg,
            color: 'rgba(0, 0, 0, 0.6)'

          },
          endAdornment: (
            <InputAdornment position="end">
            <Tooltip title={<h6 style={{ color: "lightblue" }}><span>Enter keyword to search</span></h6>}><Suspense fallback="Loading..."><SearchIcon  style={{fontSize:24,cursor:isAllowEnterKey ? 'pointer' : ''}} onClick={() => isAllowEnterKey ? onPressEnterKeyHandler(value) : null}/></Suspense></Tooltip>
            </InputAdornment>
          ),

          classes: { notchedOutline: border && border === 'none' ? classes.noBorder : '' }
        }} />
    </form>
  );
}