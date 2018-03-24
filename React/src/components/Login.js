import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as API from "../api/API";
import {authenticateUser} from "../actions/index";
import "./CSS/general.css";
import LogoImage from "./LogoImage";
import {Link,withRouter} from "react-router-dom";

class Login extends Component {

    // static propTypes = {
    //     handleSubmit: PropTypes.func.isRequired
    // };
    constructor(props) {
        super(props);
        this.state = {
            userdata: {
                username: '',
                password: '',
            },
            isLoggedIn: false,
            message: ''
        };
    }

    handleLogin(event){
        this.props.dispatch(authenticateUser(this.state.userdata))
        //event.preventDefault();
    }


    componentWillMount(){
        if(localStorage.getItem('jwtToken')){
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.isLoggedIn === true){
            nextProps.history.push('/dashboard');
            //this.context.history.push('/signup');
        }
    }

    componentDidMount(){

    }


    render() {
        //console.log(this.props);
        return (
            <div className="container-fluid">
                <div className="row justify-content-md-center">
                    <form className="col-sm-12 col-md-3 align-self-center border">
                        <LogoImage className="image"/>
                        <hr />
                        <div className="form-group"><h5>Login</h5></div>
                        <div className="form-group">
                            <div >
                                {this.props.message && (
                                    <div className="alert alert-warning text-danger small" role="alert">
                                        {this.props.message}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                label="Username"
                                placeholder="Enter Email or Username"
                                value={this.state.userdata.username}
                                onChange={(event) => {
                                    this.setState({
                                        userdata: {
                                            ...this.state.userdata,
                                            username: event.target.value
                                        }
                                    });
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                className="form-control"
                                type="password"
                                label="password"
                                placeholder="Enter Password"
                                value={this.state.userdata.password}
                                onChange={(event) => {
                                    this.setState({
                                        userdata: {
                                            ...this.state.userdata,
                                            password: event.target.value
                                        }
                                    });
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <button
                                className="btn btn-primary btn-large font-weight-bold"
                                type="button"
                                // onClick={() => this.handleSubmit()}
                                onClick={() => {
                                    this.handleLogin()
                                }}>
                                Submit
                            </button>
                        </div>
                        <hr />
                        <div className="form-group"><p className="small">Don't have an account? <Link to = "/signup">Sign Up</Link></p></div>



                    </form>
                </div>

            </div>
        );
    }
}



const mapDispatchToProps = (dispatch)=>{
    console.log("mapDispatchToProps");
    let actions = {authenticateUser};
    return { ...actions, dispatch };
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.actionReducer.isLoggedIn,
        message: state.actionReducer.message
    }
}

export default withRouter(connect(mapStateToProps ,mapDispatchToProps)(Login));
