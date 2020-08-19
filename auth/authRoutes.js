const userDB = require('../db/userDB');
const verifyToken = require('./verifyToken');


var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

router.post('/create-user', async (req, res) => {
    try {
        const { first_name, email, last_name, password, username } = req.body
        // console.log(req.body);
        var hashedPassword = bcrypt.hashSync(password);
        var newUser = await userDB.createUser(first_name, last_name, email, hashedPassword,username);
        if(!newUser){
            return res.status(500).send('Could not create new user');
        }
        var token = jwt.sign({ id: email }, process.env['secret'], {
            expiresIn: 86400,
        });
        res.header('authorization',token);
        return res.status(200).send({
            token: token,
            user: newUser
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send('Could not create new user');

    }
});



router.post('/api-auth', async (req,res) =>{
    try {
        var user = await userDB.getUserByUsername(req.body.username);

        if(!user){
            return res.status(500).send("There was a problem finding the user.");
        }
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        var token = jwt.sign({ id: user.email }, process.env['secret'], {
            expiresIn: 86400, // expires in 24 hours
        });

        return res.status(200).send({ token: token });
    } catch (error) {
        console.log(error);
        return res.status(500).send("There was a problem finding the token.");
    }
});

router.post('/login', async (req, res) => {
    try {
        var user = await userDB.getUserById(req.body.email);
        if(!user){
            return res.status(500).send('User not found');
        }
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        var token = jwt.sign({ id: user.email }, process.env['secret'], {
            expiresIn: 86400 // expires in 24 hours
        });
        return res.status(200).send({ user: user, token: token });
    } catch (error) {
        console.log(error);
    }

});

module.exports = router;