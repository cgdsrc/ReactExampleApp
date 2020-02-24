import React, { Component } from 'react';

import MenuBar from '../components/MenuBar/MenuBar';
import ModalForm from '../components/Modals/Modal';
import DataTable from '../components/Tables/DataTable';
import { Button } from 'reactstrap'
import { connect } from 'react-redux';
import '../css/custom.css';
import { setIsAuth, setIsLoading, addItem, updateItem, deleteItem, updateItems, Toggle, updateItemData, updateTitle, updateIndex } from '../actions';
import axios from 'axios';
import PdfContainer from "./PdfContainer"
import Doc from '../components/DocService';
import { openInfoNotification } from '../components/notification';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';


var intervalId;
class Home extends Component {
    ModalButton_OnClick(e) {
        var index = e.target.dataset.index;

        if (Number(index) !== -1) {
            this.props.updateTitle('Edit Item')

            this.props.updateItemData(this.props.HomeReducer.Items[index]);
        }
        else {
            var data = {
                VehicleId: null,
                VehicleName: '',
                VehicleDeviceId: null,
                VehicleLineId: null,
                VehicleDriverId: '',
                CoupledVehicleId: null,
                VehicleStatus: '',
                isDeleted: '',
                VehicleDesc: ''
            };

            this.props.updateTitle('Add New Item')

            this.props.updateItemData(data);
        }

        this.props.updateIndex(index)

        this.props.Toggle();

    }



    // try {
    //     const header = {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'X-Auth-Token': localStorage.getItem("token")
    //         }
    //     };
    //     axios.get('/pdf',{responseType:'blob'})
    //     const pdfBlob = new Blob([response.data],{type: 'application/pdf'})
    //     saveAs(pdfBlob,'newPdf.pdf')
    //     }

    //  catch (e) {
    //     console.log(e.response)
    // }



    getItems = async () => {


        try {
            const header = {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth-Token': localStorage.getItem("token")
                }
            };
            console.log(header)
            const response = await axios.get('http://127.0.0.1:1040/crud', header);

            this.props.updateItems(response.data)
            openInfoNotification({ placement: 'bottomRight' })
            //    this.props.createNotification(response.data)
        } catch (e) {
            if (e.status === 401) {
                // console.log("asfjkbagjkashsg")
                localStorage.removeItem('token');
                this.props.setIsAuth({ isAuth: false });
            }
            console.log(e.response)
        }

    }

    componentDidMount() {
        // isLoading set et
        this.props.setIsLoading(false);

        intervalId = setInterval(async () => {
            try {
                const header = {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-Auth-Token': localStorage.getItem("token")
                    }
                };
                const response = await axios.get('http://127.0.0.1:1040/mood', header);
                console.log(response)
            } catch (e) {
                console.log(e.response)
                const data = {
                    isAuth: false
                };
                clearInterval(intervalId);
                localStorage.removeItem('token');
                this.props.setIsAuth(data);
            }
        }, 605000);
    }

    componentWillMount() {
        //       console.log("home will mount")
        this.getItems()
        // document.addEventListener("keydown", this.handleKeyDown.bind(this))
    }




    createPdf = (html) => Doc.createPdf(html);

    render() {
        return (

            <div>
                <div className="row mx-0">
                    <div className="col-sm-12 col-md-12 col-lg-12 px-0">
                        <MenuBar />
                    </div>
                </div>
                <div className="row mx-0">
                    <div className="col-sm-12 col-md-12 col-lg-12 px-0">
                        <h1 style={{ margin: "20px 0" }}>CRUD Vehicles</h1>
                    </div>
                </div>

                <div className="row mx-0">
                    <div className="col-sm-12 col-md-12 col-lg-12 pr-0">

                        <Button
                            color="success"
                            onClick={this.ModalButton_OnClick.bind(this)}
                            style={{ float: "left", marginRight: "10px" }}
                            data-index={-1}>
                            {"Add Item"}
                        </Button>
                        <ModalForm />

                    </div>
                </div>
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="excel"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Download as XLS" />
                <PdfContainer createPdf={this.createPdf}>

                    <div className="row mx-0">
                        <div className="col-sm-12 col-md-12 col-lg-12 px-0" >
                            <DataTable id="excel"
                                items={this.props.HomeReducer.Items}
                                modalButtonOnClick={this.ModalButton_OnClick.bind(this)}
                                deleteItem={this.props.deleteItem
                                } />
                        </div>
                    </div>
                </PdfContainer>

            </div>

        )
    }
}
// Store'da bulunan verileri component props'una geçirir
function mapStateToProps(state) {
    return {
        LoginReducer: state.LoginReducer,
        HomeReducer: state.HomeReducer

    }
}

function mapDispatchToProps(dispatch) {
    return {
        setIsAuth: (data) => { dispatch(setIsAuth(data)) },
        setIsLoading: (data) => { dispatch(setIsLoading(data)) },
        addItem: (data) => { dispatch(addItem(data)) },
        updateItem: (data) => { dispatch(updateItem(data)) },
        deleteItem: (data) => { dispatch(deleteItem(data)) },
        updateItems: (data) => { dispatch(updateItems(data)) },
        Toggle: () => { dispatch(Toggle()) },
        updateItemData: (data) => { dispatch(updateItemData(data)) },
        updateTitle: (data) => { dispatch(updateTitle(data)) },
        updateIndex: (data) => { dispatch(updateIndex(data)) },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);