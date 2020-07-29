import React, { Component } from 'react';
import { API_URL } from '../config';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import ReactTable from 'react-table-v6'
import "react-table-v6/react-table.css";

//import "react-table/react-table.css";

export class Home extends Component {
    constructor(props) {
        super();
        this.state = {
            serverStatus: "",
            data: [],
            headingsRaw: [],
            headings: [],
            pages: -1,
            loading: false,
            selected: null,
            showModal:false
           
        }
        this.checkServerStatus = this.checkServerStatus.bind(this)
    }

    /* componentDidMount() {
        axios({
            method: 'get',
            url: `${API_URL}/getHeadings`
        })
            .then((data) => {
                this.setState({
                    headings: data.data.headings.map((each) => {
                        return({
                            "Header": each,
                            "accessor": each
                        })
                }),
                headingsRaw:data.data.headings
            })

    })
}  */

    checkServerStatus = (e) => {
        e.preventDefault();

        axios({
            method: 'get',
            url: `${API_URL}/serverStatus`
        })
            .then((data) => {
                this.setState({
                    serverStatus: data.data
                })
            })
    }

    /*  getHeadings = (e) => {
         axios({
             method : 'get',
             url : `${API_URL}/getHeadings`
         })
         .then((data)=>{
             this.setState({
                 headings : data.data
             })
         })
     } */

  /*   getPlayers(start, end) {
        let fd = new FormData();
        fd.append("start", start);
        fd.append("end", end);
        axios({
            method: 'post',
            url: `${API_URL}/getHeadings`,
            data: fd,
        }).then((data) => {
            this.setState({
                data: data.data,
                loading: false
            })
        })
    }

 */

 delRcord(playerId) {
    let fd = new FormData();
    fd.append("id", playerId);
     
    axios({
        method: 'post',
        url: `${API_URL}/deletePlayerById`,
        data: fd
    }).then((data) => {
        window.location.reload();
    })
 }

    render() {
       
        /* this.state.headingsRaw && this.state.headingsRaw.map((each) => {
            this.state.headings.concat({
                "Header": each,
                "accessor": each
            })
        }) */
        //console.log("data", this.state.data)
        return (
            <div className = "container-fluid">
                {/* <button onClick={this.checkServerStatus}>Check server status</button> */}
               
           {/*      {this.state.serverStatus} */}
                <ReactTable 
                    data={this.state.data} // should default to []
                    pages={this.state.pages} // should default to -1 (which means we don't know how many pages we have)
                    loading={this.state.loading}
                    manual // informs React Table that you'll be handling sorting and pagination server-side
                    defaultPageSize={10}
                    columns={this.state.headings}
                    className="-striped -highlight"
                    getTrProps={(state, rowInfo) => {
                        if (rowInfo && rowInfo.row) {
                          return {
                            onClick: (e) => {
                              this.setState({
                                selected: rowInfo.index
                              })
                            },
                            style: {
                              background: rowInfo.index === this.state.selected ? '#00afec' : 'white',
                              color: rowInfo.index === this.state.selected ? 'white' : 'black'
                            }
                          }
                        }else{
                          return {}
                        }
                      }}
                    onFetchData={(state, instance) => {
                        // show the loading overlay
                        this.setState({ loading: true })
                        // fetch your data
                        axios({
                            method: 'get',
                            url: `${API_URL}/getHeadings`
                        })
                            .then((data) => {
                                this.setState({
                                    pages: Math.ceil(data.data.total/state.pageSize),
                                    headings: data.data.headings.map((each) => {
                                        
                                        return({
                                            "Header": each,
                                            "accessor": each
                                        })
                                    
                                }),
                                    headingsRaw: data.data.headings
                                })
                            })

                         let start = state.pageSize * state.page + 1
                         let end = start + state.pageSize - 1

                         let fd = new FormData();
                         fd.append("start", start);
                         fd.append("end", end);
                         axios({
                             method: 'post',
                             url: `${API_URL}/getPlayers`,
                             data: fd,
                         }).then((data) => {
                             /* let finalArray = []
                             
                             data &&  data.data.map((each) => {
                                 let vals = ((Object.values(each)).toString()).split(",")
                                 console.log("vals",vals)

                                //  vals.map((each2,index) => {
                                //     let keys = this.state.headingsRaw
                                //     var innerObj = {};
                                //     keys[index] = each2[index];
                                //     finalArray.push(innerObj)
                                    
                                //  })
                               
                             }) */
                             this.setState({
                                 data: data.data,
                                 loading: false
                             })
                            // console.log("r",finalArray)
                         })
                         //this.getPlayers(start, end)
                       
                    }}
                />
                <br />
                <div className = "row" >
                <Button  disabled = {!this.state.selected} onClick={() => this.props.history.push("/Edit/"+this.state.data[this.state.selected].ID)}>Edit Selected</Button> &nbsp;
                <Button  disabled = {!this.state.selected} onClick={() => this.delRcord(this.state.data[this.state.selected].ID)}>Delete Selected</Button >&nbsp;
                <Button  onClick={() => this.props.history.push("/Add")}>Add Record</Button>
                </div>
            </div>
        )
    }
}

export default Home
