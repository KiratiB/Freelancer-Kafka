import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as API from "../api/API";

class LogoHeader extends Component
{
    render(){
        return(
            <div className="container-fluid">
                <div className="row justify-content-md-center">
                    <form className="col-sm-12 col-md-3 align-self-center border">
                        <div className="form-group                                                                                     "><h5>Sign up for free today!</h5></div>
                        <div className="form-group">
                            <img src="./Images/logo.png" alt="boohoo"></img>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default  LogoHeader;