import { Button } from '@mui/material';
import React  from 'react';
import EditIcon from "@mui/icons-material/Edit"
export default function EditFunction(props) {
   
    const openEditModalHandler = () => {
        props.createFormHandler(props.data,'edit');
    }
    
    return (
        <React.Fragment>
            {props.data ?
                <div>
                <Button
            onClick={() => openEditModalHandler()}
            variant="contained"
            style={{
              border: 'solid 1px #2196f3',
              color: 'white',
              background: '#2196f3',
              fontFamily: "Roboto",
              fontSize: "10px",
              fontWeight: 500,
              fontStretch: "normal",
              fontStyle: "normal",
              lineHeight: 1.71,
              letterSpacing: "0.4px",
              textAlign: "left",
              cursor: 'pointer'
            }}
            component="span"
            startIcon={<EditIcon />}
          >
            EDIT
          </Button>
                </div>
                : null
            }
        </React.Fragment>
    )
};