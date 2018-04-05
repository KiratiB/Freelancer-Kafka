import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {projectdetails} from "./../actions/index";
import {Link,withRouter} from "react-router-dom";
import * as API from "./../api/API";
import Navbarmain from "./Navbarmain"

class InternalDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            temp:0,
            myBids:[],
            ResultAvailable: false,
            allProjects:[],
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
        API.fetchmybids(payload)
            .then(
                (response) =>{
                    console.log("RES" + JSON.stringify(response));
                    var myNewArray = [].concat.apply([], response);
                    console.log(myNewArray);

                    if(myNewArray.length > 0)
                    {
                        this.setState({
                            ResultAvailable:true
                        })
                    }
                    myNewArray.map((bids,index)=>{
                        bids.project_details[0].projectSkills = bids.project_details[0].projectSkills.map(function(val) {
                            return val.name;
                        }).join(',');
                        // console.log(bids.project_details[0].projectSkills);
                    })

                    this.setState({
                        myBids:myNewArray,
                        allProjects:myNewArray
                    })
                }
            );
    }

    display_mybids()
    {

        const { myBids, currentPage, ItemPerPage } = this.state;
        const indexOfLastTodo = currentPage * ItemPerPage;
        const indexOfFirstTodo = indexOfLastTodo - ItemPerPage;
        const currentTodos = myBids.slice(indexOfFirstTodo, indexOfLastTodo);

        const item = currentTodos.map((bids,index) =>{



            return(
                <div className="container-fluid small">
                    <div className="row text-center">
                        <div className="col-sm-1 border ">{(index + 1)}</div>
                        <div className="col-sm-2 border">
                            <button className = "btn btn-link"
                                    onClick={() => {
                                        this.props.projectdetails(bids.project_details[0]);
                                        this.props.history.push("/detailedprojectview");
                                    }}> {bids.project_details[0].project_name}</button></div>
                        <div className="col-sm-3 border">{bids.project_details[0].description}</div>
                        <div className="col-sm-2 border">{bids.project_details[0].userDetails.firstname + " " +  bids.project_details[0].userDetails.lastname }</div>
                        <div className="col-sm-1 border">{bids.my_bid || 0}</div>
                        <div className="col-sm-1 border">{bids.project_details[0].bid_avg || 0}</div>
                        <div className="col-sm-2 border">{bids.project_details[0].project_status || 'open'}</div>
                    </div>
                </div>
            )
        });


        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(myBids.length / ItemPerPage); i++) {
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
                        <div className="col-sm-1 border ">No</div>
                        <div className="col-sm-2 border">Project Name</div>
                        <div className="col-sm-3 border">Description</div>
                        <div className="col-sm-2 border">Employer</div>
                        <div className="col-sm-1 border">My bid</div>
                        <div className="col-sm-1 border">Average Bid</div>
                        <div className="col-sm-2 border">Project Status</div>
                        {/*<div className="col-sm-1 border">Status</div>*/}
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
            <Navbarmain />
                <div className="font-weight-bold">
                    <div className="row">
                        <div className="col-sm-8 offset-2">
                            <div className="input-group">
                        <input type="text" className="form-control rounded"
                               label="search"
                               value={this.state.bid_period}
                               onChange={(event) => {
                                   var val = event.target.value;
                                   var projects = this.state.allProjects.filter((project) => {
                                       return ((project.project_details[0].project_name.toLowerCase().indexOf(val.toLowerCase()) > -1));
                                   })
                                   this.setState({
                                       myBids: projects
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
                                                return (project.project_details[0].project_status == "Open")
                                            })
                                            this.setState({
                                                myBids: projects
                                            })
                                        }}>Open</button>
                                        <button className="dropdown-item"  onClick={() => {
                                            var projects = this.state.allProjects.filter((project) => {
                                                return (project.project_details[0].project_status == "Closed")
                                            })
                                            this.setState({
                                                myBids: projects
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
                     You have not bidded on Any Projects yet.
                </div>
                }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InternalDashboard));
