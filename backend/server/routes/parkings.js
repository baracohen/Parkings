const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// get parkings
router.get('/', (req, res) => {
    res.send("helow");
});

// get users by id

// update parkings 

router.post('/login', async (req, res) => {
    console.log("it's working !!!")
    console.log(req.body);
    if(req.body.email && req.body.pass) {
        res.send(true);

    } else {
        return false;
    }
});



module.exports = router;