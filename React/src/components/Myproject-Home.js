import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as API from "../api/API";
import {authenticateUser} from "../actions/index";
import "./CSS/general.css";
import LogoImage from "./LogoImage";
import {Link,withRouter} from "react-router-dom";
import {projectdetails} from "./../actions/index"
import Navbarmain from "./Navbarmain";
import {userdetails} from "../actions";

class Myproject extends Component {

    // static propTypes = {
    //     handleSubmit: PropTypes.func.isRequired
    // };
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            projects: [],
            currentPage: 1,
            ItemPerPage: 10,
            allProjects:'',
            searchBy: 'project'

        };
        this.handleClick = this.handleClick.bind(this);
    }



    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }
    componentWillMount(){
        if(!this.props.isAuthentic){
            this.props.history.push('/login');
        }
    }

    componentDidMount(){
        var payload ={id:'admin@gmail.com'};
        API.fetchProject(payload)
            .then(
                (response) =>{
                    console.log(response);
                    response.value.map(function(project){
                        project.projectSkills = project.projectSkills.map(function(val) {
                            return val.name;
                        }).join(', ');
                    })
                    response.value.map(project =>{

                        var arrayBufferView = new Uint8Array(project.userDetails.encodeImage.data );
                        var blob = new Blob( [ arrayBufferView ], { type: "image/jpg" } );
                        var urlCreator = window.URL || window.webkitURL;
                        var imageUrl = urlCreator.createObjectURL( blob );
                        project.userDetails.bloburl = imageUrl;
                        console.log(imageUrl);
                    });
                   this.setState({
                       projects:response.value,
                       allProjects:response.value
                   })
                }
            );
        }



    display_projects()
    {
        const { projects, currentPage, ItemPerPage } = this.state;
        const indexOfLastTodo = currentPage * ItemPerPage;
        const indexOfFirstTodo = indexOfLastTodo - ItemPerPage;
        const currentTodos = projects.slice(indexOfFirstTodo, indexOfLastTodo);
        // const renderTodos = currentTodos.map((todo, index) => {
        //     return <li key={index}>{todo}</li>;
        // });

       const item = currentTodos.map((projects,index) =>{

            return(
                <div className="container-fluid small">
                        <div className="row">
                            <div className="col-sm-1 border gridFont">{(index + 1)}</div>
                            <div className="col-sm-2 border">
                                <button className = "btn btn-link gridFont"
                                        onClick={() => {
                                            this.props.projectdetails(projects);
                                            this.props.history.push("/detailedprojectview");
                                        }}> {projects.project_name}</button></div>
                            <div className="col-sm-3 border gridFont">{projects.description}</div>
                            <div className="col-sm-1 border gridFont">{projects.projectSkills}</div>
                            <div className="col-sm-1 border gridFont">{projects.budget_range_start}$ - {projects.budget_range_end}$</div>
                            <div className="col-sm-1 border"><button className = "btn btn-link gridFont"
                                                                        onClick={() => {
                                                                            this.props.userdetails(projects.userDetails);
                                                                            this.props.history.push("/selecteduserdetails");
                                                                        }}>{projects.userDetails.firstname + " " + projects.userDetails.lastname}</button></div>
                            <div className="col-sm-1 border gridFont">{projects.bid_count || 0}</div>
                            <div className="col-sm-1 border gridFont">{projects.bid_avg || 0}</div>
                            <div className="col-sm-1 border gridFont"><button className = "btn btn-outline-dark border"
                                         onClick={() => {
                                             this.props.projectdetails(projects);
                                             this.props.history.push("/detailedprojectview");
                                         }}>Bid Now</button></div>
                        </div>
                </div>

            )
        });

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(projects.length / ItemPerPage); i++) {
            pageNumbers.push(i);
        }
        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={this.handleClick}
                    className=" page-link"
                >
                    {number}
                </li>
            );
        });



       return(
           <div className="font-weight-bold">
               <div className="container-fluid bg-light ">
                   <div className="row text-center">
                       <div className="col-sm-1 border ">No</div>
                       <div className="col-sm-2 border">Project Name</div>
                       <div className="col-sm-3 border">Description</div>
                       <div className="col-sm-1 border">Skills</div>
                       <div className="col-sm-1 border">Budget Range</div>
                       <div className="col-sm-1 border">Employer</div>
                       <div className="col-sm-1 border">Number of Bid yet</div>
                       <div className="col-sm-1 border">Average Bid</div>
                       <div className="col-sm-1 border"></div>
                   </div>
               </div>
               {item}
               <ul id="page-numbers" className="pagination justify-content-center">
                   {renderPageNumbers}
               </ul>
           </div>
       )
    }

    render(){
        return(
            <div>
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
                                {/*<div className="dropdown ">*/}
                                    {/*<button className="btn form-control btn-lg btn-outline-primary dropdown-toggle"*/}
                                            {/*// onClick={() => {*/}
                                            {/*//     this.setState({*/}
                                            {/*//         projects: this.state.allProjects*/}
                                            {/*//     })*/}
                                            {/*// }}*/}
                                            {/*type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">*/}
                                        {/*Project Status*/}
                                    {/*</button>*/}
                                    {/*<ul className="dropdown-menu" aria-labelledby="dropdownMenu1">*/}
                                        {/*<button className="dropdown-item" onClick={() => {*/}
                                            {/*var projects = this.state.allProjects.filter((project) => {*/}
                                                {/*return (project.project_status == "Open")*/}
                                            {/*})*/}
                                            {/*this.setState({*/}
                                                {/*projects: projects*/}
                                            {/*})*/}
                                        {/*}}>Open</button>*/}
                                        {/*<button className="dropdown-item"  onClick={() => {*/}
                                            {/*var projects = this.state.allProjects.filter((project) => {*/}
                                                {/*return (project.project_status == "Close")*/}
                                            {/*})*/}
                                            {/*this.setState({*/}
                                                {/*projects: projects*/}
                                            {/*})*/}
                                        {/*}}>closed</button>*/}
                                    {/*</ul>*/}
                                {/*</div>*/}
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
    console.log("mapStateToProps");
    return {
        isAuthentic: state.actionReducer.isAuthentic,
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Myproject));
