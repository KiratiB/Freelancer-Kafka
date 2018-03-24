import React, {Component} from 'react';
import * as API from '../api/API';
import "./CSS/general.css";
import LogoImage from "./LogoImage";
import {Link} from "react-router-dom";
import {FormErrors} from "./FormErrors"
import {authenticateUser,registerUser} from "../actions";
import {connect} from "react-redux";
import {createBrowserHistory} from "history"
import {BrowserRouter} from 'react-router-dom';
import { Route, withRouter } from 'react-router-dom';
import {Tab,Tabs} from "react-bootstrap";
import Myproject from "./Myproject-Home"
import InternalDashboard from "./InternalDashboard"
import Navbarmain from "./Navbarmain";

class dashboard extends Component {

    // static propTypes = {
    //     handleSubmit: PropTypes.func.isRequired
    // };
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            view:"projects"

        };
    }
    render(){
        return(
            <div>
                <Navbarmain/>
                <Myproject/>
            </div>

        )
    }
}
const mapStateToProps = (state) => {
    console.log("mapStateToProps");
    return {
        userId: state.actionReducer.userId
    }
}


export default connect(mapStateToProps)(dashboard);