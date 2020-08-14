var express = require('express')
var eventsDB = require('../db/eventsDB');
var userDB = require('../db/userDB');
var verifyToken = require('../auth/verifyToken');
var router = express.Router();

router.get('/eventos',verifyToken, async(req,res) => {
    try {
        var loggedUser = await userDB.getUserById(req.userId);
        console.log(loggedUser);
        var events = await eventsDB.getUserEvents(loggedUser.email);
        res.json(events);
    } catch (error) {
        
    }
});


module.exports = router;