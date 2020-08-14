var express = require('express')
var eventsDB = require('../db/eventsDB');
var userDB = require('../db/userDB');
var verifyToken = require('../auth/verifyToken');
var router = express.Router();

router.get('/events',verifyToken, async(req,res) => {
    try {
        var loggedUser = await userDB.getUserById(req.userId);
        console.log(loggedUser);
        var events = await eventsDB.getUserEvents(loggedUser.email);
        res.json(events);
    } catch (error) {
        
    }
});


router.post('/events',verifyToken,async(req,res)=> {
    try {
        const loggedUser = await userDB.getUserById(req.userId);
        (event_name, event_category, event_place, event_address, event_initial_date,
            event_final_date,event_type) = req.body;
        
        await eventsDB.createEvent(event_name,event_category,event_place,event_address,event_initial_date,event_final_date,
            event_type,loggedUser.email);
        res.redirect('/events');
    } catch (error) {
        
    }
});


module.exports = router;