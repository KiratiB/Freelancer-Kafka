import React, {Component} from 'react';
import "./../../node_modules/bootstrap/dist/css/bootstrap.css";
import "./../components/CSS/navbar.css";

class LogoImage extends Component {
    render() {
        return (
            <div>
                <img src = "./Images/logo.png" alt="BV"></img>
            </div>
        );
    }
}

export default LogoImage;
