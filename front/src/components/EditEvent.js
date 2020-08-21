import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';

import eventService from '../services/events.service';
import authService from '../services/auth.service';



const EditEvent = (props) => {
    const { id } = useParams();
    const [event, setEvent] = useState({});
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [place, setPlace] = useState('');
    const [address, setAddress] = useState('');

    const [message, setMessage] = useState('');


    useEffect(() => {
        const getEvent = async () => {
            try {
                const req = await eventService.getEventById(id);
                setEvent(req);
                setName(req.name);
                setType(req.type);
                setCategory(req.category);
                setStartDate(req.startdate);
                setEndDate(req.enddate);
                setPlace(req.place);
                setAddress(req.address);
            } catch (error) {
                console.log(error);

            }

        };
        getEvent();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const event = {
                name,
                category,
                type,
                startDate,
                endDate,
                address,
                place
            }
            const resp = await eventService.updateEventById(id, event);
            props.history.push(`/events/${id}/show`);
            window.location.reload();
        } catch (error) {
            setMessage('Update failed')
        }
    };

    const onChangeName = (e) => {
        setName(e.target.value);

    };
    const onChangeType = (e) => {
        setType(e.target.value);

    };
    const onChangeCategory = (e) => {
        setCategory(e.target.value);

    };
    const onChangeStartDate = (e) => {
        setStartDate(e.target.value);

    };
    const onChangeEndDate = (e) => {
        setEndDate(e.target.value);

    };
    const onChangePlace = (e) => {
        setPlace(e.target.value);

    };
    const onChangeAddress = (e) => {
        setAddress(e.target.value);

    };

    if (!authService.getCurrentUser()) {
        return (
            <Redirect
                to='/login'
            />
        );
    }

    if (!event) {
        return (
            <div className='container'>
                <h1>Uh Oh! No event found with that id</h1>
            </div>
        );
    }

    return (
        <div className='col-md-12'>
            <div className='card card-container'>
                <form onSubmit={handleUpdate}>
                    <div className='form-group'>
                        <label htmlFor='name'>Name</label>
                        <input
                            type='text'
                            className='form-control'
                            name='name'
                            value={name}
                            onChange={onChangeName}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='type'>Type</label>
                        <input
                            type='text'
                            className='form-control'
                            name='type'
                            value={type}
                            onChange={onChangeType}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='category'>Category</label>
                        <input
                            type='text'
                            className='form-control'
                            name='category'
                            value={category}
                            onChange={onChangeCategory}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='startDate'>Starts At:</label>
                        <input
                            type='text'
                            className='form-control'
                            name='startDate'
                            value={startDate}
                            onChange={onChangeStartDate}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='endDate'>Ends At:</label>
                        <input
                            type='text'
                            className='form-control'
                            name='endDate'
                            value={endDate}
                            onChange={onChangeEndDate}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='place'>Place</label>
                        <input
                            type='text'
                            className='form-control'
                            name='place'
                            value={place}
                            onChange={onChangePlace}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='address'>Address</label>
                        <input
                            type='text'
                            className='form-control'
                            name='address'
                            value={address}
                            onChange={onChangeAddress}
                        />
                    </div>
                    <button className="btn btn-success">Update Event</button>
                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}

                </form>
            </div>
            <br></br>
            <br></br>
        </div>

    );
}

export default EditEvent;