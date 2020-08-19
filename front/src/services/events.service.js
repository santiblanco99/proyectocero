import axios from 'axios';
import authHeader from './auth-header';



const API_URL = "http://172.24.98.84:5000/api/";

class EventsService {
    getUserEvents = async () => {
        const resp = await axios.get(API_URL+'events',{
            headers: authHeader()
        });

        return resp.data;
    }

    getEventById = async (id) => {
        try {
            const resp = await axios.get(API_URL+`events/${id}`,{
                headers: authHeader()
            });
            return resp.data;
        } catch (error) {
            console.log(error);
        }
    }

}

export default new EventsService();