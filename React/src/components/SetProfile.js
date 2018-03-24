import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as API from "../api/API";
import {authenticateUser} from "../actions/index";
import "./CSS/general.css";
import LogoImage from "./LogoImage";
import {Link, withRouter} from "react-router-dom";
import {setProfile} from "../actions";
import ReactDOM from 'react-dom';
import Select from 'react-select';
import { Dropdown } from 'semantic-ui-react';
import Dropdowncustom from "./Dropdowncustom";
import {Typeahead} from 'react-bootstrap-typeahead';

class SetProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profileData: {
                userId: localStorage.getItem('userId'),
                firstname: '',
                lastname: '',
                email: '',
                phonenumber: '',
                aboutme: '',
                profileFile: '',
                userSkilstring: '',
                userskills: ''
            },
            skills:[],
            isSetProfile : false,
            messageProfile : "",
        };

        this.handleOptionSelected = this.handleOptionSelected.bind(this);

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
    }

    handleChange = (e) => {
        alert(e.target.value)
    }

    handleFileUpload = (event) => {

        const payload = new FormData();

        payload.append('myfile', event.target.files[0]);


        API.uploadFile(payload)
            .then((response) => {
                if (response.success) {
                    alert("Pic uploaded: Upload again to replace file");
                    this.setState({
                        profileData: {
                            ...this.state.profileData,
                            profileFile: "./uploads/doc/" + response.filename

                        }
                    });
                }
            });
    };


    handleSetProfile = () => {
        this.props.dispatch(this.props.setProfile(this.state.profileData));
    }

    componentDidUpdate() {
        ReactDOM.findDOMNode(this).scrollTop = 0
    }

    componentWillReceiveProps(nextProps){
        console.log("inside component will render");
        if (nextProps.isSetProfile === true) {
            nextProps.history.push('/dashboard');
                 // var payload = {userId: localStorage.getItem("userId"), skills: this.state.userskills};
                 // console.log(payload);
                 // API.addskillsToUser(payload)
                 //     .then(
                 //         (response) => {
                 //             if (response === 201) {
                 //                 nextProps.history.push('/dashboard');
                 //             }
                 //         }
                 //     );
             }
    }
    handleOptionSelected(option){
        this.setState({
            profileData: {
                ...this.state.profileData,
                userskills:option
            }
         });
        // var abc = option;
        // var result = abc.map(function(val) {
        //     return val.name;
        // }).join(',');
        // this.setState({
        //     profileData: {
        //         ...this.state.profileData,
        //         userSkilstring:result
        //     }
        // });
        //console.log(option);
    }

    render(){
        return(
            <div className="container-fluid">
                <div className="row justify-content-md-center">
                    {/*//justify-content-md-center*/}
                    <div className="col-sm-12 col-md-7 noBorder">
                        <Link to = "/mainpage"><LogoImage className="image"/></Link>
                        <br/>
                        <div className="text-left">
                        <h1 className="">Welcome to freelancer</h1>
                            <p><h5>Please setup your profile.</h5></p>
                        <br/>
                        </div>
                        <div className="text-left">
                            <h6 className="">PROFILE IMAGE</h6>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="file" id="file" name="file"
                                    label="profilepic"
                                    onChange={this.handleFileUpload}
                                />
                            </div>
                            <br/>
                        </div>
                        <div className="text-left">
                            <h6 className="">FULL NAME</h6>
                            <div className="row">
                                <div className="col">

                                    <input type="text" className="form-control"
                                           placeholder="First name"
                                           label="firstname"
                                           required
                                           value={this.state.profileData.firstname}
                                           onChange={(event) => {
                                           this.setState({
                                               profileData: {
                                               ...this.state.profileData,
                                               firstname: event.target.value
                                           }
                                           });
                                           }}

                                    />
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Last name"
                                           label="lastname"
                                           value={this.state.profileData.lastname}
                                           required
                                           onChange={(event) => {
                                               this.setState({
                                                   profileData: {
                                                       ...this.state.profileData,
                                                       lastname: event.target.value
                                                   }
                                               });
                                           }}

                                    />
                                </div>
                            </div>
                            <br/>
                        </div>
                        <div className="text-left">
                            <h6 className="">EMAIL</h6>
                            <div className="form-group">
                                <input
                                className="form-control"
                                type="text"
                                label="email"
                                required
                                placeholder="e.g. Build me a website"
                                value={this.state.profileData.email}
                                onChange={(event) => {
                                this.setState({
                                    profileData: {
                                ...this.state.profileData,
                                email: event.target.value
                                }
                                });
                                }}
                                />
                            </div>
                            <br/>
                        </div>
                        <div className="text-left">
                            <h6 className="">PHONE NO</h6>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="text"
                                    required
                                    label="phonenumber"
                                    placeholder="e.g. Build me a website"
                                    value={this.state.profileData.phonenumber}
                                    onChange={(event) => {
                                        this.setState({
                                            profileData: {
                                                ...this.state.profileData,
                                                phonenumber: event.target.value
                                            }
                                        });
                                    }}
                                />
                            </div>
                            <br/>
                        </div>
                        <div className="text-left">
                            <h6 className="">About Me</h6>
                            <div className="form-group">
                                <textarea rows="3"
                                          className="form-control"
                                          type="textarea"
                                          label="aboutme"
                                          placeholder="describe yourself here..."
                                          required
                                          value={this.state.profileData.aboutme}
                                          onChange={(event) => {
                                              this.setState({
                                                  profileData: {
                                                      ...this.state.profileData,
                                                      aboutme: event.target.value
                                                  }
                                              });
                                          }}
                                />
                            </div>
                            <br/>
                        </div>
                        <div className="text-left">
                            <h4 className="">What skills are required?</h4>
                            <Typeahead
                                clearButton
                                labelKey="name"
                                multiple
                                options={this.state.skills}
                                placeholder="What Skills are required? "
                                onChange={this.handleOptionSelected}
                            />
                        </div>
                        <div className="text-left">
                            <button
                                className="btn btn-primary font-weight-bold"
                                type="button"
                                onClick={() => {this.handleSetProfile()}}>
                                Set My Profile
                            </button>
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch)=>{
    console.log("mapDispatchToProps");
    let actions = {setProfile};
    return { ...actions, dispatch };
}
const mapStateToProps = (state) => {
    console.log("mapStateToProps");
    return {
        userId: state.signUpReducer.userId,
        isSetProfile: state.signUpReducer.isSetProfile,
        messageProfile: state.signUpReducer.messageProfile
    }
}
export default withRouter(connect(mapStateToProps ,mapDispatchToProps)(SetProfile));