import React from 'react';
import { Link } from 'react-router-dom';



const EventsList = ({ events }) => {

    const renderedEvents = events.map(event => {
        return (
            <div className='card border-info mb-3' key={event.id}>
                <div className='card-header'>
                    {event.name}
                </div>
                <div className='card-body'>
                    <h5 className='card-title'>{event.type}</h5>
                    <p>{event.place}</p>
                    <p>Created at: {new Date(event.created_at).toLocaleDateString()}</p>
                    <Link to={`events/${event.id}/show`} className='btn btn-primary'>
                        View Event
                    </Link>
                </div>
            </div>
        );
    });

    return (
        <div>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4">Your Events</h1>
                    <hr className="my-4"></hr>
                    <a className="btn btn-primary btn-lg" href="/events/new" role="button">New Event</a>
                </div>
            </div>
            {renderedEvents}
        </div>
    );
};

export default EventsList;