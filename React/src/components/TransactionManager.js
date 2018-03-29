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

    componentWillMount() {
        var payload ={userid: localStorage.getItem("userId")};
        var self = this;
        API.fetchUserDetails(payload)
            .then(
                (response) =>{

                    if(response.value.length != 0) {
                        response.value.map(user => {

                            var arrayBufferView = new Uint8Array(user.encodeImage.data);
                            var blob = new Blob([arrayBufferView], {type: "image/jpg"});
                            var urlCreator = window.URL || window.webkitURL;
                            var imageUrl = urlCreator.createObjectURL(blob);
                            user.bloburl = imageUrl;
                            console.log(imageUrl);

                        });
                    }

                    this.setState({
                        userDetails : response.value[0]
                    });
                    console.log("Inside response");
                    console.log(this.state.userdetails);

                    if(this.props.paymentDetails != "")
                    {
                        self.setState({
                            isPayEnable: true
                        })
                    }

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
                        self.setState({
                            data: {
                                ...self.state.data,
                                ...self.state.datasets,
                                data: [10 , 12]
                            }
                        });
                    }
                }
            );
        console.log("ADD");
        console.log(this.state.add);
        console.log(this.state.deduct);
        this.setState({
            data: {
                ...this.state.data,
                ...this.state.datasets,
                data: [10 , 12]
            }
        });


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
            this.setState({message: true})
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
        // var payload ={userid: localStorage.getItem("userId")};
        // API.fetchUserDetails(payload)
        //     .then(
        //         (response) =>{
        //             console.log(response);
        //             this.setState({
        //                 userDetails : response.value[0]
        //             });
        //         });





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
                color: "#46BFBD",
                highlight: "#5AD3D1",
                label: "Incoming Funds"
            },
            {
                value: this.state.deduct,
                color:"#F7464A",
                highlight: "#FF5A5E",
                label: "Incoming Funds"
            }
        ];

        // const item = this.state.userDetails.transaction_history.map((transaction,index) =>{
        //
        //     return(
        //         <div className="container-fluid small">
        //             <div className="row text-center">
        //                 <div className="col-sm-1 border gridFont">{(index + 1)}</div>
        //                 <div className="col-sm-2 border gridFont">{transaction.project_name}</div>
        //                 <div className="col-sm-1 border gridFont">{transaction.money}</div>
        //                 <div className="col-sm-1 border gridFont">{transaction.action}</div>
        //             </div>
        //         </div>
        //
        //     )
        // });

        return(


            <div>
                {console.log(this.state.deduct)}
                <Navbarmain/>
                <div className="container-fluid">
                    <div class="row">
                        <div className="col-md-9">
                            {this.state.message ? <div className="alert alert-success text-danger small" role="alert">
                                You do not have sufficient funds, Please add money.
                            </div> : null}
                            <div className="col-lg-12"><button className="btn-success btn-lg btn btn-lg" hidden={this.state.isPayDisable}
                                                               onClick={()=>{
                                                                   this.handlePay()
                                                               }}>PAY</button>
                            </div>
                            <div>
                                <Pie data={pieData}  width="400" height="200"/>
                                {/*<Pie data={this.state.data}/>*/}
                            </div>
                                <div className="container-fluid bg-light">
                                    <div className="text-center">
                                        <div className="col-sm-1 border gridHeader">No</div>
                                        <div className="col-sm-2 border gridHeader">Project Name</div>
                                        <div className="col-sm-1 border gridHeader">Money</div>
                                        <div className="col-sm-1 border gridHeader">Action</div>
                                    </div>
                                </div>
                                {/*{item}*/}
                        </div>

                        <div className="col-md-3">
                            <div><h2>Current Balance : {this.state.userDetails.myFund}</h2></div>
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
