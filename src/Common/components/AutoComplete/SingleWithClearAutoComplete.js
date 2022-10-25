import React from "react";


import { makeStyles } from "@mui/styles";
import { Grid,Tooltip,Typography,TextField,Autocomplete } from "@mui/material";
import { DEFAULT_ITEM } from "../../../utils/constants";

const useStyles = makeStyles(theme => ({
  inputRoot: {
    margin: "0",
    height: "40px",
    width: "100%",
    background: props => props.disabled ? "#e9ecef" : "white",
    "&&& input": {
      fontSize: "10pt",
      border: 'none',
      paddingTop: 2
    }
  },
  textFieldInput: {
    marginTop: 0

  }

}));
/*** 
 * Author 
 * Nargel Velasco - Tech Team
 * @param {String} value - Component target value
 * @param {Array} searchList - The dropdown items.
 * @param {function} onSelectHandler - Component event function
 * 
 * chipProps is always hidden to true
*/
export default function SingleWithClearAutoComplete(props) {
  const { tooltiptext, tooltipPlacement, value, options, name, onSelectHandler, onChangeHandler, isError, errorMsg, source, disabled, placeholder } = props;
  const classes = useStyles(props);
  console.log('[Single With Clear Auto]',options,value);
  const body = (
    <Autocomplete
      classes={classes}
      ChipProps={{ hidden: true }}
      id="checkboxes-tags-demo"
      options={options || []}
      value={value ? value : DEFAULT_ITEM}
      
      disabled={disabled || false}
      onChange={(e, item) => {
        if (item && item.value && item.value !== undefined) {
          onSelectHandler(item, source);
        }
      }}
      onInputChange={(event, newInputValue) => {
        if (!newInputValue) {
          onChangeHandler({ target: { name: name, value: newInputValue } }, source);
        }
      }}

      getOptionLabel={option => option.label}
     

      renderInput={params => (
        <TextField
          {...params}
          error={isError || false}
          helperText={isError ? <label hmtlfor="" style={{ fontSize: '10pt' }}>{errorMsg}</label> : ''}
          name={name}
          variant="outlined"
          
          fullWidth
          type="text"
          placeholder={placeholder || 'Select'}
          label={placeholder ? placeholder : undefined}
          className={classes.textFieldInput}
          style={{ border: 'none !important' }}
          onKeyPress={(ev) => {
            if (ev.key === 'Enter') {
              // Do code here
              ev.preventDefault();
            }
          }}
          InputLabelProps={{
            style: {
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              width: '100%',
              fontSize: '10pt',
              color: 'black'
            }
          }}
        />
      )}
    />

  );
  return (
    <React.Fragment>
      {tooltiptext ?
        <React.Fragment>
          <Tooltip placement={tooltipPlacement || 'bottom-start'} title={<label style={{ fontSize: "12px", paddingTop: "3px" }}>{tooltiptext}</label>}>

            {body}
          </Tooltip>
        </React.Fragment>
        : <React.Fragment>{body}</React.Fragment>

      }
    </React.Fragment>
  );
}

