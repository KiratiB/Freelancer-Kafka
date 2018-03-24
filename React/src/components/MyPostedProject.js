import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {projectdetails} from "./../actions/index";
import {Link,withRouter} from "react-router-dom";
import * as API from "./../api/API";
import Navbarmain from "./Navbarmain"


class MyPostedProject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            temp:0,
            myPostedProjects:[]

        };
    }
    componentDidMount(){
        var payload ={user_id : this.props.userId}
        API.fetchmyPostedprojects(payload)
            .then(
                (response) =>{
                    this.setState({
                        myPostedProjects:response
                    })
                }
            );
    }

    display_mybids()
    {
        const item = this.state.myPostedProjects.map((project,index) =>{

            var bidder = '';
            project.bid_user.map(user=>{
                bidder = user.firstname + " " + user.lastname + ", " ;
            })
            bidder = bidder.substring(0, bidder.length);

            return(
                <div className="container-fluid small">
                    <div className="row text-center">
                        <div className="col-sm-1 border gridFont">{(index + 1)}</div>
                        <div className="col-sm-2 border">
                            <button className = "btn btn-link"
                                    onClick={() => {
                                        this.props.projectdetails(project);
                                        this.props.history.push("/detailedprojectview");
                                    }}> {project.project_name}</button></div>
                        <div className="col-sm-1 border gridFont">{project.bid_avg}</div>
                        <div className="col-sm-4 border gridFont">{bidder}</div>
                        <div className="col-sm-2 border gridFont">28/05/2018</div>
                        <div className="col-sm-2 border gridFont">{project.project_status || 'open'}</div>
                    </div>
                </div>

            )
        });
        return(
            <div>
                <div className="container-fluid bg-light">
                    <div className="row text-center">
                        <div className="col-sm-1 border ">No</div>
                        <div className="col-sm-2 border">Project Name</div>
                        <div className="col-sm-1 border">Avg Bid</div>
                        <div className="col-sm-4 border">Freelancer Name</div>
                        <div className="col-sm-2 border">Estimate project Completion date</div>
                        <div className="col-sm-2 border">Status</div>
                    </div>
                </div>
                {item}
            </div>
        )
    }

    render(){
        return(
            <div>
                <Navbarmain/>
                {this.display_mybids()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userId:localStorage.getItem("userId")
    }
}

function mapDispatchToProps(dispatch) {
    return {
        projectdetails : (data) => dispatch(projectdetails(data))
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyPostedProject));
