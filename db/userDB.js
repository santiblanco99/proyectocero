const Pool = require('pg').Pool

const pool = new Pool();

const getUserById = async (id) => {
    var res = await pool.query('SELECT * FROM USERS WHERE email = $1', [id]);
    console.log(res.rows[0]);
    return res.rows[0];
};

const getUserByUsername = async (id) => {
    var res = await pool.query('SELECT * FROM USERS WHERE username = $1', [id]);
    console.log(res.rows[0]);
    return res.rows[0];
};

const createUser = async (name, lastname, email, password, username) => {

    try {
        var result = await pool.query('INSERT INTO users (name, lastname, email, password, username) VALUES ($1, $2, $3, $4, $5) RETURNING *', [name, lastname, email, password, username]);
        return result.rows[0];
    } catch (error) {
        console.log(error);
    }


}


module.exports = {
    getUserById,
    getUserByUsername,
    createUser
};