import React, { Component } from 'react';
import { API_URL } from '../config';
import axios from 'axios';
import { PieChart } from 'react-minimal-pie-chart';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'
import Col from 'react-bootstrap/Col'
import BarChart from 'react-bar-chart';
var randomColor = require('randomcolor');
const margin = { top: 20, right: 100, bottom: 30, left: 100 };

class Analytics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nations: {},
            topRatings: [],
            footStats: [],
            postitionStats: {},
            wageStats: [],
            width:1150
        };

    }
    handleBarClick(element, id){ 
        console.log(`The bin ${element.text} with id ${id} was clicked`);
      }

    componentDidMount() {
        window.onresize = () => {
            this.setState({width: this.refs.root.offsetWidth}); 
           };

        axios({
            method: 'get',
            url: `${API_URL}/getNationality`
        })
            .then((data) => {
                this.setState({
                    nations: data.data.map((each) => {
                        return (
                            { "title": each[0], "value": each[1], "color": randomColor() }
                        )
                    })
                })
            })

        axios({
            method: 'get',
            url: `${API_URL}/getPositionStats`
        })
            .then((data) => {
                this.setState({
                    postitionStats: data.data.map((each) => {
                        return (
                            { "title": each[0], "value": each[1], "color": randomColor() }
                        )
                    })
                })
            })

        axios({
            method: 'get',
            url: `${API_URL}/getWageStats`
        })
            .then((data) => {
                this.setState({
                    wageStats: data.data.map((each) => {
                        return (
                            { "text": each[0], "value": each[1] }
                        )
                    })
                })
            })


        axios({
            method: 'get',
            url: `${API_URL}/getTopRatings`
        })
            .then((data) => {
                this.setState({
                    topRatings: data.data
                })
            })


        axios({
            method: 'get',
            url: `${API_URL}/getFootStats`
        })
            .then((data) => {
                this.setState({
                    footStats: data.data
                })
            })
    }



    render() {
        return (
            <Container>
                <Row>
                    
                    <Col>
                    <div >
                    <h4 style={{ textAlign: "center" }}>Wage Stats</h4>
                            <BarChart 
                                ylabel='Wage in Euros'
                                xlabel = 'Players'
                                width={this.state.width}
                                height={500}
                                margin={margin}
                                data={this.state.wageStats}
                                
                                />
                        </div>
                       
                    </Col>
                </Row>
                <br />
                <br />
                <Row>
                        <Col>
                        
                        <div>
                            <h4 style={{ textAlign: "center" }}>Player Foot Stats</h4>
                            <Table striped bordered hover variant="light">

                                <tbody>
                                    <tr>
                                        {this.state.footStats.map((each) => {
                                            return (

                                                <td><strong>{each[0]} :</strong> {each[1]}</td>

                                            )
                                        })}
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                        
                    </Row>
                    <br />
                    <br />
                <Row>
                    
                <Col>
                        <div>
                            <h4 style={{ textAlign: "center" }}>Top 10 by Nationality</h4>
                            <PieChart
                                data={this.state.nations}
                                label={({ dataEntry }) => dataEntry.title.concat(" - ").concat(dataEntry.value)}
                                labelPosition="70"
                                labelStyle={{
                                    fontSize: "20%"
                                }}
                            />;
                        </div>
                    </Col>
                    <Col>
                    <div>
                            <h4 style={{ textAlign: "center" }}>Top 10 Players</h4>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Player</th>
                                        <th>Rating</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.topRatings.map((each) => {
                                        return (
                                            <tr>
                                                <td>{each[0]}</td>
                                                <td>{each[1]}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                    <Col> <div>
                        <h4 style={{ textAlign: "center" }}>Position Stats</h4>
                        <PieChart
                            data={this.state.postitionStats}
                            label={({ dataEntry }) => dataEntry.title.concat(" - ").concat(dataEntry.value)}
                            labelPosition="70"
                            labelStyle={{
                                fontSize: "20%"
                            }}
                        />;
                        </div></Col>
                   
                </Row>
            </Container>





        );
    }
}

export default Analytics;
