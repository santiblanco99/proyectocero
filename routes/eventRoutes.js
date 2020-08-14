var express = require('express')
var eventsDB = require('../db/eventsDB');
var userDB = require('../db/userDB');
var verifyToken = require('../auth/verifyToken');
var router = express.Router();

router.get('/events', verifyToken, async (req, res) => {
    try {
        var loggedUser = await userDB.getUserById(req.userId);
        
        var events = await eventsDB.getUserEvents(loggedUser.email);
        if (!events) {
            res.status(500).send('Error fetching events');
        }
        res.status(200).json(events);
    } catch (error) {
        res.status(500).send('Error fetching events');
    }
});

router.get('/events/:id', verifyToken, async (req, res) => {
    var id = req.params.id;
    try {
        var event = await eventsDB.getEventById(id);
        if (!event) {
            return res.status(500).send('Couldnt fetch event');
        }
        return res.status(200).json(event);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Couldnt fetch event');
    }
});


router.post('/events', verifyToken, async (req, res) => {
    try {
        const loggedUser = await userDB.getUserById(req.userId);
        const { event_name, event_category, event_place, event_address,
            event_initial_date, event_final_date, event_type } = req.body;

        var newEvent = await eventsDB.createEvent(event_name, event_category, event_place, event_address, event_initial_date, event_final_date,
            event_type, loggedUser.email);
        if (!newEvent) {
            return res.status(500).send('Error creating event');
        }
        return res.status(200).json(newEvent);
    } catch (error) {
        console.log('error en res');
        return res.status(500).send('Error event');
    }
});

router.put('/events/:id', verifyToken, async (req,res) => {
    try {
        var updatedEvent = await eventsDB.updateEventById(req);
        if(!updatedEvent){
            return res.status(500).send('Error updating');
        }
        return res.status(200).json(updatedEvent);
    } catch (error) {
        console.log(error);
    }
});


router.delete('/events/:id',verifyToken, async (req,res) => {
    try {
        var id = parseInt(req.params.id);
        var deletedEvent = await eventsDB.deleteEvent(id);
        if(!deletedEvent){
            return res.status(500).send('Error deleting event');
        }
        return res.status(200).json(deletedEvent);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Error deleting event');
    }
});


module.exports = router;