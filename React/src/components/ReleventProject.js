import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as API from "../api/API";
import {authenticateUser} from "../actions/index";
import "./CSS/general.css";
import LogoImage from "./LogoImage";
import {Link,withRouter} from "react-router-dom";
import {projectdetails} from "./../actions/index"
import {BootstrapTable} from "react-bootstrap-table"
import Navbarmain from "./Navbarmain";

class ReleventProject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            projects: [],
            Skills:'',
            commonSkills:[]
        };

        var payload ={id:'admin@gmail.com'};
        API.fetchProject(payload)
            .then(
                (response) =>{
                    var Skills;
                    //console.log(response);
                    response.value.map(function(project){
                        Skills = project.projectSkills.map(function(val) {
                            return val.name;
                        }).join(',');
                    })
                    this.setState({
                        projects:response.value,
                        Skills:Skills
                    })
                }
            );

    }
    componentWillMount(){
        if(!localStorage.getItem('jwtToken')){
            this.props.history.push('/login');
        }
    }

    display_projects()
    {

        var userSkills = [];
        var userDetails = this.props.userDetailsL || this.props.userDetailsS;
        //console.log(userDetails);
        userDetails.userskills.map(skill => {
            userSkills.push(skill.name);
        });

        const item = this.state.projects.map((projects,index) =>{

            var projectSkills = [];
            projects.projectSkills.map(Skill => {
                projectSkills.push(Skill.name);
            })
            console.log(index);
            console.log(projectSkills);

            for(var i=0;i<userSkills.length;i++){
                for(var j=0;j<projectSkills.length;j++){
                    if(userSkills[i]==projectSkills[j]){
                        this.state.commonSkills.push(userSkills[i])
                    }
                }
            }

            return(

                <div className="container-fluid small">
                    {this.state.commonSkills.length < 1 ? null : <div className="row text-center">
                        <div className="col-sm-1 border ">{(index + 1)}</div>
                        <div className="col-sm-2 border">
                            <button className = "btn btn-link"
                                    onClick={() => {
                                        this.props.projectdetails(projects);
                                        this.props.history.push("/detailedprojectview");
                                    }}> {projects.project_name}</button></div>
                        <div className="col-sm-2 border">{projects.description}</div>
                        <div className="col-sm-1 border">{this.state.Skills}</div>
                        <div className="col-sm-1 border">{projects.budget_range_start}$ - {projects.budget_range_end}$</div>
                        <div className="col-sm-2 border"><a>{projects.userDetails.firstname + projects.userDetails.lastname}</a></div>
                        <div className="col-sm-1 border">{projects.bid_count || 0}</div>
                        <div className="col-sm-1 border">{projects.bid_avg || 0}</div>
                        <div className="col-sm-1 border"><button className = "btn btn-outline-dark border"
                                                                 onClick={() => {
                                                                     this.props.projectdetails(projects);
                                                                     this.props.history.push("/detailedprojectview");
                                                                 }}>Bid Now</button></div>
                    </div> }
                </div>

            )
        });
        return(
            <div className="border font-weight-bold">
                <div className="container-fluid bg-light ">
                    <div className="row text-center">
                        <div className="col-sm-1 border ">No</div>
                        <div className="col-sm-2 border">Project Name</div>
                        <div className="col-sm-2 border">Description</div>
                        <div className="col-sm-1 border">Skills</div>
                        <div className="col-sm-1 border">Budget Range</div>
                        <div className="col-sm-2 border">Employer</div>
                        <div className="col-sm-1 border">Number of Bid yet</div>
                        <div className="col-sm-1 border">Average Bid</div>
                        <div className="col-sm-1 border"></div>
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
                <br/>
                <h3>Projects And Contents</h3>
                <br/>
                {this.display_projects()}
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        projectdetails : (data) => dispatch(projectdetails(data))

    };
}

const mapStateToProps = (state) => {
    return {
        userDetailsL : state.actionReducer.userDetails,
        userDetailsS : state.signUpReducer.userDetails
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReleventProject));
