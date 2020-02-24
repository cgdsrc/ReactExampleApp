import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import socketIOClient from "socket.io-client";
import { getSocketData } from './SocketAction';
import { connect } from 'react-redux';
import { openSuccessNotification, openErrorNotification } from '../../components/notification';



const socket = socketIOClient("127.0.0.1:1060");

class SocketDataTable extends Component {

    constructor() {
        super();
        this.state = {
            data: false,
            endpoint: "127.0.0.1:1060",
            notify: false
        };
    }


    // shouldComponentUpdate(nextProps, nextState) {
    //     if (this.state.data === nextState.data) {
    //         // zaten şu an hepsi aynı render'ın çalışmasına gerek yok
    //         return false;
    //     }
    //     // en az biri farklı ise render çalışsın
    //     return true;

    // }

    send = () => {
        // Rastgele veriler üretiyoruz.
        socket.emit("RdsHB", "engineData");
        //this.recieve()
    }

    componentDidMount() {

        setInterval(this.send, 1000)

        socket.on('RdsHBAck', (data) => {
            //     this.setState({ data })



            this.props.getSocketData(data)

        })
        console.log(this.props);

        // socket.on("Notify", (notify) => {
        //     //this.setState({ notify })
        //     openSuccessNotification({ message: notify.Head, description: notify.Body })
        // })

        // console.log("state: " + this.state.data);

    }
    componentWillUnmount() {
        //soketler kapanır
        socket.off("Notify");
        socket.off("RdsHBAck");
        socket.off("RdsHB");
    }







    componentWillUpdate() {
        //   console.log("sa");

    }

    render() {

        return (


            <Table responsive hover>


                <thead>
                    <tr>
                        <th>FieldID</th>
                        <th>status</th>
                        <th>value</th>
                        <th>type</th>

                    </tr>
                </thead>
                <tbody>

                    {this.renderTableData()}

                </tbody>

            </Table>



        )
    }



    renderTableData = () => {
        //console.log(this.state);
        const { items } = this.props.SocketReducer
        if (typeof (items) != 'undefined') {

            return items.map((data, index) => {

                return (
                    <tr key={data.FieldId}>
                        <td>{data.FieldId}</td>
                        <td>{data.FieldValue.status}</td>
                        <td>{data.FieldValue.value}</td>
                        <td>{data.FieldValue.type}</td>

                    </tr>

                )
            });


        }
    }




}

function mapStateToProps(state) {
    return {
        SocketReducer: state.SocketReducer

    }
}

function mapDispatchToProps(dispatch) {
    return {
        getSocketData: (data) => { dispatch(getSocketData(data)) }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SocketDataTable);