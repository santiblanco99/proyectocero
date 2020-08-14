const Pool = require('pg').Pool

const pool = new Pool();

const getUserEvents = async (email) => {

    try {
        var events = await pool.query('SELECT * FROM events WHERE user_id = $1 ORDER BY created_at DESC', [email]);
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
        return null;
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

const updateEventById = async(req) => {
    try {
        var id = parseInt(req.params.id);
        const { event_name, event_category, event_place, event_address,
            event_initial_date, event_final_date, event_type } = req.body;
            updatedEvent = await pool.query('UPDATE events SET name = $1, category = $2, place = $3, address = $4, startdate = $5, enddate = $6, type = $7 WHERE id = $8 RETURNING *',
            [event_name,event_category,event_place, event_address, event_initial_date, event_final_date, event_type, id ]);

            return updatedEvent.rows[0];
    } catch (error) {
        console.log(err);
        
    }
};

const deleteEvent = async(id) => {
    try {
        var deletedEvent = await pool.query('DELETE FROM events WHERE id = $1 RETURNING *',[id]);
        return deletedEvent.rows[0];
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getUserEvents,
    getEventById,
    createEvent,
    updateEventById,
    deleteEvent
};