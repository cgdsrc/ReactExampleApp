import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { deleteItem } from '../../actions/index';
import { } from '../../';


class DataTable extends Component {




  deleteItem = (VehicleId) => {
    let confirmDelete = window.confirm('Delete item forever?')
    if (confirmDelete) {
      console.log(VehicleId)
      fetch(`http://127.0.0.1:1040/crud/${VehicleId}`, {

        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': localStorage.getItem("token")
        },
        body: JSON.stringify({
          VehicleId
        })
      })
        .then(response => response.json())
        .then(item => {
          console.log(item)
          if (item.affectedRows > 0) {
            this.props.deleteItem(VehicleId)
          }
        })
        .catch(err => console.log(err))
    }

  }

  render() {
    var items;

    if (typeof (this.props.items) != 'undefined') {
      items = this.props.items.map((item, index) => {
        return (

          <tr key={item.VehicleId}>
            <th scope="row">{item.VehicleId}</th>
            <td>{item.VehicleName}</td>
            <td>{item.VehicleDeviceId}</td>
            <td>{item.VehicleLineId}</td>
            <td>{item.VehicleDriverId}</td>
            <td>{item.CoupledVehicleId}</td>
            <td>{item.VehicleStatus}</td>
            <td>{item.isDeleted}</td>
            <td>{item.VehicleDesc}</td>
            <td>
              <Button
                color="warning"
                onClick={this.props.modalButtonOnClick}

                style={{ float: "left" }}
                data-index={index}>
                {"Edit"}
              </Button>
              <Button color="danger" onClick={() => this.deleteItem(item.VehicleId)}>Del</Button>

            </td>
          </tr>
        )
      })
    }



    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Device ID</th>
            <th>Line ID</th>
            <th>Driver ID</th>
            <th>Coupled Vehicle Id</th>
            <th>Vehicle Status</th>
            <th>İsDeleted</th>
            <th>Vehicle Description</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </Table>
    )
  }
}

// Store'da bulunan verileri component props'una geçirir
function mapStateToProps(state) {
  return {
    LoginReducer: state.LoginReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteItem: (data) => { dispatch(deleteItem(data)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);