import { LOGIN_SUCCESS, LOGIN_ERROR, AUTH_ERROR, AUTH_SUCCESS, CLEAR_MSGS, LOGOUT, REGISTER_SUCCESS, REGISTER_ERROR, PASSWORD_CHANGE_ERROR, PASSWORD_CHANGE_SUCCESS } from '../actions/types';

const reducer = (state, action) => {
    switch (action.type) {

        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload);
            return {
                ...state,
                loadingAuth: false,
                isAuthenticated: true
            }

        case AUTH_SUCCESS:
            return {
                ...state,
                loadingAuth: false,
                user: action.payload,
                isAuthenticated: true
            }
        
        case AUTH_ERROR:
        case LOGIN_ERROR: 
            return {
                ...state,
                loadingAuth: false,
                user: null,
                isAuthenticated: false,
                authMsgs: action.payload.msg
            }

        case REGISTER_SUCCESS:
        case PASSWORD_CHANGE_SUCCESS:
            return {
                ...state,
                authMsgs: action.payload.msg,
                loadingAuth: false
            }

        case REGISTER_ERROR:
        case PASSWORD_CHANGE_ERROR:
            return {
                ...state,
                authMsgs: action.payload.msg,
                loadingAuth: false
            }

        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                loadingAuth: false,
                user: null,
                isAuthenticated: false
            }

        case CLEAR_MSGS:
            return {
                ...state,
                authMsgs: null
            }

        default:
            return state;
    }
}

export default reducer;