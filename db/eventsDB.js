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

const createEvent = async(name,category,place,address,start,end,type,user) => {
    try {
        var newEvent = await pool.query('INSERT INTO events (name,category,place,address,startdate,enddate,type,user_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
        [name,category,place,address,start,end,type,user]);
        return newEvent.rows[0];
    } catch (error) {
        console.error(error);
        return error;
    }
}

const getEventById = async(id) => {
    try {
        var event = await pool.query('SELECT * FROM events WHERE id = $1',[id]);
        return event.rows[0];
    } catch (error) {
        console.log(error);
        
    }
};


module.exports = {
    getUserEvents,
    getEventById,
    createEvent
};