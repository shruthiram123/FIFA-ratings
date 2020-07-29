import React, { Component } from 'react';
import { API_URL } from '../config';
import axios from 'axios';

class Add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: {}
        };
        this.onChangeInp = this.onChangeInp.bind(this);
        this.processEdit = this.processEdit.bind(this);
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: `${API_URL}/getHeadings`
        })
            .then((data) => {
                //const res = arr.reduce((a,b)=> (a[b]='',a),{});
                this.setState({
                    selected:  data.data.headings.reduce((a,b)=> (a[b]='',a),{})       
            })
    })
    }

    onChangeInp(e) {
        let name = e.target.name
        let value = e.target.value
        this.state.selected[name] = value
        this.forceUpdate();
        //console.log("updatedstuff",this.state.selected)
    }

    processEdit() {     
        const { match: { params } } = this.props;
        let fd = new FormData();
        fd.append("id", this.state.selected["ID"]);
        fd.append("data", Object.values(this.state.selected).toString());
         
        axios({
            method: 'post',
            url: `${API_URL}/addPlayer`,
            data: fd
        }).then((data) => {
            this.props.history.push("/")
        })
    }

    render() {
console.log("yolo",this.state.selected)
        return (
            <div className="container-fluid">
                <h4>Edit Record</h4>

                <br />
                <div>
                    <form>
                        {this.state.selected && Object.keys(this.state.selected).map((each) => {

                            return (

                                <label> <strong>{each}</strong>
                                    <input  type="text" name={each} onChange={this.onChangeInp}  defaultValue={this.state.selected && this.state.selected[each]} />
                                </label>


                            )
                        })}
                    </form>
                </div>

                <button type="button" onClick={this.processEdit} className="btn btn-primary next">Submit</button>


            </div>
        );
    }
}

export default Add;
