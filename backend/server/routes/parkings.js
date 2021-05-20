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
        res.send(
            user={
                userId:1,
                FirstName: "Barak",
                LastName: "Cohen",
                pic: "https://api.duniagames.co.id/api/content/upload/file/8143860661599124172.jpg"
            }
        );
    } else {
        return false;
    }
});

router.post('/todayUserParkings', async (req, res) => {
    if(req.body.email && req.body.pass) {
        res.send(
            parking={
                parkingId:79,
                userId:1,
                date:"24.5.06"
            }
        );
    } else {
        return false;
    }
});

router.post('/userParkings', async (req, res) => {
    console.log(req.body.userId)
    if(req.body.userId) {
        res.send([
            {
                date:"24.05.16",
                parkingId:1,
                userId: 1
            },
            {
                date:"25.05.16",
                parkingId:3,
                userId: 1
            },
            {
                date:"27.05.16",
                parkingId:69,
                userId: 1
            }, 
            {
                date:"28.05.16",
                parkingId:79,
                userId: 1
            },    
            {
                date:"29.05.16",
                parkingId:79,
                userId: 1
            }, 
            {
                date:"30.05.16",
                parkingId:79,
                userId: 1
            },                        
                    
        ]

        );
    } else {
        return false;
    }
});


module.exports = router;