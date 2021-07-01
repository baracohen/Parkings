const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const parkings = require('./routes/parkings');

require('dotenv').config();

const app = express();



const port = process.env.PORT || 5000;

mongoose.connect(process.env.DATABASE_ACCESS, {
    dbName:'ParkingsDB',
    useNewUrlParser: true,
    useUnifiedTopology: true 
}).then(() => {
    console.log('MongoDB connected...')
}).catch((err) => {console.log(err)})
//Middleware

app.use(express.json());
app.use(cors());

app.use('/api/parkings', parkings);
app.listen(port, () => console.log(`Server is start on port ${port}`) )
