import React, {Component} from 'react';
import * as API from "./../api/API";
import fileDownload  from 'js-file-download'
import {Link,withRouter} from "react-router-dom";


class EmployerPanel extends Component {

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

    componentDidMount(){


    }

    render() {
        return (
            <div>
                <br/>
                    <div className="container-fluid">
                        <br/>
                        <div className="row text-center">
                            <div className="col-sm-6">
                                <button type="button" className="btn btn-info btn-lg" onClick={() => {
                                    var payload ={filepath : this.props.project_details.submissionDetails.SubmissionSolutionFile}
                                    API.downloadFile(payload)
                                        .then((response) => {
                                            if (response) {
                                                console.log(response);
                                                fileDownload(response,"Solution");
                                                const file = new File([response.blob], "File name")
                                                console.log(file);
                                            }
                                        });
                                }
                                }><span className="glyphicon glyphicon-download-alt"></span> Download Solution
                                </button>
                            </div>
                            <br/>
                            <div className="col-sm-6">
                                <button type="button" className="btn btn-info btn-lg" onClick={() => {
                                    this.props.history.push('/paymentGateway');
                                }
                                }><span className="glyphicon glyphicon-usd"></span> Make Payment
                                </button>
                            </div>
                            <br/>
                        </div>
                        <br/>
                        <br/>
                </div>
            </div>
        );
    }
}

export default withRouter(EmployerPanel);