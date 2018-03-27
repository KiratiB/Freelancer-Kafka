import "./../../node_modules/bootstrap/dist/css/bootstrap.css";
import React, {Component} from 'react';
import "./../components/CSS/navbar.css";
import {Link,withRouter} from "react-router-dom";

class MainPage extends Component {


    render() {
        return (
            <div className="">
                <nav className="navbar navbar-inverse marginImage">
                    <div className="navbar-header">
                        <img src = "./Images/logoNav.png" className="customImage" alt="BV" ></img>
                    </div>
                    <ul className="nav navbar-nav ml-auto btn-toolbar">
                        <li className="float-left"><button className="btn btn-outline-success" onClick={() => {
                            this.props.history.push("/login")
                        } }>Login</button></li>
                        <li className="float-left"><button className="btn btn-outline-success" onClick={() => {
                            this.props.history.push("/signup")
                        } }>Sign Up</button></li>
                    </ul>
                </nav>
                <div className="img-fluid" ><img className="bgImage" src="./Images/bg.jpg.png" /></div>
            </div>
        );
    }
}

export default withRouter(MainPage);