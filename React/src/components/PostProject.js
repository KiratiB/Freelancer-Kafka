import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as API from "../api/API";
import {authenticateUser} from "../actions/index";
import "./CSS/general.css";
import LogoImage from "./LogoImage";
import {Link, withRouter} from "react-router-dom";
import {addProject} from "../actions";
import ReactDOM from 'react-dom';
import Select from 'react-select';
import { Dropdown } from 'semantic-ui-react';
import Dropdowncustom from "./Dropdowncustom";
import {Typeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

class PostProject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projectData:{
                projectname : '',
                projectdescription: '',
                projectBudgetMin: '',
                projectBudgetMax: '',
                projectFile: '',
                userDetails : this.props.userDetailsL || this.props.userDetailsS,
                projectSkilstring: '',
                selectedskills:''
            },
            isProjectName:true,
            isProjectDescription:true,
            isBudgetMin:true,
            isBudgetMax:true,
            isProjectFile:true,
            isSelectedSkills:true,
            projectId: '',
            skills:[],
            projectFile: '',
            message: '',
        };
        this.handleOptionSelected = this.handleOptionSelected.bind(this);
    }

    validateProjectName() {
        if (this.state.projectData.projectname != '')
        {
            return (true)
        }
        return (false)
    }

    validateDescription(){
        if (this.state.projectData.projectdescription != '')
        {
            return (true)
        }
        return (false)
    }
    validateBudget() {
        if (this.state.projectData.projectBudgetMin != '' && this.state.projectData.projectBudgetMax != '' && this.state.projectData.projectBudgetMin<this.state.projectData.projectBudgetMax)
        {
            return (true)
        }
        return (false)
    }

    validateProjectFile(){
        if (this.state.projectData.projectFile != '')
        {
            return (true)
        }
        return (false)
    }
    validateSkills(){
        if (this.state.projectData.selectedskills.length > 2)
        {
            return (true)
        }
        return (false)
    }

    handleSubmit = () => {

        if(this.validateProjectName() == true) {
            if(this.validateDescription() == true) {
                if(this.validateProjectFile() == true) {
                    if(this.validateSkills() == true) {
                        if(this.validateBudget() == true) {
                            this.props.dispatch(this.props.addProject(this.state.projectData));
                        }
                        else{
                            this.setState({isBudgetMin: false})
                        }
                    }
                    else{
                        this.setState({isSelectedSkills: false})
                    }
                }
                else{
                    this.setState({isProjectFile: false})
                }
            }
            else {
                this.setState({isProjectDescription: false})
            }
        }
        else {
            this.setState({isProjectName: false})
        }
    }

    handleFileUpload = (event) => {

        const payload = new FormData();

        payload.append('myfile', event.target.files[0]);

        API.uploadFile(payload)
            .then((response) => {
                if (response.success) {
                    alert("File uploaded: Upload again to replace file");
                    this.setState({
                        projectData: {
                            ...this.state.projectData,
                            projectFile: "./uploads/doc" + response.filename
                        }
                    });
                    this.setState({isProjectFile: true});

                }
            });
    };


    handleOptionSelected(option){
        this.setState({
            projectData: {
                ...this.state.projectData,
                selectedskills:option
            }
        });

    }

    componentDidMount(){
        var payload ={id:'admin@gmail.com'};
        API.fetchskills(payload)
            .then(
                (response) =>{
                    console.log(response);
                    console.log("-----------------------");
                    this.setState({
                        skills : response.skill
                    });
                    console.log(this.state.skills)
                }
            );
    }

    componentDidUpdate() {
        ReactDOM.findDOMNode(this).scrollTop = 0
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.isProjectAdded === true) {
            nextProps.history.push('/dashboard');
        }


    }

    render(){
        return(
            <div className="container-fluid">
                <div className="row justify-content-md-center">
                    {/*//justify-content-md-center*/}
                    <div className="col-sm-12 col-md-7 noBorder" id="formProject">
                        <Link to = "/mailpage"><LogoImage className="image"/></Link>
                        <br/>
                        <div className="text-left">
                            <div className="form-group">
                                {this.props.message && (
                                    <div className="form-control alert alert-warning text-danger" role="alert">
                                        {this.props.message}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="text-left">
                            <h1 className="">Tell us what you need done</h1>
                            <p className="pagefont">Get free quotes from skilled freelancers within minutes, view profiles, ratings and portfolios and chat with them.
                                Pay the freelancer only when you are 100% satisfied with their work.</p>
                            <br />
                            <br/>
                        </div>
                        <div className="text-left">
                            <h4 className="">Choose a name for your project</h4>
                            { this.state.isProjectName ? null : <div className="text-input-error-wrapper text-left errormessage">Please Enter Projectname.</div>}
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="text"

                                    label="ProjectName"
                                    placeholder="e.g. Build me a website"
                                    value={this.state.projectData.projectname}
                                    onChange={(event) => {
                                        this.setState({
                                            projectData: {
                                                ...this.state.projectData,
                                                projectname: event.target.value
                                            }
                                        });
                                    }}
                                    onFocus={(event) => {
                                        this.setState({isProjectName: true});
                                    }}

                                />
                            </div>
                            <br />
                            <br/>
                        </div>
                        <div className="text-left">
                            <h4 className="">Tell us more about your project</h4>
                            <p className="pagefont">Great project descriptions include a little bit about yourself, details of what you are trying to achieve,
                                and any decisions that you have already made about your project.
                                If there are things you are unsure of, don't worry, a freelancer will be able to help you fill in the blanks.
                                Describe your project</p>
                            <br/>
                            { this.state.isProjectDescription ? null : <div className="text-input-error-wrapper text-left errormessage">Please Enter Description.</div>}
                            <div className="form-group">
                                <textarea rows="5"
                                    className="form-control"
                                    type="textarea"
                                    label="ProjectDescription"
                                    placeholder="describe your project here..."
                                    value={this.state.projectData.projectdescription}
                                    onChange={(event) => {
                                        this.setState({
                                            projectData: {
                                                ...this.state.projectData,
                                                projectdescription: event.target.value
                                            }
                                        });
                                    }}
                                    onFocus={(event) => {
                                         this.setState({isProjectDescription: true});
                                    }}
                                />
                            </div>

                            <br />
                            <br/>
                        </div>
                        { this.state.isProjectFile ? null : <div className="text-input-error-wrapper text-left errormessage">Please Add Requirement Document.</div>}
                        <div className="form-group ">
                            <input className="form-control customfileupload" type="file" id="file" name="file"
                                   onChange={this.handleFileUpload}
                            />
                        </div>
                        <div className="text-left">
                            <h4 className="">What skills are required?</h4>
                            { this.state.isSelectedSkills ? null : <div className="text-input-error-wrapper text-left errormessage">Please select atleast 3 skills.</div>}
                            <Typeahead
                                clearButton
                                labelKey="name"
                                multiple
                                options={this.state.skills}
                                placeholder="What Skills are required? "
                                onChange={this.handleOptionSelected}
                                onFocus={(event) => {
                                    this.setState({isSelectedSkills: true});
                                }}
                            />
                        </div>
                        <div className="text-left">
                                <h4>What is your estimated budget?</h4>
                            { this.state.isBudgetMin ? null : <div className="text-input-error-wrapper text-left errormessage">Please Enter Valid Min and Max Budget.</div>}
                                <div className="form-group">
                                    <h6>Minimum Budget</h6>
                                    <input
                                        className="form-control"
                                        type="text"
                                        label="Minimum Budget"
                                        placeholder="10"
                                        value={this.state.projectData.projectBudgetMin}
                                            onChange={(event) => {
                                            this.setState({
                                                projectData: {
                                                    ...this.state.projectData,
                                                    projectBudgetMin: event.target.value
                                                }
                                            });
                                        }}
                                        onFocus={(event) => {
                                            this.setState({isBudgetMin: true});
                                        }}
                                    />
                                </div>
                                <div className="form-group">
                                    <h6>Maximum Budget</h6>
                                    <input
                                        className="form-control"
                                        type="text"
                                        label="Minimum Budget"
                                        placeholder="10"
                                        value={this.state.projectData.projectBudgetMax}
                                        onChange={(event) => {
                                            this.setState({
                                                projectData: {
                                                    ...this.state.projectData,
                                                    projectBudgetMax: event.target.value
                                                }
                                            });
                                        }}
                                        onFocus={(event) => {
                                            this.setState({isBudgetMin: true});
                                        }}
                                    />
                                </div>
                            </div>
                        <div className="text-left">
                            <button
                                className="btn btn-primary font-weight-bold"
                                onClick={() => {this.handleSubmit()}}>
                                Post My Project
                            </button>
                            <br />
                            <br/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch)=>{
    console.log("mapDispatchToProps");
    let actions = {addProject};
    return { ...actions, dispatch };
}
const mapStateToProps = (state) => {
    console.log("mapStateToProps");
    return {
        isProjectAdded: state.projectReducer.isProjectAdded,
        message: state.projectReducer.message,
        userDetailsL : state.actionReducer.userDetails,
        userDetailsS : state.signUpReducer.userDetails
    }
}
export default withRouter(connect(mapStateToProps ,mapDispatchToProps)(PostProject));
