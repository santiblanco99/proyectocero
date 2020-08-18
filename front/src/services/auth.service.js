import axios from 'axios';


const API_URL = "http://172.24.98.84:3000/api/";

class AuthService {

    login = (username,password) => {
        return axios.post(API_URL+'login',{
            username,
            password
        }).then(response => {
            console.log(response);
        });
    }

    getEvents = () => {
        return axios.get(API_URL+'events',{
            headers: {
                Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InNhbnRpQGV4YW1wbGUuY29tIiwiaWF0IjoxNTk3Nzg1MTkzLCJleHAiOjE1OTc4NzE1OTN9.tlzepscA8pLee-4g-QfYsUca3y-v9baYyBg5M0BADIg'
            }
        }).then(resp => {
            return resp;
        });
    }


}

export default new AuthService();