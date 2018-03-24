import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as API from "../api/API";
import {authenticateUser} from "../actions/index";
import "./CSS/general.css";
import LogoImage from "./LogoImage";
import {Link,withRouter} from "react-router-dom";
import {projectdetails} from "./../actions/index"
import {BootstrapTable} from "react-bootstrap-table"
import Navbarmain from "./Navbarmain";

class SelectedUserDetails extends Component {

    render() {
        return (
            <div className="container-fluid border text-left">
                <Navbarmain/>
                <img className="img-rounded" src = {this.props.userdetails.bloburl} height="42" />

                <div className="row">
                    <div className="col-sm-2 font-weight-bold">Name:</div><div className="col-sm-4" >{this.props.userdetails.firstname + this.props.userdetails.lastname}</div>
                </div>
                <div className="row">
                    <div className="col-sm-2 font-weight-bold">Email:</div><div className="col-sm-4" >{this.props.userdetails.email}</div>
                </div>
                <div className="row">
                    <div className="col-sm-2 font-weight-bold">Phone Number:</div><div className="col-sm-4" >{this.props.userdetails.phonenumber}</div>
                </div>
                <div className="row">
                    <div className="col-sm-2 font-weight-bold">Skills:</div><div className="col-sm-4" > Java , Full stack developer</div>
                </div>
                <div className="row">
                    <div className="col-sm-2 font-weight-bold">Bid Value:</div><div className="col-sm-4" >{this.props.userdetails.bid_value}</div>
                </div>
                <div className="row">
                    <div className="col-sm-2 font-weight-bold">Bid Period:</div><div className="col-sm-4" >{this.props.userdetails.bid_period}</div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userdetails: state.projectReducer.selecteduserDetails,
    }
}


export default withRouter(connect(mapStateToProps, null)(SelectedUserDetails));