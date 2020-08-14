const Pool = require('pg').Pool

const pool = new Pool();

const getUserById = async (id) => {
    var res = await  pool.query('SELECT * FROM USERS WHERE email = $1',[id]);
    console.log(res.rows[0]);
    return res.rows[0];
  };

const createUser = async (name,lastname,email,password) => {

    try {
        var result = await pool.query('INSERT INTO users (name, lastname, email, password) VALUES ($1, $2, $3, $4)', [name, lastname, email, password]);
        return result.id;
    } catch (error) {
       console.log(error); 
    }
    
    
}


  module.exports = {
    getUserById,
    createUser
  };