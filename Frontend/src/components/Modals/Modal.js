import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import AddEditForm from '../Forms/Add.EditForm'
import { connect } from 'react-redux';

import { Toggle } from '../../actions/index';

class ModalForm extends Component {


  render() {
    const closeBtn = <button className="close" onClick={this.props.Toggle}>&times;</button>


    return (
      <div>
        <Modal isOpen={this.props.ModalReducer.Modal} toggle={this.props.Toggle}>
          <ModalHeader toggle={this.props.Toggle} close={closeBtn}>{this.props.ModalReducer.Title}</ModalHeader>
          <ModalBody>
            <AddEditForm
              addItem={this.props.addItem}
              updateItem={this.props.updateItem}
              toggle={this.props.Toggle} />
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

// Store'da bulunan verileri component props'una geçirir
function mapStateToProps(state) {
  return {
    ModalReducer: state.ModalReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    Toggle: () => { dispatch(Toggle()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalForm);