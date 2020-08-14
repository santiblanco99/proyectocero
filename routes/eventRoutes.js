var express = require('express')
var db = require('../db/events');
var router = express.Router();

router.get('/',db.getEvents);


module.exports = router;