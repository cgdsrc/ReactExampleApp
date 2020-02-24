import React, { Component } from 'react'
import { connect } from 'react-redux';

import MenuBar from '../../components/MenuBar/MenuBar';
import SocketDataTable from './SocketDataTable';
import Chart from './Chart';

class SocketPage extends Component {




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
                        <h1 style={{ margin: "20px 0" }}>Socket</h1>
                    </div>
                </div>
                <div className="row mx-0">
                    <div className="col-sm-12 col-md-12 col-lg-12 pr-0">

                        Burası neresi

                    </div>
                </div>
                <div className="row mx-0">
                    <div className="col-sm-12 col-md-12 col-lg-12 px-0">
                        <SocketDataTable
                        />
                    </div>
                    <hr style={{ width: "%100", height: "20px", color: "black" }} />
                    <div className="col-sm-12 col-md-12 col-lg-12 px-0">
                        <Chart legendPosition="bottom" />

                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        SocketReducer: state.SocketReducer
    }
}

export default connect(mapStateToProps)(SocketPage);