import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link,withRouter} from "react-router-dom";
import * as API from "./../api/API";
import Navbarmain from "./Navbarmain";
import  "./CSS/general.css";
import {Typeahead} from 'react-bootstrap-typeahead';
import {setProfile} from "../actions";
import 'react-bootstrap-typeahead/css/Typeahead.css';

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
              profileFile:true,
              updatebutton : false,


            },

            userdetails: {
                userId : localStorage.getItem("userId"),
                firstname: '',
                lastname: '',
                email: '',
                aboutme: '',
                phonenumber: '',
                profileFile: '',
                profilepic : '',
                bloburl:'',
                userskills:''
            },
            skills:[]
        };
        var payload ={id:'admin@gmail.com'};
        API.fetchskills(payload)
            .then(
                (response) =>{
                    console.log(response);
                    console.log("-----------------------");
                    this.setState({
                        skills : response.skill
                    });
                }
            );





        // this.handleOptionSelected = this.handleOptionSelected.bind(this);
        this.editprofile = this.editprofile.bind(this);
        this.updateuserProfile = this.updateuserProfile.bind(this);

    };



    handleFileUpload = (event) => {

        const payload = new FormData();

        payload.append('myfile', event.target.files[0]);


        API.uploadFile(payload)
            .then((response) => {
                if (response.success) {
                    alert("Pic uploaded: Upload again to replace file");
                    this.setState({
                        userdetails: {
                            ...this.state.userdetails,
                            profileFile: "./uploads/doc/" + response.filename

                        }
                    });
                }

                //console.log(this.state.userdetails.profileFile);
            });
    };

    editprofile(option){
        this.setState({
            disabletags: {
                ...this.state.disabletags,
                firstname: false,
                lastname: false,
                email:false,
                aboutme: false,
                phonenumber: false,
                profileFile: false,
                skilltag:false,
                updatebutton: true
            }
        });
    }


    updateuserProfile(option){
        this.props.dispatch(this.props.setProfile(this.state.userdetails))
    }


    componentWillReceiveProps(nextProps) {
        console.log("inside component will render");
        if (nextProps.isSetProfile === true) {
            console.log(nextProps.userDetailsS);

            var arrayBufferView = new Uint8Array(nextProps.userDetailsS.encodeImage.data );
            var blob = new Blob( [ arrayBufferView ], { type: "image/jpg" } );
            var urlCreator = window.URL || window.webkitURL;
            var imageUrl = urlCreator.createObjectURL( blob );
            nextProps.userDetailsS.bloburl = imageUrl;
            console.log(imageUrl);


            this.setState({
                userdetails: {
                    ...this.state.userdetails,
                    firstname: nextProps.userDetailsS.firstname,
                    lastname: nextProps.userDetailsS.lastname,
                    email: nextProps.userDetailsS.email,
                    aboutme: nextProps.userDetailsS.aboutme,
                    phonenumber: nextProps.userDetailsS.phonenumber,
                    profileFile: nextProps.userDetailsS.profileFile,
                    bloburl : nextProps.userDetailsS.bloburl,
                    userskills: nextProps.userDetailsS.userskills
                }
            });
            this.setState({
                disabletags: {
                    firstname: true,
                    lastname: true,
                    email: true,
                    aboutme: true,
                    phonenumber: true,
                    skilltag: true,
                    profileFile: true,
                    updatebutton: false,

                }
            });
        }
    }

    componentDidMount() {
        var payload ={userid: localStorage.getItem("userId")};
        API.fetchUserDetails(payload)
            .then(
                (response) =>{

                    if(response.value.length != 0) {
                        response.value.map(user => {

                            var arrayBufferView = new Uint8Array(user.encodeImage.data);
                            var blob = new Blob([arrayBufferView], {type: "image/jpg"});
                            var urlCreator = window.URL || window.webkitURL;
                            var imageUrl = urlCreator.createObjectURL(blob);
                            user.bloburl = imageUrl;
                            console.log(imageUrl);

                        });
                    }
                    console.log("Inside response");
                    this.setState({
                        userdetails : {
                            ...this.state.userdetails,
                            firstname : response.value[0].firstname,
                            lastname : response.value[0].lastname,
                            email : response.value[0].email,
                            aboutme : response.value[0].aboutme,
                            phonenumber : response.value[0].phonenumber,
                            profileFile : response.value[0].profileFile,
                            bloburl : response.value[0].bloburl,
                            userskills:response.value[0].userskills
                        }
                    })


                    console.log(this.state.userdetails);
                }
            );
        }

    render() {
        return (
            <div>
            <Navbarmain/>
                <div className="container-fluid">
                    <div className= "text-left float-left"><h3>User Details</h3></div>




                    <div><button className="btn btn-primary float-right" onClick={this.editprofile}>Edit Profile</button></div>
                </div>


                <div className="container-fluid panel panel-default border text-left">
                    <div className="row align-content-md-center justify-content-center">
                        <div className="align-content-md-center justify-content-center"><img className="img-rounded" src = {this.state.userdetails.bloburl} height="130"></img></div>
                    </div>
                    <br/>
                    <div className="row align-content-md-center justify-content-center">
                        <div className="col-sm-2 font-weight-bold">Profile Pic:</div><input className="col-sm-4" disabled = {this.state.disabletags.profileFile}
                                                                                        type="file" id="file" name="file"
                                                                                        label="profilepic"
                                                                                        onChange={this.handleFileUpload}
                                                                                    />
                    </div>
                    <div className="row align-content-md-center justify-content-center">
                        <div className="col-sm-2 font-weight-bold">First Name:</div><input type="text" className="col-sm-4"  value={this.state.userdetails.firstname} disabled = {this.state.disabletags.firstname}
                                                                                           onChange={(event) => {
                                                                                               this.setState({
                                                                                                   userdetails: {
                                                                                                       ...this.state.userdetails,
                                                                                                       firstname: event.target.value
                                                                                                   }
                                                                                               });
                                                                                           }}></input>
                    </div>
                    <div className="row align-content-md-center justify-content-center">
                        <div className="col-sm-2 font-weight-bold">Last Name:</div><input type="text" className="col-sm-4"  value={this.state.userdetails.lastname} disabled = {this.state.disabletags.lastname}
                                                                                          onChange={(event) => {
                                                                                              this.setState({
                                                                                                  userdetails: {
                                                                                                      ...this.state.userdetails,
                                                                                                      lastname: event.target.value
                                                                                                  }
                                                                                              });
                                                                                          }}></input>
                    </div>
                    <div className="row align-content-md-center justify-content-center">
                        <div className="col-sm-2 font-weight-bold">Email Name:</div><input type="text" className="col-sm-4"  value={this.state.userdetails.email} disabled = {this.state.disabletags.email}
                                                                                           onChange={(event) => {
                                                                                               this.setState({
                                                                                                   userdetails: {
                                                                                                       ...this.state.userdetails,
                                                                                                       email: event.target.value
                                                                                                   }
                                                                                               });
                                                                                           }}></input>
                    </div>
                    <div className="row align-content-md-center justify-content-center">
                        <div className="col-sm-2 font-weight-bold">About Me:</div><input type="text" className="col-sm-4"  value={this.state.userdetails.aboutme} disabled = {this.state.disabletags.aboutme}
                                                                                         onChange={(event) => {
                                                                                             this.setState({
                                                                                                 userdetails: {
                                                                                                     ...this.state.userdetails,
                                                                                                     aboutme: event.target.value
                                                                                                 }
                                                                                             });
                                                                                         }}></input>
                    </div>
                    <div className="row align-content-md-center justify-content-center">
                        <div className="col-sm-2 font-weight-bold">Phone number:</div><input type="text" className="col-sm-4"  value={this.state.userdetails.phonenumber} disabled = {this.state.disabletags.phonenumber}
                                                                                             onChange={(event) => {
                                                                                                 this.setState({
                                                                                                     userdetails: {
                                                                                                         ...this.state.userdetails,
                                                                                                         phonenumber: event.target.value
                                                                                                     }
                                                                                                 });
                                                                                             }}></input>
                    </div>
                    <div className="row align-content-md-center justify-content-center">
                        <div className="col-sm-2 font-weight-bold">Skills:</div>
                        <Typeahead
                            className="col-sm-4"
                            multiple
                            labelKey="name"
                            disabled={this.state.disabletags.skilltag}
                            selected = {this.state.userdetails.userskills}
                            options={this.state.skills}
                            placeholder="What Skills are required? "
                            onChange={this.handleOptionSelected}
                        />
                    </div>
                    <div className="col-sm-12 font-weight-bold">
                        <div className="row align-content-md-center justify-content-center">
                        { this.state.disabletags.updatebutton ? <button className="btn btn-primary btn-lg" onClick={this.updateuserProfile}>Update</button> : null }
                        </div>
                    </div>

                </div>
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
        userDetailsS : state.signUpReducer.userDetails,
        isSetProfile: state.signUpReducer.isSetProfile,
    }
}
export default withRouter(connect(mapStateToProps ,mapDispatchToProps)(userProfile));