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
import {userdetails} from "../actions";

class ReleventProject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            projects: [],
            Skills:'',
            commonSkills:[],
            allProjects:'',
            searchBy: 'project'
        };

        var payload ={id:'admin@gmail.com'};
        API.fetchProject(payload)
            .then(
                (response) =>{
                    //console.log(response);
                    response.value.map(function(project){
                        response.value.p_skills = project.projectSkills;
                        project.projectSkills = project.projectSkills.map(function(val) {
                            return val.name;
                        }).join(',');
                    })

                    response.value.map(project =>{

                        var arrayBufferView = new Uint8Array(project.userDetails.encodeImage.data );
                        var blob = new Blob( [ arrayBufferView ], { type: "image/jpg" } );
                        var urlCreator = window.URL || window.webkitURL;
                        var imageUrl = urlCreator.createObjectURL( blob );
                        project.userDetails.bloburl = imageUrl;
                        console.log(imageUrl);
                    });

                    // console.log("Response :" + JSON.stringify(response.value));


                    this.setState({
                        projects:response.value,
                        allProjects:response.value
                    })
                }
            );

    }

    display_projects()
    {

        var userSkills = [];
        var userDetails = this.props.userDetailsL || this.props.userDetailsS;
        //console.log(userDetails);
        userDetails.userskills.map(skill => {
            userSkills.push(skill.name);
        });
        var allProjects = [];


        console.log(this.state.projects);

        const item = this.state.projects.map((projects,index) =>{

            var commonSkills =[];
            var projectSkills = projects.projectSkills.split(',');
            console.log(index);
            console.log(projectSkills);

            for(var i=0;i<userSkills.length;i++){
                for(var j=0;j<projectSkills.length;j++){
                    if(userSkills[i]==projectSkills[j]){
                        commonSkills.push(userSkills[i])
                    }
                }
            }

            console.log("Common skills:" + commonSkills);
            console.log("all projects: " + this.state.allProjects );


            return(

                <div className="container-fluid small">
                    {commonSkills.length < 1 ? null : <div className="row text-center">
                        <div className="col-sm-1 border ">{(index + 1)}</div>
                        <div className="col-sm-2 border">
                            <button className = "btn btn-link"
                                    onClick={() => {
                                        this.props.projectdetails(projects);
                                        this.props.history.push("/detailedprojectview");
                                    }}> {projects.project_name}</button></div>
                        <div className="col-sm-2 border">{projects.description}</div>
                        <div className="col-sm-1 border">{projects.projectSkills}</div>
                        <div className="col-sm-1 border">{projects.budget_range_start}$ - {projects.budget_range_end}$</div>
                        <div className="col-sm-2 border"><button className = "btn btn-link"
                                                                 onClick={() => {
                                                                 this.props.userdetails(projects.userDetails);
                                                                 this.props.history.push("/selecteduserdetails");
                                                                 }}>{projects.userDetails.firstname + " " + projects.userDetails.lastname}</button></div>
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

                <div className="font-weight-bold">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="input-group">
                                <input type="text" className="form-control rounded"
                                       label="search"
                                       value={this.state.bid_period}
                                       onChange={(event) => {
                                           var val = event.target.value;
                                           var projects = this.state.allProjects.filter((project) => {
                                               return ((project.project_name.toLowerCase().indexOf(val.toLowerCase()) > -1) || project.projectSkills.toUpperCase().indexOf(val.toUpperCase()) !== -1);
                                           })
                                           this.setState({
                                               projects: projects
                                           })
                                       }}
                                       placeholder="Search project..."/>
                                <div className="dropdown ">
                                    <button className="btn form-control btn-lg btn-outline-primary dropdown-toggle"
                                        // onClick={() => {
                                        //     this.setState({
                                        //         projects: this.state.allProjects
                                        //     })
                                        // }}
                                            type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                        Project Status
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                                        <button className="dropdown-item" onClick={() => {
                                            var projects = this.state.allProjects.filter((project) => {
                                                return (project.project_status == "Open")
                                            })
                                            this.setState({
                                                projects: projects
                                            })
                                        }}>Open</button>
                                        <button className="dropdown-item"  onClick={() => {
                                            var projects = this.state.allProjects.filter((project) => {
                                                return (project.project_status == "Close")
                                            })
                                            this.setState({
                                                projects: projects
                                            })
                                        }}>closed</button>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

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
        projectdetails : (data) => dispatch(projectdetails(data)),
        userdetails : (data) => dispatch(userdetails(data))

    };
}

const mapStateToProps = (state) => {
    return {
        userDetailsL : state.actionReducer.userDetails,
        userDetailsS : state.signUpReducer.userDetails
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReleventProject));
