import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import EditFormMongo from '../Forms/EditFormMongo'
import { connect } from 'react-redux';

import { ToggleMongo } from '../../actions/index';

class MongoModal extends Component {


  render() {
    const closeBtn = <button className="close" onClick={this.props.ToggleMongo}>&times;</button>


    return (
      <div>
        <Modal isOpen={this.props.MongoModalReducer.Modal} toggleMongo={this.props.ToggleMongo}>
          <ModalHeader toggleMongo={this.props.ToggleMongo} close={closeBtn}>{this.props.MongoModalReducer.Title}</ModalHeader>
          <ModalBody>
            <EditFormMongo
              addItemMongo={this.props.addItemMongo}
              updateItemMongo={this.props.updateItemMongo}
              toggleMongo={this.props.ToggleMongo} />
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

// Store'da bulunan verileri component props'una geçirir
function mapStateToProps(state) {
  return {
    MongoModalReducer: state.MongoModalReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ToggleMongo: () => { dispatch(ToggleMongo()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MongoModal);