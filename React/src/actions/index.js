import axios from 'axios';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const  LOGIN_ERROR = 'LOGIN_ERROR';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';

// const api = 'http://localhost:3001';
var dnsString = "http://ec2-18-219-160-31.us-east-2.compute.amazonaws.com:3001"
// var dnsString = "http://localhost:3001"
const headers = {
    'Accept': 'application/json'
};

axios.defaults.withCredentials = true;

export function authenticateUser(userdata) {
    return function (dispatch) {
        return axios.post(dnsString + "/users/doLogin", userdata)
            .then((res) => {
                console.log("Inside authentcateuser " + res)
                if (res.data.token) {
                    sessionStorage.setItem('jwtToken', res.data.token);
                    sessionStorage.setItem('userId', res.data.userId);
                    localStorage.setItem('jwtToken', res.data.token);
                    localStorage.setItem('userId', res.data.userId);
                    dispatch({type: "LOGIN_SUCCESS", payload: res.data})
                }
            }).catch((err) => {
                 dispatch({type: "LOGIN_ERROR", payload: err.message})
        })

    }
}

export function registerUser(userdata) {
    return function (dispatch) {
        return axios.post(dnsString + "/users/doSignUp", userdata)
            .then((res) => {
                if (res.data) {
                    sessionStorage.setItem('jwtToken', res.data.token);
                    sessionStorage.setItem('userId', res.data.userId);
                    localStorage.setItem('jwtToken', res.data.token);
                    localStorage.setItem('userId', res.data.userId);
                    dispatch({type: "SIGNUP_SUCCESS", payload: res.data})
                }
            }).catch((err) => {
                dispatch({type: "SIGNUP_ERROR", payload: err.message})
            })

    }
}

export function addProject(projectdata){
    return function (dispatch) {
        return axios.post(dnsString + "/users/addProject", projectdata)
            .then((res) => {
                if (res.data) {
                    dispatch({type: "PROJECTADD_SUCCESS", payload: res.data})
                }
            }).catch((err) => {
                dispatch({type: "PROJECTADD_FAILAUR", payload: err.message})
            })
    }
}

export function setProfile(profiledata){
    console.log("Inside setProfile");
    return function (dispatch) {
        return axios.post(dnsString + "/users/setProfile", profiledata)
            .then((res) => {
                if (res.data) {
                    dispatch({type: "PROFILE_SUCCESS", payload: res.data})
                }
            }).catch((err) => {
                dispatch({type: "PROFILE_FAILURE", payload: err.message})
            })
    }
}

export function requestAuth(state){
    return function (dispatch) {
        let temp = {
        };
        return axios.post(dnsString + "/users/auth", temp).then((response) => {
            dispatch({type:"authSuccess", payload: response.data})
        }).catch((err) => {
            dispatch({type:"authFailed", payload: err.response.data})
        })
    }
}

export function requestLogout(state){
    return function (dispatch) {
        return axios.get(dnsString + "/users/logout").then((response) => {
            dispatch({type:"logoutSuccess", payload: response.data})
        }).catch((err) => {
            dispatch({type:"logoutFailed", payload: err.response.data})
        })
    }
}


export const PROJECTS_DETAILS='PROJECTS_DETAILS';

export function projectdetails(data) {
    return {
        type: 'PROJECTS_DETAILS',
        data,
    };
}

// project users details
export const USER_DETAILS='USER_DETAILS';

export function userdetails(data) {
    return {
        type: 'USER_DETAILS',
        data,
    };
}


// payment details
export const PAYMENT_DETAILS='PAYMENT_DETAILS';

export function paymentDetails(data) {
    return {
        type: 'PAYMENT_DETAILS',
        data,
    };
}

