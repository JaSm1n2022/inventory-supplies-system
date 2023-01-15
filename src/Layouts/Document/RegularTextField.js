import React from 'react';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';



const useStyles = makeStyles(() => ({
  root: {
    '& > *': {
      margin: 0,
      width: '100%',
      height: props => props.height ? props.height : '20px'
    },
  },
  inputRoot: {
    width: '100%',
    height: '20px'

  },
  noBorder: {
    border: "1",
    width: '100%',
    height: '20px'

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

export default function RegularTextField(props) {
  const classes = useStyles(props);
  
  const body = (
    <TextField
      classes={classes.inputRoot}
      onKeyPress={(ev) => {
        if (ev.key === 'Enter') {
          // Do code here
          ev.preventDefault();
        }
      }}
      
      margin="dense"
     InputProps={{
        style: {
          fontSize: 14,
          height: 20,
          marginLeft: '0',
          marginRight: '0',

          

        },

        classes: { notchedOutline: classes.noBorder}
      }} />

  )
  return (
        <React.Fragment>
         {body}
         </React.Fragment>
      
  );
}