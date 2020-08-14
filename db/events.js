const Pool = require('pg').Pool

const pool = new Pool();



const getEvents = (req,res) => {
  pool.query('SELECT * FROM events ORDER BY created_at',(err,results) => {
    if(err){
      console.log(err);
    }
    res.status(200).json(results.rows);
  });
};

const getEventById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const createUser = (request, response) => {
  const { name, email, lastname, password } = request.body
  console.log(request.body);

  pool.query('INSERT INTO users (name, lastname, email, password) VALUES ($1, $2, $3, $4)', [name, lastname, email, password], (error, result) => {
    if (error) {
      throw error
    }
    console.log(result);
    response.status(201).send(`User added`)
  })
}



module.exports = {
    getEvents
};