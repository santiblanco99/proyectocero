import React from 'react';
import { Redirect } from 'react-router-dom';
import eventsService from '../services/events.service';
import authService from '../services/auth.service';

import EventList from './EventList';

class Home extends React.Component {
    state = { events: [] };

    getEvents = async () => {
        try {
            const resp = await eventsService.getUserEvents();
            this.setState({ events: resp });
        } catch (error) {

        }


    }
    componentDidMount() {
        const user = authService.getCurrentUser();
        if (user) {
            this.getEvents();
        }

    }
    render() {
        const user = authService.getCurrentUser();
        if (user) {
            return (

                <div className='container'>
                    <EventList
                        events={this.state.events}
                    />
                </div>
            );
        }
        return (
            <Redirect to={{
                pathname: '/login',

            }} />
        );

    }
}

export default Home;