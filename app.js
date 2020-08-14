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

const db = require('./db/users');

const userRoutes = require('./routes/userRoutes');


app.use('/',userRoutes);




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});