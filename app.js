const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors');
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors());


const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');

const authRoutes = require('./auth/authRoutes');





app.use('/api',authRoutes);
app.use('/api',eventRoutes);


app.use('/api/user',userRoutes);

app.use('/events',eventRoutes);




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});