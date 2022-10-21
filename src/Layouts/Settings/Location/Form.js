import React, { useEffect, useState } from "react";
import ModalHeader from "../../../Common/components/Modal/ModalHeader/ModalHeader";
import ModalFooter from "../../../Common/components/Modal/ModalFooter/ModalFooter";
import styles from "./style.module.css";
import ReactModal from "react-modal";
import RegularTextField from "../../../Common/components/TextField/RegularTextField";
import RegularDatePicker from "../../../Common/components/Date/RegularDatePicker";
import SingleWithClearAutoComplete from "../../../Common/components/AutoComplete/SingleWithClearAutoComplete";
import RegularSelect from "../../../Common/components/Select/RegularSelect";

function Form(props) {
    const [generalForm, setGeneralForm] = useState({});
    const { isOpen,
        onClose} = props;

    const general = [
        {
            id: 'name',
            component: 'textfield',
            placeholder: 'Name',
            label: 'Name',
            name: 'name',
            disabled: props.mode && props.mode === 'view' ? true : false
            
        },
        {
            id: 'address',
            component: 'textfield',
            placeholder: 'Address',
            label: 'Address',
            name: 'address',
            disabled: props.mode && props.mode === 'view' ? true : false
            
        }, 
        {
            id: 'locationType',
            component: 'singlecomplete',
            placeholder: 'Location Type',
            label: 'Location Type',
            name: 'locationType',
            disabled: props.mode && props.mode === 'view' ? true : false
            
        },
        {
            id: 'contactPerson',
            component: 'textfield',
            placeholder: 'Contact Person',
            label: 'Contact Person',
            name: 'contactPerson',
            disabled: props.mode && props.mode === 'view' ? true : false
            
        },
        {
            id: 'phone',
            component: 'textfield',
            placeholder: 'Phone',
            label: 'Phone',
            name: 'phone',
            disabled: props.mode && props.mode === 'view' ? true : false
            
        },
        {
            id: 'fax',
            component: 'textfield',
            placeholder: 'Fax',
            label: 'Fax',
            name: 'fax',
            disabled: props.mode && props.mode === 'view' ? true : false
            
        }
    ]

    
    useEffect(() => {
        const fm = {};
        fm.position = 'N/A';
        setGeneralForm(fm);
      },[]);
    useEffect(() => {
        if(props.item) {
            console.log('[items]',props.item);
            const generalFm = {...props.item};
            setGeneralForm(generalFm);
            
            
            
        }
    }, [props.item]);
    const validateFormHandler = () => {
    
    }
    const footerActions = [
        {
            title: props.distribution ? "Apply" : "Save",
            type: "primary",
            event: "submit",
            callback: () => {
                validateFormHandler();
            },
        },
        {
            title: "Cancel",
            type: "default",
            event: "cancel",
            callback: () => {
                props.onClose();
            },
        },
    ];
    const inputGeneralHandler = ({ target }) => {
        console.log('[Target]',target,generalForm);
        const source = { ...generalForm};
        source[target.name] = target.value;
        setGeneralForm(source);

    };
    const autoCompleteGeneralInputHander = (item) => {
        const src = { ...generalForm };
        console.log('[src]',src,item);
        if(item.category === 'employee') {
         src['requestor'] = item;
         src['position'] = item.position;
        } else if (item.category === 'facility') {
            src['requestor'] = item;
        } else if (item.category === 'patient') {
            src['patient'] = item;
        }
 
        setGeneralForm(src);
        
    }
    const onChangeGeneralInputHandler = (e) => {
        const src = { ...generalForm };
        if (!e.target.value) {
            src[e.target.name] = { name: '', label: '' };
            setGeneralForm(src);
        }
    }
    
    
    const dateInputHandler = (value, name) => {
        const src = { ...generalForm };
        src[name] = value;
        setGeneralForm(src);
      }
      const titleHandler = () => {
          if(props.mode === 'view') {
                return 'View Location'
          } else if (props.mode === 'edit') {
              return 'Edit Location';
          } else {
              return 'Create Location';
          }
      }
      console.log('[general form]',generalForm);
    return (
        <ReactModal
            style={{
                overlay: {
                    zIndex: 999,
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.65)'
                },
                content: {
                    position: 'absolute',
                    top: '0',
                    bottom: '0',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    right: '0',
                    left: '0',
                    overflow: 'none',
                    WebkitOverflowScrolling: 'touch',
                    border: 'none',
                    padding: '0px',
                    background: 'none'
                }
            }}
            isOpen={isOpen}
            onRequestClose={onClose}
            ariaHideApp={false}
        >
            <div className={styles.styleForm}>
                <ModalHeader title={titleHandler()} onClose={onClose} />
                <div className={styles.content}>
                    <Grid container spacing={1} direction="row">
                        {general.map(item => {
                            return (
                                <Grid item xs={4}>
                                    {item.component === 'textfield' ?
                                        <React.Fragment>
                                            <RegularTextField {...item} value={generalForm[item.name]} onChange={inputGeneralHandler} />
                                        </React.Fragment>
                                        : item.component === 'datepicker' ?
                                            <React.Fragment>
                                                 <RegularDatePicker {...item} value={generalForm[item.name]} onChange={dateInputHandler} />
                                            </React.Fragment>
                                            : item.component === 'singlecomplete' ?
                                                <React.Fragment>
                                                    <SingleWithClearAutoComplete
                                                        {...item}
                                                        value={generalForm[item.name]}
                                                        onSelectHandler={autoCompleteGeneralInputHander}
                                                        onChangeHandler={onChangeGeneralInputHandler}
                                                        />
                                                </React.Fragment>
                                                : item.component === 'select' ?
                                                    <React.Fragment>
                                                        <RegularSelect 	{...item} 

                                                            onChange={inputGeneralHandler}
                                                            value={generalForm[item.value]}
                                                        />
                                                    </React.Fragment>
                                                    : null
                                    }
                                </Grid>
                            )
                        })}
                    </Grid>
                    

                </div>
                <br />
                {props.mode && props.mode === 'view' ?
                null : 
                <ModalFooter actions={footerActions} />
}   
            </div>
        </ReactModal >

    );
};




export default Form;
