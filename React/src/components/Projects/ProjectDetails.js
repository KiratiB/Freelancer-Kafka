import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {userdetails} from "./../../actions/index"
import {Link,withRouter} from "react-router-dom";
import projectReducer from "../../reducers/projectReducer";
import Projectusers from "./ProjectUser"
import * as API from "./../../api/API";
import signUpReducer from "../../reducers/signUpReducer";
import Navbarmain from "../Navbarmain";
import  "./../CSS/general.css";
import {Panel} from "react-bootstrap";
import Collapsible from 'react-collapsible';
import {projectdetails} from "../../actions";
import EmployerPanel from "./../EmployerPanel";
import HiredFreelancerPanel from "./../HiredFreelancerPanel";

class Projectdetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            temp:0,
            users:[],
            openToBid : false,
            bid_value: '',
            bid_period: '',
            isUserEmployer: false,
            projectStatus: '',
            isuserHiredFreelancer: false,
            sortedAsc:true,
            sortup :"glyphicon glyphicon-collapse-down",
            sortdown :"glyphicon glyphicon-collapse-up",
        };
        this.handleSort = this.handleSort.bind(this);

    }

    handleSort(){
        if(this.state.sortedAsc){
            this.state.users = [].concat(this.state.users)
                .sort((a, b) => a.bid_value > b.bid_value)
        }else{
            this.state.users = [].concat(this.state.users)
                .sort((a, b) => a.bid_value < b.bid_value)
        }
        this.setState({
            sortedAsc:!this.state.sortedAsc
        })
    }

    componentWillReceiveProps(){
        this.props.history.push("/detailedprojectview");
    }


    componentDidMount(){
        var payload ={project_id : this.props.projectdetails._id}
        API.fetchprojectusers(payload)
            .then(
                (response) =>{
                    console.log(response);


                    if(response.length != 0 && response[0] != '') {
                        response.map(user => {

                            var arrayBufferView = new Uint8Array(user.encodeImage.data);
                            var blob = new Blob([arrayBufferView], {type: "image/jpg"});
                            var urlCreator = window.URL || window.webkitURL;
                            var imageUrl = urlCreator.createObjectURL(blob);
                            user.bloburl = imageUrl;
                            console.log(imageUrl);

                        });
                    }
                    //console.log(response[0].encodeImage);
                    this.setState({
                        users:response
                    })

                }
            );


        if(this.props.projectdetails != null) {
            if(this.props.projectdetails.hired_freelancer._id == localStorage.getItem("userId") ) {
                this.setState({
                    isuserHiredFreelancer: true
                })
            }
            if(this.props.projectdetails.userDetails._id == localStorage.getItem("userId") ){
                this.setState({
                    isUserEmployer:true
                })
            }
            this.setState({
                projectStatus: this.props.projectdetails.project_status
            })
        }

        console.log(this.state.isUserEmployer);
    }
    display_users() {

        const item = this.state.users.map((users,index) =>{

            return(
                <div className="container-fluid small">
                     <div className="row text-center">
                         <div className="col-sm-1 border"><img className="img-rounded" src = {users.bloburl} height="42"></img></div>
                         <div className="col-sm-1 border "><button className = "btn btn-link"
                                                                   onClick={() => {
                                                                       this.props.userdetails(users);
                                                                       this.props.history.push("/selecteduserdetails");
                                                                   }}>{users.firstname + users.lastname}</button>
                                                                   </div>
                         <div className="col-sm-2 border">{users.email}</div>
                         <div className="col-sm-3 border text-info">{users.aboutme || 'undefined'}</div>
                         {/*<div className="col-sm-3 border text-info">{users.userSkills || 'undefined'}</div>*/}
                         <div className="col-sm-1 border">{users.bid_value}</div>
                         <div className="col-sm-1 border">{users.bid_period}</div>
                         { this.state.isUserEmployer ?  <div className="col-sm-1 border"><button
                             className = "btn btn-outline-dark border"
                             onClick={() => {
                                 var payload = {
                                     fl_id:users._id,
                                     project_id: this.props.projectdetails._id,
                                     fl_email: users.email
                                 }
                                 API.HireFreelancer(payload)
                                     .then(
                                         (response) => {
                                             alert("Email sent");
                                             var payload ={project_id : this.props.projectdetails._id}
                                             this.setState({
                                                 projectStatus: "Hiring"
                                             });

                                             // this.props.history.push("/detailedprojectview");
                                         });
                             }}
                             >Hire</button></div> : null}

                     </div>
                </div>
            )
        });
        return(
            <div>
                <h3>Users</h3>
                <div className="border font-weight-bold">
                    <div className="container-fluid bg-light ">
                        <div className="row text-center">
                            <div className="col-sm-1 border "></div>
                            <div className="col-sm-1 border ">Name:</div>
                            <div className="col-sm-2 border">Email:</div>
                            <div className="col-sm-3 border">About user:</div>
                            {/*<div className="col-sm-3 border">Skills:</div>*/}
                            <div className="col-sm-1 border"><a  onClick = {this.handleSort}>
                                Bid Value<span className = {this.state.sortedAsc ? this.state.sortup : this.state.sortdown}/>
                            </a></div>
                            <div className="col-sm-1 border">Bid Period</div>
                            { this.state.isUserEmployer ? <div className="col-sm-1 border"></div> : null}
                        </div>
                    </div>
                    {item}
                </div>
            </div>
        )
    }
    render(){

        return <div>
            <Navbarmain/>
            <br/>
            <h3>Project Details</h3>
            <br/>
            {console.log(this.props.projectdetails)}
            <div className="container-fluid border text-left">
                <div className="row">
                    <div className="col-sm-2 font-weight-bold">Project Name:</div>
                    <div className="col-sm-4">{this.props.projectdetails.project_name}</div>
                </div>
                <div className="row">
                    <div className="col-sm-2 font-weight-bold">Description:</div>
                    <div className="col-sm-4">{this.props.projectdetails.description}</div>
                </div>
                <div className="row">
                    <div className="col-sm-2 font-weight-bold">Skills:</div>
                    <div className="col-sm-4">{this.props.projectdetails.projectSkills}</div>
                </div>
                <div className="row">
                    <div className="col-sm-2 font-weight-bold">Budget Range:</div>
                    <div
                        className="col-sm-4">{this.props.projectdetails.budget_range_start}$-{this.props.projectdetails.budget_range_end}$
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-2 font-weight-bold">Average Bid:</div>
                    <div className="col-sm-4">{this.props.projectdetails.bid_avg}</div>
                </div>
                {/*<div className="row">*/}
                {/*<div className="col-sm-2 font-weight-bold">Skills:</div><div className="col-sm-4" >{this.props.projectdetails.projectSkills}</div>*/}
                {/*</div>*/}
            </div>
            <br/>
            <div>
                {(this.state.projectStatus == 'Open' && !this.state.isUserEmployer) ? <Collapsible trigger="Click here to bid" triggerClassName="cusPanel"
                                 triggerOpenedClassName="cusPanel"
                                 triggerDisabled={this.state.isUserEmployer}>
                        <div className="container-fluid border">
                            <div className="row align-self-center">
                                <div className="col-xl-3 border-0">
                                    <br/>
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            label="Bid Amount"
                                            placeholder="Please Enter your bid amount"
                                            value={this.state.bid_value}
                                            onChange={(event) => {
                                                this.setState({
                                                    bid_value: event.target.value
                                                });
                                            }}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            label="bidPeriod"
                                            placeholder="Please Enter Bid Period in days"
                                            value={this.state.bid_period}
                                            onChange={(event) => {
                                                this.setState({
                                                    bid_period: event.target.value
                                                });
                                            }}

                                        />
                                    </div>
                                    <div className="form-group">
                                        <button
                                            className="btn btn-primary font-weight-bold"
                                            type="button"
                                            disabled={this.state.isUserEmployer}
                                            onClick={() => {
                                                var payload = {
                                                    userId: this.props.userDetailsL || this.props.userDetailsS,
                                                    project_id: this.props.projectdetails._id,
                                                    bid_value: this.state.bid_value,
                                                    bid_period: this.state.bid_period
                                                }
                                                API.addmybid(payload)
                                                    .then(
                                                        (response) => {
                                                            console.log("Jay Upadte");
                                                            console.log(response);
                                                            response.map(user => {

                                                                var arrayBufferView = new Uint8Array(user.encodeImage.data);
                                                                var blob = new Blob([arrayBufferView], {type: "image/jpg"});
                                                                var urlCreator = window.URL || window.webkitURL;
                                                                var imageUrl = urlCreator.createObjectURL(blob);
                                                                user.bloburl = imageUrl;
                                                                console.log(imageUrl);
                                                            });
                                                            console.log(response[0].encodeImage);
                                                            var payload = {project_id: this.props.projectdetails.project_id}
                                                            this.setState({
                                                                users: response
                                                            })
                                                        }
                                                    );
                                            }}>
                                            Submit
                                        </button>
                                    </div>

                                </div>
                            </div>

                        </div>

                        <div>

                        </div>
                    </Collapsible> : null}
                <br/>
                <br/>
            </div>
            <br/>
            <br/>
            <div>
                <div>
                    {this.state.projectStatus == 'Open' ?  this.state.users.length > 0 ?  this.display_users() : <div className="alert alert-info"><h4>No Bids Yet</h4></div>  :
                        (!this.state.isuserHiredFreelancer && !this.state.isUserEmployer) ? <div>
                            <h4>Hiring is Closed</h4>
                        </div> : null
                    }
                </div>
                {(this.state.isUserEmployer && (this.state.projectStatus == "Hiring" || this.state.projectStatus == "Closed" )  )? <EmployerPanel project_details = {this.props.projectdetails} /> : null}
                {this.state.isuserHiredFreelancer ? <HiredFreelancerPanel project_details = {this.props.projectdetails}/> : null}
            </div>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        projectdetails: state.projectReducer.currentprojectdetails,
        userId :state.signUpReducer.userId,
        userDetailsL : state.actionReducer.userDetails,
        userDetailsS : state.signUpReducer.userDetails
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userdetails : (data) => dispatch(userdetails(data)),
        // projectdetails : (data) => dispatch(projectdetails(data)),
    };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Projectdetails));
