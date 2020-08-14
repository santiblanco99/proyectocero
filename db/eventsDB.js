const Pool = require('pg').Pool

const pool = new Pool();

const getUserEvents = async (email) => {

    try {
        var events = await pool.query('SELECT * FROM events WHERE user_id = $1 ORDER BY created_at DESC', [email]);
        console.log(events);
        return events.rows;
    } catch (error) {
        console.log(error);
    }

};


module.exports = {
    getUserEvents,
};