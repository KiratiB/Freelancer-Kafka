import React, {Component} from 'react';
import PropTypes from 'prop-types';

class PaymentGateway extends Component {


    render() {
        return (

            <div className="container">
                <div className='row'>
                    <div className='col-md-4 border border-dark border-danger rounded'>
                            <div className='form-row'>
                                <div className='col-xs-12 form-group required'>
                                    <label className='control-label'>Name on Card</label>
                                    <input className='form-control' size='4' type='text'/>
                                </div>
                            </div>
                            <div className='form-row'>
                                <div className='col-xs-12 form-group'>
                                    <label className='control-label'>Card Number</label>
                                    <input className='form-control card-number' size='20' type='text'/>
                                </div>
                            </div>
                            <div className='form-row'>
                                <div className='col-xs-4 form-group cvc required'>
                                    <label className='control-label'>CVC</label>
                                    <input className='form-control card-cvc' placeholder='ex. 311' size='4' type='text'/>
                                </div>
                                <div className='col-xs-4 form-group expiration required'>
                                    <label className='control-label'>Expiration</label>
                                    <input className='form-control card-expiry-month' placeholder='MM' size='2' type='text'/>
                                </div>
                                <div className='col-xs-4 form-group expiration required'>
                                    <label className='control-label'> </label>
                                    <input className='form-control card-expiry-year' placeholder='YYYY' size='4' type='text'/>
                                </div>
                            </div>
                            <div className='form-row'>
                                <div className='col-md-12'>
                                    <div className='form-control total btn btn-info'>
                                        Total:
                                        <span className='amount'>$300</span>
                                    </div>
                                </div>
                            </div>
                            <div className='form-row'>
                                <div className='col-md-12 form-group'>
                                    <button className='form-control btn btn-primary submit-button' type='submit'>Pay »</button>
                                </div>
                            </div>
                            <div className='form-row'>
                                <div className='col-md-12 error form-group hide'>
                                    <div className='alert-danger alert'>
                                        Please correct the errors and try again.
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div className='col-md-4'></div>
                </div>
            </div>
        );
    }
}

export default PaymentGateway;