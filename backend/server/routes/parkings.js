const express = require('express');
const connectionModel = require('../models/parkingModel');
const cache = require('../cache/cache');
const helpers = require('../helpers/helpers');
const router = express.Router();

// get parkings
router.get('/', (req, res) => {
    res.send("helow");
});

// get users by id

// update parkings 

router.post('/login', async (req, res) => {
    if(req.body.email && req.body.pass) {
        res.send(
            user = {
                userId:1,
                FirstName: "Barak",
                LastName: "Cohen",
                pic: "https://api.duniagames.co.id/api/content/upload/file/8143860661599124172.jpg",
                perm:"Admin"
            }
        );
    } else {
        return false;
    }
});

router.post('/todayUserParking', async (req, res) => {
    if(req.body.userId && req.body.date) {
        const query = { "userId": req.body.userId, "date": req.body.date };

        connectionModel.find(query).exec((err, data) => {

            if(err) {
                res.json(err)
            }else {
                if(data && data.length > 0) {
                    res.send(data)
                }else {
                    return false;
                }
            }
        })
    } else {
        return false;
    }
});

router.post('/saveParkings', async (req, res) => {
    if(req.body.parkingConnection ) {
        const _parkingConnection = req.body.parkingConnection;
        var sendExist = false;

        const query = { "parkingId": _parkingConnection.parkingId, "date": _parkingConnection.date };
        const _isExist = await connectionModel.find(query);

        if(_isExist && _isExist.length > 0 ) {
             sendExist = true;
        };

        if(!sendExist) {
            try{
                const options = { ordered: true };
                console.log(_parkingConnection);

                const result = await connectionModel.create(_parkingConnection);

                res.send(result);

            }catch(err){
                console.log(err);
                res.send(err);
            }

        } else {
            res.send(false);
            res.send(false);

        }
    } else {
        return false;
    }
});

router.post('/userParkings', async (req, res) => {
    if(req.body.userId) {
        let _parkings = [];
        for (const date of req.body.dates) {
            const query = { "date": date, "userId": req.body.userId};
            let parkings = await connectionModel.find(query);
                if(parkings && parkings.length > 0){
                    parkings[0]._doc.isAvailable =  false;
                    let obj = {
                        date: date,
                        parkings: parkings[0]
                    };
                    _parkings.push(obj);
                }
          }
          res.send(_parkings)
    } else {
        return false;
    }
});

router.post('/availableParkings', async (req, res) => {
    
    
    let _parkings = [];
    for (const date of req.body.dates) {
        const query = { "date": date};
        let parkings = await connectionModel.find(query)
            _parkings.push(await helpers.SetParkings(parkings, date));
      }
      res.send(_parkings)
});

router.post('/cancelConnection', async (req, res) => {
    
    const _parkingConnection = req.body.parkingConnection;
    const query = { "parkingId": _parkingConnection.parkingId, "date": _parkingConnection.date, "userId": _parkingConnection.userId  };
    const _isExist = await connectionModel.deleteOne(query);
    
    res.send(_isExist)
});


module.exports = router;