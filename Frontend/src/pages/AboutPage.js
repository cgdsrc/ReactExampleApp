import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setIsAuth, setIsLoading, updateItemsMongo, ToggleMongo, updateItemDataMongo, addItemMongo, deleteItemMongo, updateItemMongo, updateIndexMongo, updateTitleMongo } from '../actions/index';
import axios from 'axios';

import MenuBar from '../components/MenuBar/MenuBar';
import { Button } from 'reactstrap'
import DataTableMongo from '../components/Tables/DataTableMongo';
import MongoModal from '../components/Modals/MongoModal';

import { openInfoNotification } from '../components/notification';



var intervalId;
class About extends Component {


    ModalButton_OnClick(e) {
        var index = e.target.dataset.index;

        if (Number(index) !== -1) {
            this.props.updateTitleMongo('Edit Item')

            this.props.updateItemDataMongo(this.props.AboutReducer.Items[index]);
        }
        else {
            var data = {
                _id: null,
                person_name: '',
                business_name: "",
                business_gts_number: null,

            };

            this.props.updateTitleMongo('Add New Item')

            this.props.updateItemDataMongo(data);
        }

        this.props.updateIndexMongo(index)

        this.props.ToggleMongo();

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
        //605000

    }


    getItems = async () => {

        try {
            const header = {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth-Token': localStorage.getItem("token")
                }
            };
            const response = await axios.get('http://127.0.0.1:5000/business', header);

            console.log("data bu :" + response)
            this.props.updateItemsMongo(response.data)
            openInfoNotification({ placement: 'bottomRight' })
        } catch (e) {
            console.log(e.response)
        }

    }


    componentWillMount() {
        this.getItems();
        console.log(this.props.AboutReducer.Items);

    }








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
                        <h1 style={{ margin: "20px 0" }}>mongo DB</h1>
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

                        <MongoModal />

                    </div>
                </div>
                <div className="row mx-0">
                    <div className="col-sm-12 col-md-12 col-lg-12 px-0">
                        <DataTableMongo
                            items={this.props.AboutReducer.Items}
                            modalButtonOnClick={this.ModalButton_OnClick.bind(this)}
                            deleteItemMongo={this.props.deleteItemMongo
                            }
                        />
                    </div>
                </div>
            </div>
        )
    }
}




function mapStateToProps(state) {
    return {
        LoginReducer: state.LoginReducer,
        AboutReducer: state.AboutReducer
    }
}
function mapDispatchToProps(dispatch) {
    return {
        setIsAuth: (data) => { dispatch(setIsAuth(data)) },
        setIsLoading: (data) => { dispatch(setIsLoading(data)) },
        updateItemsMongo: (data) => { dispatch(updateItemsMongo(data)) },
        ToggleMongo: () => { dispatch(ToggleMongo()) },
        updateItemDataMongo: (data) => { dispatch(updateItemDataMongo(data)) },
        addItemMongo: (data) => { dispatch(addItemMongo(data)) },
        updateItemMongo: (data) => { dispatch(updateItemMongo(data)) },
        deleteItemMongo: (data) => { dispatch(deleteItemMongo(data)) },
        updateTitleMongo: (data) => { dispatch(updateTitleMongo(data)) },
        updateIndexMongo: (data) => { dispatch(updateIndexMongo(data)) },

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(About);