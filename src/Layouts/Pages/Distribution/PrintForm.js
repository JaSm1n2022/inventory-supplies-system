import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import ModalHeader from "../../../Common/components/Modal/ModalHeader/ModalHeader";

import PrintComponent from "../../Document/PrintComponent";
import styles from "./distribution.module.css";
function PrintForm(props) {
    
    const onClose = () => {
        props.closePrintForm();
    }
    console.log('[props print]',props);
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
            isOpen={props.isOpen}
           
            ariaHideApp={false}
        >
            <div className={styles.form}>
                <ModalHeader title={'Print Form'} onClose={onClose} />
                <div className={styles.content}>
                    <PrintComponent multiPatients={props.multiPatients} details={props.detailForm} general={props.generalForm}/>
                           </div>
            </div>
        </ReactModal>

    );
};




export default PrintForm;
