// import {LOGIN_ERROR, LOGIN_SUCCESS} from "./../actions/types";
// import {Map,fromJS} from 'immutable';
//
//
// const newstate = {
//     isLoggedIn: false,
//     message: ''
// }
//
//
//
// export function reducer(state = newstate, action){
//     const newstate = {...state};
//     switch (action.type){
//         case LOGIN_SUCCESS:
//            newstate.isLoggedIn = true;
//            newstate.message = "Login successful";
//            return newstate;
//
//
//         case LOGIN_ERROR:
//             newstate.isLoggedIn = false;
//             newstate.message = "Login unsuccessful";
//             return newstate;
//
//         default:
//             newstate.isLoggedIn = false;
//             newstate.message = "";
//             return newstate;
//     }
// }

const defaultState = {
    isLoggedIn: false,
    message: "",
    userId: "",
    userDetails: "",
    isAuthentic: false
}



export default function actionReducer (state = defaultState, action) {
    const newState = {...state};

        switch (action.type)
        {
            case 'LOGIN_SUCCESS':
            newState.isLoggedIn = action.payload.success;
            newState.message = "Login successful";
            newState.userId = action.payload.userId;
            newState.userDetails = action.payload.userDetails;

            console.log("UserDetails" +  newState.userDetails)

           return newState;


        case 'LOGIN_ERROR':
            newState.isLoggedIn = action.payload.success;
            newState.message = "The email and password you entered did not match our records. Please double-check and try again.";
            newState.userId = "";
            return newState;

        case 'authSuccess':
             newState.isAuthentic= true;
             return newState;

        case 'authFailed':
              newState.isAuthentic= false;
              return newState;

        case 'logoutSuccess':
              newState.isLoggedIn = false;
              newState.isAuthentic= false;
              return newState;

        case 'logoutFailed':
              newState.isAuthentic= true;
              return newState;


        default:
            newState.isLoggedIn = false;
            newState.message = "";
            newState.userId = "";
            return newState;
    };
};


