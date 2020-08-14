const Pool = require('pg').Pool

const pool = new Pool();

const getUserById = async (id) => {
    var res = await  pool.query('SELECT * FROM USERS WHERE email = $1',[id]);
    console.log(res.rows[0]);
    return res.rows[0];
  };


  module.exports = {
    getUserById
  };