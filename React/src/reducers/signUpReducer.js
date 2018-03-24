const defaultState = {
    isSignedIn: false,
    messageSignup: "",
    userId: "",
    isSetProfile: false,
    userDetails:"",
    messageProfile: ""
}


export default function signUpReducer (state = defaultState, action) {
    const newState = {...state};

    switch (action.type)
    {
        case 'SIGNUP_SUCCESS':
            newState.isSignedIn = true;
            newState.messageSignup = "SignUp successful";
            newState.userId = action.payload.userId;
            return newState;


        case 'SIGNUP_ERROR':
            newState.isSignedIn = false;
            newState.messageSignup = "Existing Username Or EmailId";
            newState.userId = '';
            return newState;

        case 'PROFILE_SUCCESS':
            newState.isSetProfile = true;
            newState.messageProfile = "Existing Username Or EmailId";
                newState.userDetails = action.payload.userDetails;
            return newState;

        case 'PROFILE_FAILURE':
            newState.isSetProfile = false;
            newState.messageProfile = "Existing Username Or EmailId";
            return newState;


        default:
            newState.isLoggedIn = false;
            newState.messageSignup = "";
            newState.isSetProfile = false;
            newState.messageProfile = "";
            return newState;
    };
};