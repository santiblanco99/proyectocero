import React from 'react';
import eventsService from '../services/events.service';

class Home extends React.Component {
    state = { events: [] };

    getEvents = async () => {
        try {
            const events = await eventsService.getUserEvents();
            const renderedEvents = events.map(event => {
                return (
                    <div className='card'>
                        <div className='card-header'>
                            {event.name}
                        </div>
                        <div className='card-body'>
                            <h5 className='card-title'>{event.address}</h5>
                        </div>
                    </div>
                );
            });
            this.setState({ events: renderedEvents });
        } catch (error) {
            console.log(error);
        }

    }
    componentDidMount() {
        this.getEvents();
    }
    render(){
        return (
            <div className='container'>
                {this.state.events}
            </div>
        );
    }
}

export default Home;