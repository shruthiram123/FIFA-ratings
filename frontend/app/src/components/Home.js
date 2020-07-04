import React, { Component } from 'react';
import  { API_URL } from '../config';
import axios from 'axios';

export class Home extends Component {
    constructor(props){
        super();
        this.state = {
            serverStatus : ""
        }
        this.checkServerStatus = this.checkServerStatus.bind(this)
    }
    

    checkServerStatus = (e) => {
        e.preventDefault();

        axios({
            method : 'get',
            url : `${API_URL}/serverStatus`
        })
        .then((data)=>{
            this.setState({
                serverStatus : data.data
            })
        })
    }
    
    render() {
        return (
            <div>
                <button onClick={this.checkServerStatus}>Check server status</button>
                {this.state.serverStatus}
            </div>
        )
    }
}

export default Home
