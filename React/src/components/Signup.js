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

const history = createBrowserHistory()

class Signup extends Component {
//{"email":"geeta@abc.com","username":"geeta","password":"geeta123","role":"Work"}
    state = {
        userdata: {
            email: '',
            username: '',
            password: '',
            role: ''
        },
        isSignedIn: false,
        messageSignup: '',
        emailValid: true,
        usernameValid: true,
        passwordValid: true
    };

    validateEmail() {

        var emailId = this.state.userdata.email;
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailId))
        {
            return (true)
        }
        return (false)
    }
    validateUsername() {

        var username = this.state.userdata.username;
        if (username != '')
        {
            return (true)
        }
        return (false)
    }
    validatePassword() {

        var password = this.state.userdata.password;
        if (password != '' && password.length >= 6 && /\d/.test(password))
        {
            return (true)
        }
        return (false)
    }




    handleSubmit = () => {

        if(this.validateEmail() == true) {
            if(this.validateUsername() == true) {
                    if(this.validatePassword() == true) {
                        this.props.dispatch(this.props.registerUser(this.state.userdata));
                    }
                    else
                    {
                        //this.state.passwordValid = false;
                        this.setState({passwordValid: false})
                    }
            }
            else
            {
                //this.state.usernameValid = false;
                this.setState({usernameValid: false})
            }
        }
        else {
            this.setState({emailValid: false})
        }
    };

    componentWillReceiveProps(nextProps){
        if(nextProps.isSignedIn === true){
            nextProps.history.push('/setprofile');
        }
    }

    render() {
        return (
            <div className="container-fluid">
                    <div className="row justify-content-md-center">
                        <form className="col-sm-12 col-md-3 align-self-center border">
                            <LogoImage className="image"/>
                            <hr />
                            <div className="form-group"><h5>Sign up for free today!</h5></div>

                            <div className="row justify-content-md-center">
                                <div className="form-group">
                                    {this.props.messageSignup && (
                                        <div className="form-control alert alert-warning text-danger" role="alert">
                                            {this.props.messageSignup}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="text-left">
                                { this.state.emailValid ? null : <div className="text-input-error-wrapper text-left errormessage">Please enter valid email address.</div>}
                            </div>
                            <div className="form-group"><input className="form-control" type="email" name="email" label="Email" placeholder="Enter Email" value={this.state.userdata.email}
                                    onChange={(event) => {
                                        this.setState({
                                            userdata: {
                                                ...this.state.userdata,
                                                email: event.target.value
                                            }

                                        });
                                    }}
                                     onFocus={(event) => {
                                         this.setState({emailValid: true});
                                     }}
                                />
                            </div>

                            <div className="text-left">
                                { this.state.usernameValid ? null : <div className="text-input-error-wrapper text-left errormessage">Please enter username.</div>}
                            </div>
                            <div className="form-group"><input className="form-control" type="text" label="Username" placeholder="Enter Username" value={this.state.userdata.username}
                                                               onChange={(event) => {
                                                                   this.setState({
                                                                       userdata: {
                                                                           ...this.state.userdata,
                                                                           username: event.target.value
                                                                       }
                                                                   });
                                                               }}
                                                               onFocus={(event) => {
                                                                   this.setState({usernameValid: true});
                                                               }}
                            />
                            </div>

                            <div className="text-left">
                                { this.state.passwordValid ? null : <div className="text-input-error-wrapper text-left errormessage">Password must contain more than 6 character and digit.</div>}
                            </div>
                            <div className="form-group">
                                <input className="form-control" type="password" label="password" placeholder="Enter Password" value={this.state.userdata.password}
                                       onChange={(event) => {this.setState({
                                            userdata: {
                                                ...this.state.userdata,
                                                password: event.target.value
                                            }
                                        });
                                    }}
                                       onFocus={(event) => {
                                           this.setState({passwordValid: true});
                                       }}
                                />
                            </div>

                            <div className="form-group form-inline">
                                <div className="btn custom-radio border" id="role1">
                                <label className="form-inline">
                                <input className="form-inline" name="Role" type="radio" label="Hire" value="Hire"
                                       onChange={(event) => {this.setState({
                                           userdata: {
                                               ...this.state.userdata,
                                               role: event.target.value
                                           }
                                       });
                                       }}
                                />Hire</label>
                                </div>
                                <div className="btn custom-radio border"  id="role2">
                                <label className="form-inline">
                                    <input className="form-inline" name="Role" type="radio" label="Hire" value="Work"
                                           onChange={(event) => {this.setState({
                                               userdata: {
                                                   ...this.state.userdata,
                                                   role: event.target.value
                                               }
                                           });
                                           }}
                                    />Work</label></div>
                            </div>

                            <div className="form-group">
                                <button
                                    className="btn btn-primary btn-large font-weight-bold"
                                    type="button"
                                    onClick={() => this.handleSubmit()}>
                                    Create Account
                                </button>
                            </div>
                            <hr />
                            <div className="form-group"><p className="small">Already a Freelancer.com member? <Link to = "/signup">Log In</Link></p></div>

                        </form>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch)=>{
    console.log("mapDispatchToProps");
    let actions = {registerUser};
    return { ...actions, dispatch };
}
const mapStateToProps = (state) => {
    console.log("mapStateToProps");
    return {
        isSignedIn: state.signUpReducer.isSignedIn,
        messageSignup: state.signUpReducer.messageSignup
    }
}

export default withRouter(connect(mapStateToProps ,mapDispatchToProps)(Signup));