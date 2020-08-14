var express = require('express')
var db = require('../db/users');
var router = express.Router();

router.get('/',db.getUsers);

router.get('/:id',db.getUserById);

router.post('/users',db.createUser);


module.exports = router;