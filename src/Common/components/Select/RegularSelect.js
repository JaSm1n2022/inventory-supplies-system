import React from 'react';
import { makeStyles } from '@mui/styles';
import { Select, InputLabel, Tooltip, MenuItem, FormControl, FormHelperText } from '@mui/material';


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: 0,
        width: '100%'

    },
    quantityRoot: {
        border: '0',
        margin: 0,
        width: '100%'

    },
    selectEmpty: {
        marginTop: 0,
    },
    root: {

        width: '100%',
        fontSize: '10pt',
        borderBottom: '0px solid white',
        background: 'white'

    },
    rootRule: {

        width: '100%',
        fontSize: '10pt',
        borderBottom: '0px solid white',
        background: 'white',
        color: 'black'

    },

}));
/*** 
 * Author 
 * Nargel Velasco - Tech Team
 * @param {String} variant - variant value (outlined,filled,standard)
 * @param {Boolean} isError - flag to indicate that component field is in error state
 * @param {String} errorMsg - Error message if isError is true
 * @param {String} name - target component name
 * @param {String} value - target component value
 * @param {String} root - set className 
 * @param {Object} source - item object
 * @param {Array} options - Items dropdown
 * * @param {Function} onChange - Component onChange function
 * 
 * 
*/
export default function RegularSelect({ tooltiptext, tooltipPlacement, disabled, placeholder, label, variant, onChange, name, isError, root, value, source, options, errorMsg }) {
    const classes = useStyles();
    const body = (
        <Select
            labelId="simple-select-filled-label"
            id={name}
            placeholder={placeholder}
            label={label}
            name={name}

            disabled={disabled || false}
            className={root && root === 'minmax' ? classes.rootRule : classes.root}
            value={value || ''}
            source={source}
            onChange={(event) => onChange(event, source)}
        >
            <MenuItem disabled value={'Select'}>Select</MenuItem>

            {options && options.length > 0 && options.map((c, i) => {
                return (
                    <MenuItem key={`reg-sel-${i}`} value={c.value}><label htmlFor="" style={{ fontSize: '10pt' }}>{c.description || c.name}</label>


                    </MenuItem>
                )
            })}
        </Select>

    )
    return (
        <div>
            <FormControl variant={variant || "outlined"} className={classes.quantityRoot}>
                {label &&
                    <InputLabel id="demo-simple-select-outlined-label">{<h4>{label}</h4>}</InputLabel>
                }

                {tooltiptext ?
                    <Tooltip placement={tooltipPlacement || 'bottom-start'} title={<label style={{ fontSize: "12px", paddingTop: "3px" }}>{tooltiptext}</label>}>
                        {body}
                    </Tooltip>
                    : <React.Fragment>{body}</React.Fragment>
                }
                {isError && <FormHelperText style={{ color: 'red' }}>{errorMsg}</FormHelperText>}

            </FormControl>
        </div>
    )
}