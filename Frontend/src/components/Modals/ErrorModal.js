import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import { connect } from 'react-redux';

import AddEditForm from '../Forms/Add.EditForm'
import { Errors } from '../../actions/index';



class ErrorModal extends Component {




  render() {
    const closeBtn = <button className="close" onClick={this.props.ErrorModal}>&times;</button>

    // const handleClose = () => show(false);
    //const handleShow = () => show(true);

    return (
      <>

        <Modal isOpen={this.props.ErrorModal.Errors} >
          <Modal.Header ErrorModal={this.props.ErrorModal}>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header >
          <Modal.Body>{this.props.Errors}</Modal.Body>
          <Modal.Footer >
            <Button closeBtn>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    ModalReducer: state.ModalReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ErrorModal: (data) => { dispatch(ErrorModal(data)) }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ErrorModal);