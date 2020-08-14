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


const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');

const authRoutes = require('./auth/authRoutes');


const testRoutes = require('./routes/testRoutes');


app.use('/api',authRoutes);
app.use('/api',eventRoutes);

app.use('/test',testRoutes);


app.use('/',userRoutes);

app.use('/events',eventRoutes);




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});