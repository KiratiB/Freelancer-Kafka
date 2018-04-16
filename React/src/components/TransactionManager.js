import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {projectdetails} from "./../actions/index";
import {Link,withRouter} from "react-router-dom";
import * as API from "./../api/API";
import Navbarmain from "./Navbarmain";
import Collapsible from 'react-collapsible';
import {Pie} from 'react-chartjs';
import {userdetails} from "../actions";

class TransactionManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userDetails:[],
            creditCardDetails:{
                cardNumber:'',
                amount:'',
                cvv:'',
                month:'',
                year:''
            },
            isPayDisable: true,
            transaction_history:[],
            add:0,
            deduct:0,
            message: false,
            isPaymentHistoryMsg:false,
            isTransactionsMsg: false

        };
        this.handlePay = this.handlePay.bind(this);
    }

    componentWillMount() {
        var payload ={userid: localStorage.getItem("userId")};
        var self = this;
        API.fetchUserDetails(payload)
            .then(
                (response) =>{

                    if(response.value[0].length != 0) {
                        response.value.map(user => {

                            var arrayBufferView = new Uint8Array(user.encodeImage.data);
                            var blob = new Blob([arrayBufferView], {type: "image/jpg"});
                            var urlCreator = window.URL || window.webkitURL;
                            var imageUrl = urlCreator.createObjectURL(blob);
                            user.bloburl = imageUrl;
                            console.log(imageUrl);

                        });
                    }

                    self.setState({
                        userDetails : response.value[0]
                    });
                    console.log("Inside response");
                    console.log(this.state.userdetails);


                    var add = 0;
                    var deduct = 0;

                    if(response.value[0].transaction_history.length > 0){
                        response.value[0].transaction_history.map(transaction => {
                            if(transaction.action == 'DEDUCT'){
                                deduct = deduct + transaction.money;
                            }
                            if(transaction.action == 'ADD'){
                                add = add + transaction.money;
                            }
                        });
                        self.setState({add:add});
                        self.setState({deduct:deduct});
                    }
                }
            );
    }


    handlePay = () => {
        {
            if (this.props.paymentDetails.freelancerId !== undefined) {
                var self = this;
                var transaction = {
                    project_id: this.props.paymentDetails.project_details._id,
                    project_name: this.props.paymentDetails.project_details.project_name,
                    money: this.props.paymentDetails.project_details.hired_freelancer.bid_value
                }

                console.log("payment Details");
                console.log()

                console.log("PAYLOAD")
                console.log(transaction);

                var payload = {
                    employer_id: localStorage.getItem("userId"),
                    freelancer_id: this.props.paymentDetails.project_details.hired_freelancer._id,
                    transaction: transaction,
                    action: "DEDUCT"
                }
                console.log("PAYLOAD")
                console.log(payload);

                if (this.state.userDetails.myFund < transaction.money) {
                    this.setState({message: true})
                }
                else {
                    var payload = {
                        employer_id: localStorage.getItem("userId"),
                        freelancer_id: this.props.paymentDetails.project_details.hired_freelancer._id,
                        transaction: transaction,
                        myFund: (this.state.userDetails.myFund - transaction.money)
                    }
                    API.makePayment(payload)
                        .then(
                            (response) => {
                                console.log("Hey Hey Done");
                                console.log(response);
                                self.setState({
                                    userDetails: response.value
                                });
                                var add = 0;
                                var deduct = 0;

                                if (response.value.transaction_history.length > 0) {
                                    response.value.transaction_history.map(transaction => {
                                        if (transaction.action == 'DEDUCT') {
                                            deduct = deduct + transaction.money;
                                        }
                                        if (transaction.action == 'ADD') {
                                            add = add + transaction.money;
                                        }
                                    });
                                    self.setState({add: add});
                                    self.setState({deduct: deduct});
                                }
                            });
                }
            }
            else
            {
                this.setState({isPaymentHistoryMsg: true})
            }
        }

    }

    componentDidMount(){
        var self = this;
        if(this.props.paymentDetails != "")
        {
            self.setState({
                isPayEnable: false
            })
        }
    }

    display_transactions() {
        if (this.state.userDetails.transaction_history !== undefined) {
            const item = this.state.userDetails.transaction_history.map((transaction, index) => {

                return (
                    <div className="container-fluid small">
                        <div className="row text-center">
                            <div className="col-md-2 border gridFont">{(index + 1)}</div>
                            <div className="col-md-6 border gridFont">{transaction.project_name}</div>
                            <div className="col-md-2 border gridFont">{transaction.money}</div>
                            <div className="col-md-2 border gridFont">{transaction.action}</div>
                        </div>
                    </div>

                )
            });
            return (
                <div>
                    <div className="container-fluid bg-light">
                        <div className="row text-center">
                            <div className="col-md-2 border gridHeader">No</div>
                            <div className="col-md-6 border gridHeader">Project Name</div>
                            <div className="col-md-2 border gridHeader">Money</div>
                            <div className="col-md-2 border gridHeader">Action</div>
                        </div>
                    </div>
                    {item}
                </div>
            )
        }
        else
        {
            return(<div>ABC</div>)
        }
    }



    render(){
        var options={
            legend: {
                display: true,
            }
        }
        const pieData = [
            {
                value: this.state.add,
                color: "#87BC5E",
                highlight: "#3C7113",
                label: "Incoming Funds"
            },
            {
                value: this.state.deduct,
                color:"#FF5A5E",
                highlight: "#D46A6A",
                label: "Incoming Funds"
            }
        ];

        return(


            <div>
                {console.log(this.state.deduct)}
                <Navbarmain/>
                <div className="container-fluid">
                    <div class="row">
                        <div className="col-md-9">
                            {this.state.message ? <div className="alert alert-info alert-dismissible fade show" role="alert">
                                You do not have sufficient funds, Please add money.
                            </div> : null}
                            { this.state.isPaymentHistoryMsg ?<div className="alert alert-info alert-dismissible fade show">
                                You have not hired any freelancer.
                            </div> : null}

                            <div>
                                <Pie data={pieData}  width="200" height="150"/>
                                {/*<Pie data={this.state.data}/>*/}
                            </div>
                            <br/>
                            <div>
                                <span className="label label-default font-weight-bold form-control-lg">Earned Money</span><span className="label label-success font-weight-bold form-control-lg">{this.state.add}</span>
                            </div>
                            <br/>
                            <div>
                                <span className="label label-default font-weight-bold form-control-lg">Spent Money</span><span className="label label-danger font-weight-bold form-control-lg">{this.state.deduct}</span>
                            <div>
                                <br/>
                            {this.display_transactions()}
                            </div>

                        </div>
                        </div>
                            <div className="col-md-3">
                            <div><h2>Current Balance : {this.state.userDetails.myFund}</h2></div>
                            <div className="col-lg-12"><button className="btn-success btn-lg"
                                                               // disabled={this.state.isPayDisable}
                                                               onClick={()=>{
                                                                   this.handlePay()
                                                               }}>PAY</button>
                            </div>
                            <div className="col-lg-12"><button className="btn-success btn-lg btn btn-lg" hidden={this.state.isPayDisable}
                                                               onClick={()=>{
                                                                   this.handlePay()
                                                               }}>PAY</button>
                            </div>
                                <button data-toggle="collapse" data-target="#demo" className="btn-lg btn-primary">Add Money</button>
                                <div id="demo" className="collapse">
                                    <div className='row'>
                                        <div className='col-md-12 border border-light rounded'>
                                            <div className='form-row'>
                                                <div className='col-xs-12 form-group'>
                                                    <input className='form-control card-number'
                                                           onChange={(event) => {
                                                               this.setState({
                                                                   creditCardDetails: {
                                                                       ...this.state.creditCardDetails,
                                                                       amount: event.target.value
                                                                   }
                                                               });
                                                           }} placeholder="Enter Amount" size='16' type='text'/>
                                                </div>
                                                <div className='col-xs-12 form-group'>
                                                    <input className='form-control card-number'onChange={(event) => {
                                                        this.setState({
                                                            creditCardDetails: {
                                                                ...this.state.creditCardDetails,
                                                                cardNumberamount: event.target.value
                                                            }
                                                        });
                                                    }}placeholder="Card Number" size='16' type='text'/>
                                                </div>
                                                <div className='col-xs-12 form-group cvc required'>
                                                    <input className='form-control card-cvc' onChange={(event) => {
                                                        this.setState({
                                                            creditCardDetails: {
                                                                ...this.state.creditCardDetails,
                                                                cvv: event.target.value
                                                            }
                                                        });
                                                    }} placeholder='CVV' size='4' type='text'/>
                                                </div>
                                                <div className='col-xs-6 form-group expiration required'>
                                                    <input className='form-control card-expiry-month' onChange={(event) => {
                                                        this.setState({
                                                            creditCardDetails: {
                                                                ...this.state.creditCardDetails,
                                                                month: event.target.value
                                                            }
                                                        });
                                                    }}  placeholder='Expiration month MM' size='2' type='text'/>
                                                </div>
                                                <div className='col-xs-6 form-group expiration required'>
                                                    <input className='form-control card-expiry-year' onChange={(event) => {
                                                        this.setState({
                                                            creditCardDetails: {
                                                                ...this.state.creditCardDetails,
                                                                year: event.target.value
                                                            }
                                                        });
                                                    }} placeholder='Expiration year YYYY' size='4' type='text'/>
                                                </div>
                                            </div>
                                            <div className='form-row'>
                                                <div className='col-md-12 form-group'>
                                                    <button className='form-control btn btn-success submit-button'
                                                            onClick={() => {
                                                                var payload = {
                                                                    userId: localStorage.getItem("userId"),
                                                                    amount: parseInt(this.state.creditCardDetails.amount) + parseInt(this.state.userDetails.myFund)
                                                                }
                                                                {
                                                                    this.setState({message: false})
                                                                }
                                                                API.addMyMoney(payload)
                                                                    .then(
                                                                        (response) => {
                                                                            if(response.code==200)
                                                                            {
                                                                                var payload ={userid: localStorage.getItem("userId")};
                                                                                API.fetchUserDetails(payload)
                                                                                    .then(
                                                                                        (response) =>{
                                                                                            console.log(response);
                                                                                            this.setState({
                                                                                                userDetails : response.value[0]
                                                                                            });
                                                                                        });
                                                                                this.props.history.push("/transactionManager");
                                                                            }
                                                                        });
                                                            }}
                                                            type='submit'>Add »</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        paymentDetails: state.projectReducer.paymentDetails
    }
}
export default withRouter(connect(mapStateToProps ,null)(TransactionManager));
