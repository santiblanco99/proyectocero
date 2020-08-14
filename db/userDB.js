const Pool = require('pg').Pool

const pool = new Pool();

const getUserById = async (id) => {
    const res = await  pool.query('SELECT * FROM USERS WHERE email = $1',id);
    console.log(res);
    return res.rows[0];
  };


  module.exports = {
    getUserById
  };