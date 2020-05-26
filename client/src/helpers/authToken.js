import axios from 'axios';

//sets header, recieved in the middleware 'checkAuth' serverside to validate 
//if token is valid or not
const authToken = (token) => {
    if(token) {
        axios.defaults.headers.common['x-auth-token'] = token
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    };
};

export default authToken;