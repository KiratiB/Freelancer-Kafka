import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import * as API from '../api/API';
import Login from "./Login";
import Message from "./Message";
import Welcome from "./Welcome";
import Signup from "./Signup";
import PostProject from "./PostProject";
import SetProfile from "./SetProfile";
import Dashboard from "./Dashboard";
import Navbarmain from "./Navbarmain";
import Projectdetails from "./Projects/ProjectDetails";
import Myproject from "./Myproject-Home"
import UserProfile from "./UserProfile";
import SelectedUserDetails from "./SelectedUserDetails";
import InternalDashboard from "./InternalDashboard";
import MyPostedProject from "./MyPostedProject";
import MainPage from "./MainPage";
import ReleventProject from "./ReleventProject";
import PaymentGateway from "./PaymentGateway";
import TransactionManager from "./TransactionManager";

class NewerHomePage extends Component {

    state = {
        isLoggedIn: false,
        message: '',
        username: ''
    };


    render() {
        return (
            <div className="container-fluid">
                <Route exact path="/" render={() => (
                    <MainPage/>
                )}/>



                <Route exact path="/mainpage" render={() => (
                    <div>
                        <MainPage/>
                        <Message message={this.state.message}/>
                    </div>
                )}/>

                <Route exact path="/login" render={() => (
                    <div>
                        <Login/>
                        <Message message={this.state.message}/>
                    </div>
                )}/>
                <Route exact path="/signup" render={() => (
                    <div>
                        <Signup/>
                        <Message message={this.state.message}/>
                    </div>
                )}/>
                <Route exact path="/postproject" render={() => (
                    <div>
                        <PostProject />
                    </div>
                )}/>

                <Route exact path="/newerhomepage" render={() => (
                    <div>
                        <NewerHomePage />
                    </div>
                )}/>

                <Route exact path="/setprofile" render={() => (
                    <div>
                        <SetProfile />
                    </div>
                )}/>

                <Route exact path="/myprojects" render={() => (
                    <div>
                        <Myproject />
                    </div>
                )}/>

                <Route exact path="/dashboard" render={() => (
                    <div>
                        <Dashboard />
                    </div>
                )}/>
                <Route exact path="/navbar" render={() => (
                    <div>
                        <Navbarmain />
                    </div>
                )}/>
                <Route exact path="/detailedprojectview" render={() => (
                    <div>
                        <Projectdetails />
                    </div>
                )}/>

                <Route exact path="/userProfile" render={() => (
                    <div>
                        <UserProfile />
                    </div>
                )}/>

                <Route exact path="/selecteduserdetails" render={() => (
                    <div>
                        <SelectedUserDetails />
                    </div>
                )}/>

                <Route exact path="/internalDashboard" render={() => (
                    <div>
                        <InternalDashboard />
                    </div>
                )}/>

                <Route exact path="/mypostedprojects" render={() => (
                    <div>
                        <MyPostedProject />
                    </div>
                )}/>
                <Route exact path="/releventproject" render={() => (
                    <div>
                        <ReleventProject />
                    </div>
                )}/>
                <Route exact path="/paymentGateway" render={() => (
                    <div>
                        <PaymentGateway />
                    </div>
                )}/>
                <Route exact path="/transactionManager" render={() => (
                    <div>
                        <TransactionManager />
                    </div>
                )}/>



            </div>
        );
    }
}

export default withRouter(NewerHomePage);