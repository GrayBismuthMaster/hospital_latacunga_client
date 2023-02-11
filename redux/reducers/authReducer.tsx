const INITIAL_STATE = {
    isSignedIn: false,
    userData: false
};
export const authReducer = (state = INITIAL_STATE , action:any) => {
    switch(action.type){
        case 'SIGN_IN':
            return {
                ...state, isSignedIn: true , userData: action.payload
            }
        case 'SIGN_OUT':
            return {
                ...state, isSignedIn: false, userData: null
            } 
        default:
            return state;

    }
}