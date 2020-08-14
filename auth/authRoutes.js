const Pool = require('pg').Pool
const pool = new Pool();

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

router.post('/register', (req, res) => {
    const { name, email, lastname, password } = req.body
    console.log(req.body);
    var hashedPassword = bcrypt.hashSync(password);

    pool.query('INSERT INTO users (name, lastname, email, password) VALUES ($1, $2, $3, $4)', [name, lastname, email, hashedPassword], (error, result) => {
        if (error) {
            throw error
        }
        console.log(result);
        response.status(201).send(`User added`)
        var token = jwt.sign({ id: email }, process.env['secret'], {
            expiresIn: 86400
        });
        res.status(200).send({ auth: true, token: token });
    })

});

router.get('/me', function (req, res) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env['secret'], function (err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        res.status(200).send(decoded);
    });
});

module.exports = router;