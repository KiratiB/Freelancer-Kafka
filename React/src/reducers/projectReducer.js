import {PROJECTS_DETAILS} from "./../actions/index"

const defaultState = {
    isProjectAdded: false,
    message: "",
    projectId : "",
    paymentDetails:""
}
export default function projectReducer (state = defaultState, action) {
    const newState = {...state};

    switch (action.type)
    {
        case 'PROJECTADD_SUCCESS':
            newState.isProjectAdded = true;
            newState.message = action.payload.message;
            //newState.projectId = action.payload.projectId;
            return newState;

        case 'PROJECTADD_FAILAUR':
            newState.isProjectAdded = false;
            newState.message = action.payload.message;
            return newState;

        case 'PROJECTS_DETAILS':
            newState.currentprojectdetails = action.data;
            return newState;

        case 'USER_DETAILS':
            newState.selecteduserDetails = action.data;
            return newState;

        case 'PAYMENT_DETAILS':
            newState.paymentDetails = action.data;
            return newState;

        default:
            newState.isProjectAdded = false;
            newState.message = "";
            newState.projectId = "";
            return newState;
    };
};