import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link,withRouter} from "react-router-dom";
import * as API from "./../api/API";
import Navbarmain from "./Navbarmain";
import  "./CSS/general.css";
import {Typeahead} from 'react-bootstrap-typeahead';
import {setProfile} from "../actions";

class userProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            disabletags: {
              firstname: true,
              lastname: true,
              email: true,
              aboutme: true,
              phonenumber: true,
              skilltag: true,
              updatebutton : false,

            },

            userdetails: {
                userId : localStorage.getItem("userId"),
                firstname: '',
                lastname: '',
                email: '',
                aboutme: '',
                phonenumber: '',
                profilepicpath: '',
                profilepic : ''
            },
            userskills: [{id:1, name:'Java'}],
            skills:[{id:1, name:'Java'}]
        };
        var payload ={id:'admin@gmail.com'};
        // API.fetchskills(payload)
        //     .then(
        //         (response) =>{
        //             console.log(response);
        //             console.log("-----------------------");
        //             this.setState({
        //                 skills : response
        //             });
        //         }
        //     );

        var payload ={userid: localStorage.getItem("userId")};
        API.fetchUserDetails(payload)
            .then(
                (response) =>{
                    console.log("Inside response");
                    // this.setState({
                    //     userdetails : {
                    //         ...this.state.userdetails,
                    //         firstname : response.userdetails[0].firstname,
                    //         lastname : response.userdetails[0].lastname,
                    //         email : response.userdetails[0].email,
                    //         aboutme : response.userdetails[0].prof_headline,
                    //         phonenumber : response.userdetails[0].phone,
                    //         profilepicpath : response.userdetails[0].profilepicpath
                    //     }
                    // })
                }
            );



        // this.handleOptionSelected = this.handleOptionSelected.bind(this);
        this.editprofile = this.editprofile.bind(this);
        this.updateuserProfile = this.updateuserProfile.bind(this);

    };

    componentDidMount() {

        // //var filepath ={filepath : this.state.userdetails.profilepicpath}
        // var filepath = "./uploads/docmyfile-1521273837677.635704345796715384.jpg"
        // API.getuserPic(filepath)
        // .then(
        //     (response) =>{
        //         this.setState({
        //             userdetails : {
        //                 ...this.state.userdetails,
        //                 profilepic : response,
        //
        //             }
        //         })
        //     })
        // };


        // handleOptionSelected(option){
        //
        // }
    }
    editprofile(option){
        this.setState({
            disabletags: {
                ...this.state.disabletags,
                firstname: false,
                lastname: false,
                email:false,
                aboutme: false,
                phonenumber: false,
                updatebutton: true
            }
        });
    }


    updateuserProfile(option){
        this.props.dispatch(this.props.setProfile(this.state.userdetails));
    }


    render() {
        return (
            <div>
            <Navbarmain/>
                <div className="container-fluid">
                    <div className= "text-left float-left"><h3>User Details</h3></div>
                    <div><button className="btn btn-primary float-right" onClick={this.editprofile}>Edit Profile</button></div>
                </div>


                {/*<div className="container-fluid panel panel-default border text-left">*/}
                    {/*<div className="row ">*/}
                        {/*<div className="col-sm-2 font-weight-bold">First Name:</div><input type="text" className="col-sm-4"  value={this.state.userdetails.firstname} disabled = {this.state.disabletags.firstname}*/}
                                                                                           {/*onChange={(event) => {*/}
                                                                                               {/*this.setState({*/}
                                                                                                   {/*userdetails: {*/}
                                                                                                       {/*...this.state.userdetails,*/}
                                                                                                       {/*firstname: event.target.value*/}
                                                                                                   {/*}*/}
                                                                                               {/*});*/}
                                                                                           {/*}}></input>*/}
                    {/*</div>*/}
                    {/*<div className="row ">*/}
                        {/*<div className="col-sm-2 font-weight-bold">Last Name:</div><input type="text" className="col-sm-4"  value={this.state.userdetails.lastname} disabled = {this.state.disabletags.lastname}*/}
                                                                                          {/*onChange={(event) => {*/}
                                                                                              {/*this.setState({*/}
                                                                                                  {/*userdetails: {*/}
                                                                                                      {/*...this.state.userdetails,*/}
                                                                                                      {/*lastname: event.target.value*/}
                                                                                                  {/*}*/}
                                                                                              {/*});*/}
                                                                                          {/*}}></input>*/}
                    {/*</div>*/}
                    {/*<div className="row ">*/}
                        {/*<div className="col-sm-2 font-weight-bold">Email Name:</div><input type="text" className="col-sm-4"  value={this.state.userdetails.email} disabled = {this.state.disabletags.email}*/}
                                                                                           {/*onChange={(event) => {*/}
                                                                                               {/*this.setState({*/}
                                                                                                   {/*userdetails: {*/}
                                                                                                       {/*...this.state.userdetails,*/}
                                                                                                       {/*email: event.target.value*/}
                                                                                                   {/*}*/}
                                                                                               {/*});*/}
                                                                                           {/*}}></input>*/}
                    {/*</div>*/}
                    {/*<div className="row ">*/}
                        {/*<div className="col-sm-2 font-weight-bold">About Me:</div><input type="text" className="col-sm-4"  value={this.state.userdetails.prof_headline} disabled = {this.state.disabletags.aboutme}*/}
                                                                                         {/*onChange={(event) => {*/}
                                                                                             {/*this.setState({*/}
                                                                                                 {/*userdetails: {*/}
                                                                                                     {/*...this.state.userdetails,*/}
                                                                                                     {/*aboutme: event.target.value*/}
                                                                                                 {/*}*/}
                                                                                             {/*});*/}
                                                                                         {/*}}></input>*/}
                    {/*</div>*/}
                    {/*<div className="row ">*/}
                        {/*<div className="col-sm-2 font-weight-bold">Phone number:</div><input type="text" className="col-sm-4"  value={this.state.userdetails.phonenumber} disabled = {this.state.disabletags.phonenumber}*/}
                                                                                             {/*onChange={(event) => {*/}
                                                                                                 {/*this.setState({*/}
                                                                                                     {/*userdetails: {*/}
                                                                                                         {/*...this.state.userdetails,*/}
                                                                                                         {/*phonenumber: event.target.value*/}
                                                                                                     {/*}*/}
                                                                                                 {/*});*/}
                                                                                             {/*}}></input>*/}
                    {/*</div>*/}
                    {/*<div className="row">*/}
                        {/*<div className="col-sm-2 font-weight-bold">Skills:</div>*/}
                        {/*<Typeahead*/}
                            {/*multiple*/}
                            {/*labelKey="name"*/}
                            {/*selected = {this.state.userskills}*/}
                            {/*options={this.state.skills}*/}
                            {/*placeholder="What Skills are required? "*/}
                            {/*onChange={this.handleOptionSelected}*/}
                        {/*/>*/}
                    {/*</div>*/}
                    {/*<div className="col-sm-2 font-weight-bold">*/}
                        {/*<div className="row">*/}
                        {/*{ this.state.disabletags.updatebutton ? <button className="btn btn-primary" onClick={this.updateuserProfile}>Update</button> : null }*/}
                        {/*</div>*/}
                    {/*</div>*/}

                {/*</div>*/}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch)=>{
    console.log("mapDispatchToProps");
    let actions = {setProfile};
    return { ...actions, dispatch };
}

const mapStateToProps = (state) => {
    return {
        userId :state.signUpReducer.userId,
        userDetailsL : state.actionReducer.userDetails,
        userDetailsS : state.signUpReducer.userDetails
    }
}


export default withRouter(connect(null ,mapDispatchToProps)(userProfile));