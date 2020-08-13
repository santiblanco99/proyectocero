const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const db = require('./db/index');




app.get('/', db.getUsers);

app.get('/:id',db.getUserById);

app.get('/secret',(req,res) => {
  res.send('this is the secret page');
});

app.post('/users',db.createUser);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});