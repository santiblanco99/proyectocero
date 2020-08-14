var express = require('express');
var verifyToken = require('../auth/verifyToken');
var router = express.Router();
var userDB = require('../db/userDB');


const Pool = require('pg').Pool

const pool = new Pool();

const getEvents = async (req,res,next) => {

    try {
        console.log('llegueeeeee');
        var events = await pool.query('SELECT * FROM eee');
        console.log(events);
         req.events = events.rows;
         next();
    } catch (error) {
        console.log(error);
        res.status(500).send('error en query');
    }

};


const primeraFuncion = (req,res,next) => {
    // res.send('firt');
    res.header('primera','sdgdgdgd');
    next();
}

const someFunction = async (req,res,next) =>{

    try {
        res.header('primera','fdfdfdf');
        // res.send('hey');
        var user = await userDB.createUser('sdsds');
        next();
    } catch (error) {
        console.log(error);
        console.log('error acaaaa')
        res.send('pffff');
    }
  
};



router.get('/',primeraFuncion,getEvents,(req,res) =>{
    console.log(req.events);
    res.send(req.events);
});





module.exports = router;