const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();



const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is start on port ${port}`) )

// mongoose.connect(process.env.PG_URI, {
//     dbName:'ParkingDB',
//     useNewUrlParser: true,
//     useUnifiedTopology: true 
// }).then(() => {
//     console.log('MongoDB connected...')
// }).catch((err) => {console.log(err)})
//Middleware
app.use(bodyParser.json());
app.use(cors());

const parkings = require('./routes/parkings');

app.use('/api/parkings', parkings);