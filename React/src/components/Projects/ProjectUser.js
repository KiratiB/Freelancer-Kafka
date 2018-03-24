import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as API from "./../../api/API";
import {Link,withRouter} from "react-router-dom";
import projectReducer from "../../reducers/projectReducer";

class Projectuser extends Component {

    // static propTypes = {
    //     handleSubmit: PropTypes.func.isRequired
    // };
    constructor(props) {
        super(props);
        this.state = {
            users: []

        };
    }

    componentDidMount(){
        var payload ={project_id : this.props.projectid}
        API.fetchprojectusers(payload)
            .then(
                (response) =>{
                    this.setState({
                        users:response
                    })
                }
            );
    }

    display_users()
    {
        const item = this.state.users.map((users,index) =>{

            return(
                <div>
                    {users.email}
                    {users.username}
                </div>

            )
        });
        return(
            <div>
                {item}
            </div>
        )
    }

    render(){
        return(
            <div>
                {this.display_users()}
            </div>
        )
    }
}


export default Projectuser;
