import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {projectdetails} from "./../actions/index";
import {Link,withRouter} from "react-router-dom";
import * as API from "./../api/API";
import Navbarmain from "./Navbarmain"



class HiredFreelancerPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            submissionDetails:{
                comments:'',
                SubmissionSolutionFile:'',
                isMessage: false
            }
        };
    }

    handleFileUpload = (event) => {

        const payload = new FormData();

        payload.append('myfile', event.target.files[0]);


        API.uploadFile(payload)
            .then((response) => {
                if (response.success) {
                    alert("File uploaded: Upload again to replace file");
                    this.setState({
                        submissionDetails: {
                            ...this.state.submissionDetails,
                            SubmissionSolutionFile: "./uploads/doc/" + response.filename

                        }
                    });
                }
            });
    };

    render() {
        return (
            <div>
                <h3>Submission Panel</h3>
                <br/>
                <div className="container-fluid border text-left">
                    {this.state.submissionDetails.isMessage ? <div className="alert alert-success text-danger small" role="alert">
                        Solution submitted successfully.
                    </div> : null}
                    <div className="container-fluid">
                        <div className="row text-center">
                            <div className="col-sm-2 font-weight-bold text-left">Submission Comments</div>
                            <div className="col-sm-6 font-weight-bold"><textarea rows="3"
                                                                                 className="form-control"
                                                                                 type="textarea"
                                                                                 label="aboutme"
                                                                                 placeholder="add Comments here!!"
                                                                                 required
                                                                                 value={this.state.submissionDetails.comments}
                                                                                 onChange={(event) => {
                                                                                     this.setState({
                                                                                         submissionDetails: {
                                                                                             ...this.state.submissionDetails,
                                                                                             comments: event.target.value
                                                                                         }
                                                                                     });
                                                                                 }}
                            /></div>
                        </div>
                        <br/>
                        <div className="row text-center">
                            <div className="col-sm-2 font-weight-bold text-left">Submission</div>
                            <div className="col-sm-6 font-weight-bold">
                                <input
                                    className="form-control"
                                    type="file" id="file" name="file"
                                    label="Solution"
                                    onChange={this.handleFileUpload}
                                />
                            </div>
                            <br/>
                        </div>
                        <br/>
                        <div className="row float-right">
                            <button
                                className="btn btn-primary font-weight-bold"
                                type="button"
                                onClick={() => {
                                    var payload={
                                        project_id:this.props.project_details._id,
                                        submissionDetails:this.state.submissionDetails
                                    }
                                    API.addmySolution(payload)
                                        .then(
                                            (response) => {
                                                // console.log("YO YO");
                                                console.log(response);
                                                if(response.code == 200)
                                                {
                                                    this.setState({
                                                        submissionDetails: {
                                                            ...this.state.submissionDetails,
                                                            isMessage: true
                                                        }
                                                    });
                                                }
                                            }
                                        );
                                }}>
                                Update
                            </button>
                            <br/>
                        </div>
                        <br/>

                    </div>
                </div>
            </div>
        );
    }
}

export default HiredFreelancerPanel;