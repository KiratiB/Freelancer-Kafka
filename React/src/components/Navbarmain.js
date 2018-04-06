import React, {Component} from 'react';
import "./../components/CSS/navbar.css";
import {connect} from 'react-redux';
import {Link,withRouter} from "react-router-dom";
import {requestLogout} from "./../actions/index";

class Navbarmain extends Component {

    handleLogout(){
        this.props.dispatch(this.props.requestLogout(this.props))
            .then(() => this.props.history.push('/login'));
    }

    handlePostProject(){
        this.props.history.push('/postproject');
    }

    render() {
        return (
            <div >
                <nav className="navbar navbar-expand-lg navbar-inverse">
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item">
                                <img src = "./Images/logoNav.png" className="customImage float-left" alt="BV" ></img>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle"  data-toggle="dropdown" href="/dashboard">Home</a>
                                <ul className="dropdown-menu">
                                    <li><a  onClick={() => {this.props.history.push('/dashboard');}}>All Projects</a></li>
                                    <li><a onClick={() => {this.props.history.push('/releventproject');}} >Relevant Projects</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="mypostedprojects">Dashboard</a>
                                <ul className="dropdown-menu">
                                <li><a  onClick={() => {this.props.history.push('/mypostedprojects');}}>Employer</a></li>
                                <li><a onClick={() => {this.props.history.push('/internalDashboard');}}>Freelancer</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown" >
                                <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="userProfile"><span className="glyphicon glyphicon-user"></span></a>
                                <ul className="dropdown-menu">
                                <li><a onClick={() => {this.props.history.push('/userProfile');}} >Profile</a></li>
                                    <li><a onClick={() => {this.props.history.push('/transactionManager');}} >Manage Funds</a></li>

                                <li><a onClick={() => {this.handleLogout()} }>Logout</a> </li>
                                </ul>
                            </li>

                        </ul>
                        <div className="form-inline my-2 my-lg-0">
                            <li><button className="btn  btn-success font-weight-bold rightButton" onClick={() => {this.handlePostProject()} }>Post a project</button></li>
                        </div>
                    </div>
                </nav>
                {/*<nav className="navbar navbar-inverse customNav">*/}
                    {/*<div className="container-fluid">*/}
                        {/*<ul className="nav navbar cusNavbar">*/}
                            {/**/}
                            {/*<li><a href="/dashboard">Projects</a></li>*/}
                            {/*<li className="dropdown">*/}
                                {/*<a className="dropdown-toggle" data-toggle="dropdown" href="mypostedprojects">Dashboard</a>*/}
                                {/*<ul className="dropdown-menu">*/}
                                    {/*<li><a href="mypostedprojects">Employer</a></li>*/}
                                    {/*<li><a href="internalDashboard">Freelancer</a></li>*/}
                                {/*</ul>*/}
                            {/*</li>*/}

                            {/*<li className="dropdown">*/}
                                {/*<a className="dropdown-toggle" data-toggle="dropdown" href="userProfile"><span className="glyphicon glyphicon-user"></span></a>*/}
                                {/*<ul className="dropdown-menu">*/}
                                    {/*<li><a href="userProfile">Profile</a></li>*/}
                                    {/*<li><a onClick={() => {this.handleLogout()} }>Logout</a> </li>*/}
                                {/*</ul>*/}
                            {/*</li>*/}
                            {/**/}
                            {/*<form class="form-inline">*/}
                                {/*<input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>*/}
                                {/*<button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>*/}
                            {/*</form>*/}
                        {/*</ul>*/}
                        {/*<ul className="nav navbar pull-right">*/}

                        {/*</ul>*/}



                    {/*</div>*/}
                {/*</nav>*/}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    let actions = { requestLogout };
    return { ...actions, dispatch };
}

export default withRouter(connect(null, mapDispatchToProps)(Navbarmain));