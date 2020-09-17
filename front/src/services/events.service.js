import axios from 'axios';
import authHeader from './auth-header';



const API_URL = "http://localhost:5000/api/";

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
    };

    updateEventById = async(id,event) =>{
        const resp = await axios.put(API_URL+`events/${id}`,{
            event_name: event.name,
            event_category: event.category,
            event_place: event.place,
            event_address: event.address,
            event_initial_date: event.startDate,
            event_final_date: event.endDate,
            event_type: event.type
        },{
            headers: authHeader()
        });
        return resp.data;
    };

    createEvent = async (event) => {
        const resp = await axios.post(API_URL+'/events',{
            event_name: event.name,
            event_category: event.category,
            event_place: event.place,
            event_address: event.address,
            event_initial_date: event.startDate,
            event_final_date: event.endDate,
            event_type: event.type
        },{
            headers: authHeader()
        })
        return resp.data;
    };

    deleteEvent = async (id) => {
        const resp = await axios.delete(API_URL+`/events/${id}`,{
            headers: authHeader()
        });
        return resp.data;
    }

}

export default new EventsService();
