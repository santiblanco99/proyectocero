import React, { useState, useEffect } from 'react';
import { useParams, Link, Redirect } from 'react-router-dom';

import eventsService from '../services/events.service';

import authService from '../services/auth.service';

const EventDetail = (props) => {
    const [event, setEvent] = useState({});
    var { id } = useParams();

    useEffect(() => {
        const searchEvent = async () => {
            try {
                const resp = await eventsService.getEventById(id);
                const startDate = new Date(resp.startdate);
                const startsAt = `${startDate.toDateString()}, ${startDate.toLocaleTimeString()}`
                const endDate = new Date(resp.enddate);
                const endsAt = `${endDate.toDateString()}, ${endDate.toLocaleTimeString()}`;

                resp.startdate = startsAt;
                resp.enddate = endsAt;
                setEvent(resp);
            } catch (error) {
                console.log(error);
                setEvent(null);
            }

        };
        searchEvent();
    }, []);

    if(!authService.getCurrentUser()){
        return (
            <div>
                <Redirect 
                to='/login'
                />
            </div>
        );
    }
    
    if (!event) {
        return (
            <div className='container'>
                <h1>Uh Oh! No event found with that id</h1>
            </div>
        );
    }

    const deleteEvent = async () => {
        try {
            await eventsService.deleteEvent(id);
            props.history.push('/events');
            window.location.reload();

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="card text-center border-info mb-3">
                <div className="card-header">
                    {event.name}
                </div>
                <div className="card-body">
                    <h5 className="card-title">{event.category}, {event.type}</h5>
                    <p className="card-text">Starts at: {event.startdate}</p>
                    <p className="card-text">Ends at: {event.enddate}</p>
                    <p className="card-text">Where: {event.place}</p>
                    <p className="card-text">Address: <a href={event.address}>{event.address}</a></p>
                    <Link to={`/events/${event.id}/edit`} className="btn btn-primary">Edit this Event</Link>

                    <button className='btn btn-danger' style={{marginLeft: 5}} onClick={deleteEvent}>Delete</button>
                </div>
                <div className="card-footer text-muted">
                    Created on {new Date(event.created_at).toDateString()}
            </div>
            </div>
        </div>
    );
}

export default EventDetail;