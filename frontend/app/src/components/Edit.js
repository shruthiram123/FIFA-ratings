import React, { Component } from 'react';
import { API_URL } from '../config';
import axios from 'axios';

class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: {}
        };

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

    render() {
      
        return (
            <div className = "container-fluid">
                <h4>Edit Record</h4>

                <br />
                <div>
                <form>
                    {this.state.selected && Object.keys(this.state.selected).map((each) => {
                        
                        return (
                           
                                <label> <strong>{each}</strong>
                                    <input type="text" name="each" defaultValue={this.state.selected && this.state.selected[each]} />
                                </label>
                               
                           
                        )
                    })}
                     </form>
                </div>

                <button type="button" onClick={this.updateBoth} className="btn btn-primary next">Submit</button>


            </div>
        );
    }
}

export default Edit;
