import axios from 'axios';
// const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001';
const api = process.env.REACT_APP_CONTACTS_API_URL || 'ec2-18-219-160-31.us-east-2.compute.amazonaws.com';

const headers = {
    'Accept': 'application/json'
};

export const doLogin = (payload) =>
    fetch(`${api}/users/doLogin`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
         console.log("sending JSON from API");
        res.status = 201;
        // return res.json();
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });


export const doSignUp = (payload) =>
    fetch(`${api}/users/doSignUp`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        console.log("returning status");
        console.log(res);
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const fetchProject = (payload) =>
    fetch(`${api}/users/fetchProject`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(function(resp) { return resp.json(); })

        .catch(error => {
            console.log("This is error");
            return error;
        });

export const searchProject = (payload) =>
    fetch(`${api}/users/searchProject`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(function(resp) { return resp.json(); })

        .catch(error => {
            console.log("This is error");
            return error;
        });




export const fetchprojectusers = (payload) =>
    fetch(`${api}/users/fetchprojectusers`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(function(resp) {
        return resp.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const addmybid = (payload) =>
    fetch(`${api}/users/addmybid`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(function(resp) { return resp.json() })

        .catch(error => {
            console.log("This is error");
            return error;
        });

export const addmySolution = (payload) =>
    fetch(`${api}/users/addmySolution`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(function(resp) { return resp.json() })

        .catch(error => {
            console.log("This is error");
            return error;
        });



export const HireFreelancer = (payload) =>
    fetch(`${api}/users/hireFreelancer`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(function(resp) { return resp.json() })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const makePayment = (payload) =>
    fetch(`${api}/users/makePayment`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(function(resp) { return resp.json() })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const addMyMoney = (payload) =>
    fetch(`${api}/users/addMyMoney`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(function(resp) { return resp.json() })
        .catch(error => {
            console.log("This is error");
            return error;
        });


export const addskillsToProject = (payload) =>
    fetch(`${api}/users/addskillsToProject`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(function(resp) { return resp.status })

        .catch(error => {
            console.log("This is error");
            return error;
        });

export const addskillsToUser = (payload) =>
    fetch(`${api}/users/addskillsToUser`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(function(resp) { return resp.status })

        .catch(error => {
            console.log("This is error");
            return error;
        });


export const fetchmybids = (payload) =>
    fetch(`${api}/users/fetchmybids`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(function(resp) { return resp.json(); })

        .catch(error => {
            console.log("This is error");
            return error;
        });

export const fetchmyPostedprojects = (payload) =>
    fetch(`${api}/users/fetchmyPostedprojects`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(function(resp) { return resp.json(); })

        .catch(error => {
            console.log("This is error");
            return error;
        });



export const fetchskills = (payload) =>
    fetch(`${api}/users/fetchskills`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(function(resp) { return resp.json(); })

        .catch(error => {
            console.log("This is error");
            return error;
        });

export const fetchUserDetails = (payload) =>
    fetch(`${api}/users/fetchUserDetails`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(function(resp) { return resp.json(); })

        .catch(error => {
            console.log("This is error");
            return error;
        });

export const getFiles = () =>
    fetch(`${api}/files/`)
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });

export const uploadFile = (payload) =>
    fetch(`${api}/users/uploadFile`, {
        method: 'POST',
        body: payload
    }).then(res => {
        return res.json(); })
        .catch(error => {
        console.log("This is error");
        return error;
    });

export const getFile = (payload) =>
    fetch(`${api}/getFile`, {
        method: 'POST',
        credentials:'include',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res=>res.json())
        .then(res => {
            return res;
        }).catch(error => {
        console.log("This is error");
        return error;
    });

export const downloadFile = (payload) =>
    fetch(`${api}/users/downloadFile`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(function(resp) { return resp.text(); })

        .catch(error => {
            console.log("This is error");
            return error;
        });