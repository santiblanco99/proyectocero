const userDB = require('../db/userDB');
const verifyToken = require('./verifyToken');


var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
    try {
        const { name, email, lastname, password } = req.body
        console.log(req.body);
        var hashedPassword = bcrypt.hashSync(password);
        await userDB.createUser(name, lastname, email, hashedPassword);
        var token = jwt.sign({ id: email }, process.env['secret'], {
            expiresIn: 86400
        });
        res.status(200).send({ auth: true, token: token });

    } catch (error) {
        console.log(error);

    }
});

router.get('/me', verifyToken, async (req, res) => {

    try {

        var user = await userDB.getUserById(decoded.id);
        console.log(user);
        res.status(200).json(user);

    } catch (error) {
        console.log(error);
        res.status(500).send("There was a problem finding the user.");
    }

});

router.post('/login', async (req, res) => {
    try {
        var user = await userDB.getUserById(req.body.email);
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        var token = jwt.sign({ id: user._id }, process.env['secret'], {
            expiresIn: 86400 // expires in 24 hours
        });

        res.status(200).send({ auth: true, token: token });
    } catch (error) {
        console.log(error);
    }

});

module.exports = router;