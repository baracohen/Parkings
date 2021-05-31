const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();


const msal = require('@azure/msal-node');
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Msal Node Auth Code Sample app listening on port ${port}!`));

const config = {
    auth: {
        clientId: process.env.clientId,
        authority: process.env.authority,
        clientSecret: process.env.clientSecret
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel, message, containsPii) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: msal.LogLevel.Verbose,
        }
    }
};

const cca = new msal.ConfidentialClientApplication(config);

app.get('/', (req, res) => {
    const authCodeUrlParameters = {
        scopes: ["user.read"],
        redirectUri: "http://localhost:5000/redirect",
    };

    // get url to sign user in and consent to scopes needed for application
    cca.getAuthCodeUrl(authCodeUrlParameters).then((response) => {
        res.redirect(response);
    }).catch((error) => console.log(JSON.stringify(error)));
});

app.get('/redirect', (req, res) => {
    const tokenRequest = {
        code: req.query.code,
        scopes: ["user.read"],
        redirectUri: "http://localhost:5000/redirect",
    };

    cca.acquireTokenByCode(tokenRequest).then((response) => {
        console.log("\nResponse: \n:", response);
        res.sendStatus(200);
    }).catch((error) => {
        console.log(error);
        res.status(500).send(error);
    });
});
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


