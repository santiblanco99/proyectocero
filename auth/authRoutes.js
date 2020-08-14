const userDB = require('../db/userDB');

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

router.get('/me', (req, res) => {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env['secret'], async (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        var user = await userDB.getUserById(decoded.id);
        console.log(user);
        res.status(200).json(user);
    });
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