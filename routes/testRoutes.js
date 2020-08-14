var express = require('express');
var verifyToken = require('../auth/verifyToken');
var router = express.Router();



const primeraFuncion = (req,res,next) => {
    res.send('firt');
    next();
}

const someFunction = (req,res,next) =>{
    res.header('ddddd','fdfdfdf');
    res.send('hey');
    next();
};



router.get('/',primeraFuncion,someFunction,(req,res) =>{
    res.send('El final');
});





module.exports = router;