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
            myPostedProjects:[],
            ResultAvailable: false,
            allProjects:'',
            currentPage: 1,
            ItemPerPage: 5,

        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    componentDidMount(){
        var payload ={user_id : this.props.userId}
        API.fetchmyPostedprojects(payload)
            .then(
                (response) =>{

                    if(response.length > 0){
                        this.setState({
                            ResultAvailable:true
                        })
                    }

                    response.map((bids,index)=>{
                        bids.projectSkills = bids.projectSkills.map(function(val) {
                            return val.name;
                        }).join(',');
                        // console.log(bids.project_details[0].projectSkills);
                    })

                    this.setState({
                        myPostedProjects:response,
                        allProjects:response
                    })
                }
            );
    }


    display_mybids()
    {
        const { myPostedProjects, currentPage, ItemPerPage } = this.state;
        const indexOfLastTodo = currentPage * ItemPerPage;
        const indexOfFirstTodo = indexOfLastTodo - ItemPerPage;
        const currentTodos = myPostedProjects.slice(indexOfFirstTodo, indexOfLastTodo);

        const item = currentTodos.map((project,index) =>{

            var bidder = '';
            bidder = project.bid_user.map(user=>{
                return (user.firstname + " " + user.lastname) ;
            }).join(', ');
            // bidder = bidder.substring(0, bidder.length);

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
                        <div className="col-sm-4 border gridFont">{bidder || 'No bids yet'}</div>
                        <div className="col-sm-2 border gridFont">28/05/2018</div>
                        <div className="col-sm-2 border gridFont">{project.project_status || 'open'}</div>
                    </div>
                </div>

            )
        });



        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(myPostedProjects.length / ItemPerPage); i++) {
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
            <div>
                <div className="container-fluid bg-light">
                    <div className="row text-center">
                        <div className="col-sm-1 border gridHeader">No</div>
                        <div className="col-sm-2 border gridHeader">Project Name</div>
                        <div className="col-sm-1 border gridHeader">Avg Bid</div>
                        <div className="col-sm-4 border gridHeader">Freelancer Name</div>
                        <div className="col-sm-2 border gridHeader">Estimate project Completion date</div>
                        <div className="col-sm-2 border gridHeader">Status</div>
                    </div>
                </div>
                {item}
                <ul id="page-numbers" className="pagination">
                    {renderPageNumbers}
                </ul>
            </div>
        )
    }

    render(){
        return(
            <div>
                <Navbarmain/>
                <div className="font-weight-bold">
                    <div className="row">
                        <div className="col-sm-8 offset-2">
                            <div className="input-group">
                                <input type="text" className="form-control rounded"
                                       label="search"
                                       // value={this.state.bid_period}
                                       onChange={(event) => {
                                           var val = event.target.value;
                                           var projects = this.state.allProjects.filter((project) => {
                                               return ((project.project_name.toLowerCase().indexOf(val.toLowerCase()) > -1));
                                           })
                                           this.setState({
                                               myPostedProjects: projects
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
                                                myPostedProjects: projects
                                            })
                                        }}>Open</button>
                                        <button className="dropdown-item"  onClick={() => {
                                            var projects = this.state.allProjects.filter((project) => {
                                                return (project.project_status == "Closed")
                                            })
                                            this.setState({
                                                myPostedProjects: projects
                                            })
                                        }}>closed</button>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                { this.state.ResultAvailable ?  this.display_mybids() : <div className="alert alert-info">
                    You have not posted Any Projects yet.
                </div>}
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
