import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { On_ChangeModalMongo as changeModalMongo, addItemMongo, updateItemMongo } from '../../actions';

import axios from 'axios';

import axiosError from 'axios-error';

import { openSuccessNotification, openErrorNotification } from '../notification';

class EditFormMongo extends React.Component {



    onChange = e => {
        var data = {
            "name": e.target.name,
            "value": e.target.value
        }

        this.props.changeModalMongo(data);

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
                person_name: this.props.MongoModalReducer.person_name,
                business_name: this.props.MongoModalReducer.business_name,
                business_gts_number: this.props.MongoModalReducer.business_gts_number

            }
            const response = await axios.post('http://127.0.0.1:5000/business/add', JSON.stringify(body), header);
            body['_id'] = response.config.data["_id"];
            this.props.toggleMongo()
            this.props.addItemMongo(body)


            openSuccessNotification({ placement: "bottomRight" })
        } catch (e) {

            var err = new axiosError(e);
            //  console.log(e.response.data.err)
            // window.alert(e.response.data.err)
            // this.props.
            openErrorNotification({ placement: "bottomRight", err: e.response.data.err })

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
                _id: this.props.MongoModalReducer._id,
                person_name: this.props.MongoModalReducer.person_name,
                business_name: this.props.MongoModalReducer.business_name,
                business_gts_number: this.props.MongoModalReducer.business_gts_number,

            }
            const response = await axios.put('http://127.0.0.1:5000/business/update', body, header);

            console.log(response.config.data)
            var data = {
                _id: this.props.MongoModalReducer._id,
                person_name: this.props.MongoModalReducer.person_name,
                business_name: this.props.MongoModalReducer.business_name,
                business_gts_number: this.props.MongoModalReducer.business_gts_number,
                Errors: this.props.MongoModalReducer.Errors
            }
            this.props.updateItemMongo(data);
            this.props.toggleMongo()
            //    this.props.createNotification()


            openSuccessNotification({ placement: "bottomRight" })



        } catch (e) {

            var err = new axiosError(e);

            const data = {
                Errors: e.response.data.err

            }
            this.props.toggleMongo()
            //  this.props.Errors(data)
            openErrorNotification({ placement: "bottomRight", err: e.response.data.err })

            //  console.log(e.response.data.err)
            // window.alert(e.response.data.err)
        }

    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    render() {

        return (

            <Form onSubmit={Number(this.props.MongoModalReducer.Index) !== -1 ? this.submitFormEdit : this.submitFormAdd} >

                <FormGroup>
                    <Label for="person_name">Name</Label>
                    <Input type="text" name="person_name" id="person_name"
                        onChange={this.onChange}
                        placeholder={this.props.MongoModalReducer.person_name} />
                </FormGroup>
                <FormGroup>
                    <Label for="business_name">Business</Label>
                    <Input type="text" name="business_name" id="business_name"
                        onChange={this.onChange}
                        placeholder={this.props.MongoModalReducer.business_name} />
                </FormGroup>
                <FormGroup>
                    <Label for="business_gts_number">Number</Label>
                    <Input type="number" name="business_gts_number" id="business_gts_number"
                        onChange={this.onChange}
                        placeholder={this.props.MongoModalReducer.business_gts_number} />
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
        MongoModalReducer: state.MongoModalReducer,
        AboutReducer: state.AboutReducer,
    }
}

const mapDispatchToProps = {
    changeModalMongo,
    updateItemMongo,
    addItemMongo
}

export default connect(mapStateToProps, mapDispatchToProps)(EditFormMongo)