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
            projectId: '',
            skills:[],
            projectFile: '',
            options :{
                 key: 1, text: 'abc', value: 'dfg'
            },
            message: '',
            options : [
                {id: 1, name: 'John1'},
                {id: 2, name: 'Miles1'},
                {id: 3, name: 'Charles1'},
                {id: 4, name: 'Herbie1'}
            ]
        };
        console.log(this.state.options);
        this.handleOptionSelected = this.handleOptionSelected.bind(this);


        // API.fetchskills(payload)
        //     .then(
        //         (response) =>{
        //
        //             console.log(response);
        //             console.log("-----------------------");
        //             console.log(response.data);
        //             // this.setState({
        //             //     skills: resonse.map(item => {description: item.description,
        //             //                                         timeM: item.timeM})
        //             })
        //
        //     )
    }
    handleSubmit = () => {
        this.props.dispatch(this.props.addProject(this.state.projectData));
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
        // this.setState({selectedskills : option});
        // var result = option.map(function(val) {
        //     return val.name;
        // }).join(',');
        // this.setState({
        //     projectData: {
        //         ...this.state.projectData,
        //         projectSkilstring:result
        //     }
        // });

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
            // var payload = {projectId: nextProps.projectId, skills: this.state.selectedskills};
            // console.log(payload);
            // API.addskillsToProject(payload)
            //     .then(
            //         (response) => {
            //             if (response === 201) {
            //                 nextProps.history.push('/dashboard');
            //             }
            //         }
            //     );
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
                                    required
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
                                />
                            </div>

                            <br />
                            <br/>
                        </div>
                        <div className="form-group ">
                            <input className="form-control customfileupload" type="file" id="file" name="file"
                                   onChange={this.handleFileUpload}
                            />
                        </div>
                        <div className="text-left">
                            <h4 className="">What skills are required?</h4>

                            <Typeahead
                                clearButton
                                labelKey="name"
                                multiple
                                options={this.state.skills}
                                placeholder="What Skills are required? "
                                onChange={this.handleOptionSelected}
                            />
                        </div>
                        <div className="text-left">
                                <h4>What is your estimated budget?</h4>
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
