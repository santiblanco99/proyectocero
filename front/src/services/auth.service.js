import axios from 'axios';


const API_URL = "http://54.190.5.79:5000/api/";

class AuthService {

    login = async (email, password) => {


        const resp = await axios.post(API_URL + 'login', {
            email,
            password
        });
        
        if (resp.data && resp.data.token) {
            localStorage.setItem('token', resp.data.token);
            localStorage.setItem('user',JSON.stringify(resp.data.user));
            return resp.data.token;
        }
        return resp.data;
    }

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    register = async (username, first_name, last_name, email, password) => {

        const resp =  await axios.post(API_URL + 'create-user', {
            username,
            first_name,
            last_name,
            email,
            password
        });



    };

    getCurrentUser = () => {
    
        var user = localStorage.getItem('user');
        if(user){
            return JSON.parse(user);
        }
        
    }


}

export default new AuthService();
