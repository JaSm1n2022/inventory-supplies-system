import { Button } from '@mui/material';
import React from 'react';

export default function ViewFunction(props) {
   
    const openEditModalHandler = () => {
        props.createFormHandler(props.data,'view');
    }
    
    return (
        <React.Fragment>
            {props.data ?
                <div>
                <Button
                variant="contained"
                color="primary"
            onClick={() => openEditModalHandler()}
            component="span"
          >
            View Items
          </Button>
                </div>
                : null
            }
        </React.Fragment>
    )
};