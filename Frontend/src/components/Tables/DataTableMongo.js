import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { deleteItemMongo } from '../../actions/index';
import { } from '../../';
import axios from 'axios';
import axiosError from 'axios-error';
class DataTableMongo extends Component {


    /*
    
        try {
          const header = {
            headers: {
              'Content-Type': 'application/json',
              'X-Auth-Token': localStorage.getItem("token")
            }
          };
          const body: JSON.stringify({
            _id
          }
          const response = await axios.del(`http://127.0.0.1:5000/business/delete/${_id}`, JSON.stringify(body), header);
          if(item.affectedRows > 0){
            this.props.deleteItemMongo(_id)
           }
    
        } catch (e) {
          
          var err = new axiosError(e);
          //  console.log(e.response.data.err)
          window.alert(e.response.data.err)
         // this.props.
    
        }
        */

    deleteItemMongo = async (_id) => {

        let confirmDelete = window.confirm('Delete item forever?')
        debugger
        if (confirmDelete) {
            try {
                const header = {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Auth-Token': localStorage.getItem("token")
                    }
                };
                const body = { _id };


                const response = await axios.delete(`http://127.0.0.1:5000/business/delete/${_id}`, JSON.stringify(body), header);

                this.props.deleteItemMongo(_id)



            } catch (e) {

                var err = new axiosError(e);
                console.log(err)
                window.alert(e.response.data.err)

            }
        }
    }

    render() {
        var items;

        if (typeof (this.props.items) != 'undefined') {
            items = this.props.items.map((item, index) => {
                return (

                    <tr key={item._id}>
                        <th scope="row">{item._id}</th>
                        <td>{item.person_name}</td>
                        <td>{item.business_name}</td>
                        <td>{item.business_gts_number}</td>
                        <td>
                            <Button
                                color="warning"
                                onClick={this.props.modalButtonOnClick}
                                style={{ float: "left" }}
                                data-index={index}>
                                {"Edit"}
                            </Button>
                            <Button color="danger" onClick={() => this.deleteItemMongo(item._id)}>Del</Button>

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
                        <th>İş</th>
                        <th>Tel</th>

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
        deleteItemMongo: (data) => { dispatch(deleteItemMongo(data)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataTableMongo);