import React, { Component } from 'react'
import { Bar, Line, Pie } from 'react-chartjs-2';

import { connect } from 'react-redux';



class Chart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chartData: []
        }
    }


    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'right',
        // location: 'City'
    }
    // getData() {
    //     this.setState({
    //         data: {
    //             labels: this.props.items.map(d => d.FieldId),
    //             datasets: [{
    //                 label: 'FİELDID-STATUS',
    //                 data: this.props.items.map(d => d.FieldValue.status),
    //                 backgroundColor: 'rgba(255, 99, 132, 0.6)'
    //             }]
    //         }
    //     })
    // }

    componentDidMount() {
        setInterval(this.renderTableData, 10000)
    }

    // getChartData() {
    //     // Ajax calls here
    //     if (typeof (this.props.SocketReducer) != "undefined") {
    //         this.setState({
    //             chartData: {
    //                 labels: [this.props.SocketReducer.items.map(d => d.FieldId)],
    //                 datasets: [
    //                     {
    //                         label: 'Population',
    //                         data: [
    //                             this.props.SocketReducer.items.map(d => d.FieldValue.status)
    //                         ],
    //                         backgroundColor: [
    //                             'rgba(255, 99, 132, 0.6)',
    //                             'rgba(54, 162, 235, 0.6)',
    //                             'rgba(255, 206, 86, 0.6)',
    //                             'rgba(75, 192, 192, 0.6)',
    //                             'rgba(153, 102, 255, 0.6)',
    //                             'rgba(255, 159, 64, 0.6)',
    //                             'rgba(255, 99, 132, 0.6)'
    //                         ]
    //                     }
    //                 ]
    //             }
    //         });
    //     }
    //     else return 0;
    // }
    getLabels(items) {
        var labels
        labels = items.map((data, index) => { return data.FieldId })
        return labels
    }

    getData(items) {
        var data
        data = items.map((data, index) => {
            return data.FieldValue.status
        })

        return data
    }

    renderTableData = () => {
        //console.log(this.state);

        const { items } = this.props.SocketReducer
        if (typeof (items) != 'undefined') {


            // state kullanımı kaldırılıp performans artırımı sağlanabilir
            this.setState({

                chartData: {

                    labels: this.getLabels(items), //["12313123","21323123"]
                    datasets: [
                        {
                            label: 'FİELD ID',
                            data: this.getData(items) //[1,2,0,1]
                            ,
                            backgroundColor:
                                'rgba(255, 99, 132, 0.6)'

                        }
                    ]


                }
            })
            console.log(this.state);



        }
    }
    render() {

        if ((this.props.SocketReducer.items.length) != 0) {
            return (

                <div className="chart">
                    <Bar



                        data={this.state.chartData}
                        options={{
                            title: {
                                display: "FİELDID",
                                text: 'FİELDID-STATUS',
                                fontSize: 25
                            },
                            legend: {
                                display: this.props.displayLegend,
                                position: this.props.legendPosition
                            }
                        }}
                    />

                </div>
            )
        }
        else {
            return (
                <div>
                    <h1 style={{ textAlign: "center", display: "block" }} >NO DATA</h1>
                </div >
            )
        }
    }

}

function mapStateToProps(state) {
    return {
        SocketReducer: state.SocketReducer

    }
}

export default connect(mapStateToProps)(Chart);