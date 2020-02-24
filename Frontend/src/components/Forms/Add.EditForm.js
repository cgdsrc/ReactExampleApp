import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';

import { updateDrivers, On_ChangeModal, updateItem, addItem } from '../../actions/index';

import axios from 'axios';
import axiosError from 'axios-error';
import { openSuccessNotification, openErrorNotification } from '../notification';


class AddEditForm extends React.Component {


  async dropdown() {

    try {
      const header = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Auth-Token': localStorage.getItem("token")
        }
      };
      const response = await axios.get('http://127.0.0.1:1040/drivers', header);

      this.props.updateDrivers(response.data)
    } catch (e) {
      var err = new axiosError(e);
      console.log(err)
    }
  };

  onChange = e => {
    var data = {
      "name": e.target.name,
      "value": e.target.value
    }
    this.props.changeModal(data);

  }





  submitFormAdd = async (e) => {
    e.preventDefault()

    try {
      const header = {
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': localStorage.getItem("token")
        }
      };
      const body = {
        VehicleName: this.props.ModalReducer.VehicleName,
        VehicleDeviceId: this.props.ModalReducer.VehicleDeviceId,
        VehicleLineId: this.props.ModalReducer.VehicleLineId,
        VehicleDriverId: this.props.ModalReducer.VehicleDriverId,
        CoupledVehicleId: this.props.ModalReducer.CoupledVehicleId,
        VehicleStatus: this.props.ModalReducer.VehicleStatus,
        isDeleted: this.props.ModalReducer.isDeleted,
        VehicleDesc: this.props.ModalReducer.VehicleDesc
      }
      const response = await axios.post('http://127.0.0.1:1040/crud', JSON.stringify(body), header);
      body['VehicleId'] = response.data.insertId;
      this.props.addItem(body)
      this.props.toggle()
      openSuccessNotification({ placement: "bottomLeft" })

    } catch (e) {
      debugger
      var err = new axiosError(e);
      //  console.log(e.response.data.err)
      //window.alert(e.response.data.err)
      // this.props.
      openErrorNotification({ placement: "bottomLeft", err: e.response.data.err })

    }
  }
  submitFormEdit = async (e) => {
    e.preventDefault()
    try {
      const header = {
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': localStorage.getItem("token")
        }
      };
      const body = {
        VehicleId: this.props.ModalReducer.VehicleId,
        VehicleName: this.props.ModalReducer.VehicleName,
        VehicleDeviceId: this.props.ModalReducer.VehicleDeviceId,
        VehicleLineId: this.props.ModalReducer.VehicleLineId,
        VehicleDriverId: this.props.ModalReducer.VehicleDriverId,
        CoupledVehicleId: this.props.ModalReducer.CoupledVehicleId,
        VehicleStatus: this.props.ModalReducer.VehicleStatus,
        isDeleted: this.props.ModalReducer.isDeleted,
        VehicleDesc: this.props.ModalReducer.VehicleDesc
      }
      const response = await axios.put('http://127.0.0.1:1040/crud', JSON.stringify(body), header);
      console.log('EditForm::onClick::Response', response)

      if (response.data.changedRows > 0) {
        var data = {
          VehicleId: this.props.ModalReducer.VehicleId,
          VehicleName: this.props.ModalReducer.VehicleName,
          VehicleDeviceId: this.props.ModalReducer.VehicleDeviceId,
          VehicleLineId: this.props.ModalReducer.VehicleLineId,
          VehicleDriverId: this.props.ModalReducer.VehicleDriverId,
          CoupledVehicleId: this.props.ModalReducer.CoupledVehicleId,
          VehicleStatus: this.props.ModalReducer.VehicleStatus,
          isDeleted: this.props.ModalReducer.isDeleted,
          VehicleDesc: this.props.ModalReducer.VehicleDesc,
          Errors: this.props.ModalReducer.Errors
        }
        this.props.updateItem(data);
        this.props.toggle()
        //    this.props.createNotification()
        debugger
        openSuccessNotification({ placement: "bottomRight" })
      }


    } catch (e) {

      var err = new axiosError(e);
      debugger
      const data = {
        Errors: e.response.data.err

      }
      this.props.toggle()
      //this.props.Errors(data)
      openErrorNotification({ placement: "bottomRight", err: e.response.data.err })
      //  console.log(e.response.data.err)
      // window.alert(e.response.data.err)
    }

  }

  componentWillMount() {
    this.dropdown();
  }

  componentDidMount() {
    //this.dropdown();
  }
  //-----------------------------------------FETCH EDİT---------------------------------------------------------------
  /* 
  
    submitFormEdit = (e) => {
      e.preventDefault()
      fetch(`http://192.168.1.37:1040/crud`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': localStorage.getItem("token")
        },
        body: JSON.stringify({
          VehicleId: this.props.ModalReducer.VehicleId,
          VehicleName: this.props.ModalReducer.VehicleName,
          VehicleDeviceId: this.props.ModalReducer.VehicleDeviceId,
          VehicleLineId: this.props.ModalReducer.VehicleLineId,
          VehicleDriverId: this.props.ModalReducer.VehicleDriverId,
          CoupledVehicleId: this.props.ModalReducer.CoupledVehicleId,
          VehicleStatus: this.props.ModalReducer.VehicleStatus,
          isDeleted: this.props.ModalReducer.isDeleted,
          VehicleDesc: this.props.ModalReducer.VehicleDesc
        })
      })
        .then(response => response.json())
        .then(item => {
          debugger;
          console.log('EditForm::onClick::Response', item)
          if (item.changedRows > 0) {
            var data = {
              VehicleId: this.props.ModalReducer.VehicleId,
              VehicleName: this.props.ModalReducer.VehicleName,
              VehicleDeviceId: this.props.ModalReducer.VehicleDeviceId,
              VehicleLineId: this.props.ModalReducer.VehicleLineId,
              VehicleDriverId: this.props.ModalReducer.VehicleDriverId,
              CoupledVehicleId: this.props.ModalReducer.CoupledVehicleId,
              VehicleStatus: this.props.ModalReducer.VehicleStatus,
              isDeleted: this.props.ModalReducer.isDeleted,
              VehicleDesc: this.props.ModalReducer.VehicleDesc
            }
            this.props.updateItem(data);
            this.props.toggle()
  
          }
        })
        .catch(err => {
          console.log(err)
           .then(item => {
             console.log(item.err)
           })
  
           window.alert(err.response.data.err)
           err.json().then((body) => {
             console.log(body);
   
           })
         })
     }
  
  
  */
  //---------------------------------------------------------------------------------------------------------------------------

  /*
  <FormGroup>
         <Label for="VehicleId">VehicleId</Label>
          <Input type="text" name="VehicleId" id="VehicleId" onChange={this.onChange} value={this.state.VehicleId === null ? '' : this.state.VehicleId} />
        </FormGroup>
             {  =400 ?
     <div className="alert alert-danger">
        err
     </div> :null
}
  */
  render() {

    return (

      <Form onSubmit={Number(this.props.ModalReducer.Index) !== -1 ? this.submitFormEdit : this.submitFormAdd} >

        <FormGroup>
          <Label for="VehicleName">Vehicle Name</Label>
          <Input type="text" name="VehicleName" id="VehicleName" onChange={this.onChange} placeholder={this.props.ModalReducer.VehicleName} />
        </FormGroup>
        <FormGroup>
          <Label for="VehicleDeviceId">Vehicle Device ID</Label>
          <Input type="VehicleDeviceId" name="VehicleDeviceId" id="VehicleDeviceId" onChange={this.onChange} placeholder={this.props.ModalReducer.VehicleDeviceId} />
        </FormGroup>
        <FormGroup>
          <Label for="VehicleLineId">Vehicle Line ID</Label>
          <Input type="text" name="VehicleLineId" id="VehicleLineId" onChange={this.onChange} placeholder={this.props.ModalReducer.VehicleLineId} />
        </FormGroup>
        <FormGroup>
          <Label for="VehicleDriverId">Vehicle Driver</Label>
          <select className="form-control" name="VehicleDriverId" onChange={this.onChange} value={this.props.ModalReducer.VehicleDriverId} placeholder="Select Driver">
            {

              this.props.ModalReducer.Drivers.map((h, i) =>
                (<option key={i} value={h.DriverId} >{h.DriverName + " " + h.DriverSurname}</option>))
            }
          </select>
        </FormGroup>
        <FormGroup>
          <Label for="CoupledVehicleId">Coupled Vehicle ID</Label>
          <Input type="text" name="CoupledVehicleId" id="CoupledVehicleId" onChange={this.onChange} placeholder={this.props.ModalReducer.CoupledVehicleId} />
        </FormGroup>
        <FormGroup>
          <Label for="VehicleStatus">Vehicle Status</Label>
          <Input type="text" name="VehicleStatus" id="VehicleStatus" onChange={this.onChange} placeholder={this.props.ModalReducer.VehicleStatus} />
        </FormGroup>
        <FormGroup>
          <Label for="isDeleted">is Deleted</Label>
          <Input type="text" name="isDeleted" id="isDeleted" onChange={this.onChange} placeholder={this.props.ModalReducer.isDeleted} />
        </FormGroup>
        <FormGroup>
          <Label for="VehicleDesc">Vehicle Desc</Label>
          <Input type="text" name="VehicleDesc" id="VehicleDesc" onChange={this.onChange} placeholder={this.props.ModalReducer.VehicleDesc} />
        </FormGroup>
        <Button type="submit" >Submit</Button>
      </Form>

    );
  }
}

// Store'da bulunan verileri component props'una geçirir
function mapStateToProps(state) {
  return {
    LoginReducer: state.LoginReducer,
    ModalReducer: state.ModalReducer,
    HomeReducer: state.HomeReducer,

  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateDrivers: (data) => { dispatch(updateDrivers(data)) },
    changeModal: (data) => { dispatch(On_ChangeModal(data)) },
    updateItem: (data) => { dispatch(updateItem(data)) },
    addItem: (data) => { dispatch(addItem(data)) }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEditForm)