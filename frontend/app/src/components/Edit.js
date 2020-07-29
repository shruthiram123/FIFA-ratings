import React, { Component } from 'react';
import { API_URL } from '../config';
import axios from 'axios';

class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: {}
        };
        this.onChangeInp = this.onChangeInp.bind(this);
        this.processEdit = this.processEdit.bind(this);
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        let fd = new FormData();
        fd.append("id", params.id);

        axios({
            method: 'post',
            url: `${API_URL}/getPlayerById`,
            data: fd,
        }).then((data) => {
            this.setState({
                selected: data.data
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
        fd.append("id", params.id);
        fd.append("data", Object.values(this.state.selected).toString());
         
        axios({
            method: 'post',
            url: `${API_URL}/editPlayerById`,
            data: fd
        }).then((data) => {
            this.props.history.push("/")
        })
    }

    render() {

        return (
            <div className="container-fluid">
                <h4>Edit Record</h4>

                <br />
                <div>
                    <form>
                        {this.state.selected && Object.keys(this.state.selected).map((each) => {

                            return (

                                <label> <strong>{each}</strong>
                                    <input disabled= {each == "ID" || each == "Serial"} type="text" name={each} onChange={this.onChangeInp}
                                        defaultValue={this.state.selected && this.state.selected[each]} />
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

export default Edit;
