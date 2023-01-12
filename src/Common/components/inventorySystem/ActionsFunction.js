import { Button } from '@mui/material';
import React, { useState} from 'react';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import YesNoModal from '../../../Common/components/Modal/YesNoModal';
export default function ActionsFunction(props) {
    const [isRowForDelete,setIsRowForDelete] = useState(false);
    const openEditModalHandler = () => {
        props.createFormHandler(props.data,'edit');
    }
    const deleteRecordHandler = () => {
      setIsRowForDelete(true);
      
    }
    const noDeleteHandler = () => {
      setIsRowForDelete(false);
    }
    const deleteRowHandler = () => {
      setIsRowForDelete(false);
      console.log('[Delete Id]',props.data.id);
      props.deleteRecordItemHandler(props.data.id,props.data);
    }
    console.log('[Actions Function props]',props);
    return (
        <React.Fragment>
            {props.data ?
                <div style={{display:'inline-flex',gap:10}}>
                <Button
                disabled={props.disabled}
            onClick={() => openEditModalHandler()}
            variant="contained"
            style={{
              border: props.disabled ? 'solid 1px #e9ecef' : 'solid 1px #2196f3',
             
              color: 'white',
              background: props.disabled ? '#e9ecef' : '#2196f3',
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
          <Button
              
            onClick={() => deleteRecordHandler()}
            variant="contained"
            style={{
              border: 'solid 1px red',
              color: 'white',
              background: 'red',
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
            startIcon={<DeleteIcon />}
          >
            DELETE
          </Button>
                </div>
                : null
            }
                      {isRowForDelete &&
                                <YesNoModal description={'Do you wish to delete this record'} isOpen={isRowForDelete} noHandler={noDeleteHandler} yesHandler={deleteRowHandler} />

                              }
                    
        </React.Fragment>
    )
};