import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {projectdetails} from "./../actions/index";
import {Link,withRouter} from "react-router-dom";
import * as API from "./../api/API";
import Navbarmain from "./Navbarmain";
import Collapsible from 'react-collapsible';
import {Pie} from 'react-chartjs-2';

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
            transaction_history:[],
            message: false,
            data : {
                labels: [
                    'Add',
                    'Deduct',
                ],
                datasets: [{
                    data: [300, 50],
                    backgroundColor: [
                        '#87BC5E',
                        '#D46A6A',
                    ],
                    hoverBackgroundColor: [
                        '#3C7113',
                        '#801515',
                    ]
                }]
            }
        };
    }



    handlePay = () => {

        var transaction = {
            project_id:this.props.paymentDetails.project_details._id,
                project_name:this.props.paymentDetails.project_details.project_name,
                money :this.props.paymentDetails.project_details.hired_freelancer.bid_value
        }

        console.log("payment Details");
        console.log()

        console.log("PAYLOAD")
        console.log(transaction);

        var payload ={
            employer_id: localStorage.getItem("userId"),
            freelancer_id: this.props.paymentDetails.project_details.hired_freelancer._id,
            transaction: transaction,
            action: "DEDUCT"
        }
        console.log("PAYLOAD")
        console.log(payload);

        if(this.state.userDetails.myFund < transaction.money)
        {
            this.state.message = true
        }
        else{
            var payload ={
                employer_id: localStorage.getItem("userId"),
                freelancer_id: this.props.paymentDetails.project_details.hired_freelancer._id,
                transaction: transaction,
                myFund:(this.state.userDetails.myFund - transaction.money)
            }
            API.makePayment(payload)
                .then(
                    (response) =>{
                        console.log("Hey Hey Done");
                        console.log(response);
                        // this.setState({
                        //     userDetails : response.value[0]
                        // });
                    });
        }
    }

    componentDidMount(){
        var payload ={userid: localStorage.getItem("userId")};
        API.fetchUserDetails(payload)
            .then(
                (response) =>{
                    console.log(response);
                    this.setState({
                        userDetails : response.value[0]
                    });
                });
    }

    render(){
        return(
            <div>
                <Navbarmain/>
                <div className="container-fluid">
                    <div class="row">
                        <div className="col-md-9">
                            {this.state.message ? <div className="alert alert-success text-danger small" role="alert">
                                You do not have sufficient funds, Please add money.
                            </div> : null}
                            <div>Current Balance : {this.state.userDetails.myFund}</div>
                            <div className="col-lg-12"><button className="btn-success btn-lg btn btn-lg"
                                                               onClick={()=>{
                                                                   this.handlePay()
                                                               }}>PAY</button>
                            </div>
                            <div>
                                <Pie data={this.state.data}/>
                            </div>
                        </div>

                        <div className="col-md-3">
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
