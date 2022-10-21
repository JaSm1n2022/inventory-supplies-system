import React, { Component } from "react";
import { connect } from "react-redux";
import ReactModal from "react-modal";
import { OceanBookingForm } from "../../../Components/modals";
import { hideModal } from "../../../store/actions/modalAction";


const MODAL_TYPES = {
  "multi-leg-booking": OceanBookingForm,
  
};

// A presentation component to handle the display of a custom modal.

class ModalRoot extends Component {
  constructor(props) {
    super(props);
    console.log('[Modal Root props]',props);
    this.state = {
      isOpen: props.modalProps?.open || false,

    };
  }

  closeModal = () => {
    this.props.dispatch(hideModal());
  };
  
 
  render() {
    console.log('[Modal Root this.props]',this.props);
    if (!this.props.modalType) {
      return null;
    }

    const SpecificModal = MODAL_TYPES[this.props.modalType];

    return (
      <ReactModal
      style={{
        overlay: {
          zIndex: 1000,
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
        isOpen={this.props.modalProps.open}
        onRequestClose={this.closeModal}
        ariaHideApp={false}
      >
        <SpecificModal onClose={this.closeModal}  {...this.props.modalProps}/>
      </ReactModal>
    );
  }
}

const mapStateToProps = state => ({ ...state.modal });

export default connect(mapStateToProps, null)(ModalRoot);
