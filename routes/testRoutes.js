var express = require('express');
var verifyToken = require('../auth/verifyToken');
var router = express.Router();
var userDB = require('../db/userDB');


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



router.get('/',primeraFuncion,someFunction,(req,res) =>{
    res.send('El final');
});





module.exports = router;