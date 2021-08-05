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
    if(req.body.parkings && req.body.parkings.length > 0 ) {
        const _parkings = req.body.parkings;
        var sendExist = false;
        
        for (const parking of _parkings) {
            const query = { "parkingId": parking.parkingId, "date": parking.date };
            const _isExist = await connectionModel.find(query);
 
            if(_isExist && _isExist.length > 0 ) {
                 sendExist = true;
                 break;
            };
          }
        if(!sendExist) {
            try{
                const options = { ordered: true };
                const result = await connectionModel.insertMany(_parkings, options);
                res.send(result);

            }catch(err){
                res.send(err);
            }

        } else {
            res.send(false);

        }
    } else {
        return false;
    }
});

router.post('/userParkings', async (req, res) => {
    if(req.body.userId) {
        res.send([
            {
                date:"31.05.16",
                parkings:
                [
                    {
                    date:"31.05.2021",
                    parkingId:162,
                    floor:"",
                    isAvalable:false
                    }
                ]
            },
            {
                date:"1.06.16",
                parkings:
                [
                    {
                    date:"1.06.2021",
                    parkingId:162,
                    floor:"",
                    isAvalable:false
                    }
                ]
            },
            {
                date:"02.06.16",
                parkings:
                [
                    {
                    date:"02.06.2021",
                    parkingId:162,
                    floor:"",
                    isAvalable:false
                    }
                ]
            }, 
            {
                date:"03.06.16",
                parkings:
                [
                    {
                    date:"03.06.2021",
                    parkingId:162,
                    floor:"",
                    isAvalable:false
                    }
                ]
            },    
            {
                date:"04.06.16",
                parkings:
                [
                    {
                    date:"04.06.2021",
                    parkingId:162,
                    floor:"",
                    isAvalable:false
                    }
                ]
            }, 
            {
                date:"05.06.16",
                parkings:
                [
                    {
                    date:"05.06.2021",
                    parkingId:162,
                    floor:"",
                    isAvalable:false
                    }
                ]
            },                        
                    
        ]

        );
    } else {
        return false;
    }
});
router.post('/availableParkings', async (req, res) => {
    const parkings =  await cache();
    
    const query = { "date":{$gte: req.body.startDate, $lt: req.body.endDate }};
    
    connectionModel.find(query).exec((err, data) => {
        if(err) {
            res.send(err);
        } else {

            if(data && data.length > 0) {
                let _parkings = [];

                if(req.body.isAll) {
                    _parkings = data;
                } else {
                    _parkings = helpers.SetAvailableParkings(data);
                }
                res.send(_parkings)
            } else {
                
                res.send(parkings)
            }
        }
    })
});

router.post('/availableParkings', async (req, res) => {
    
    
    let _parkings = [];
    for (const date of req.body.dates) {
        const query = { "date": date};
        let parkings = await connectionModel.find(query)

            if(req.body.isAll) {
                //_parkings = data;
                _parkings.push(await helpers.SetAllParkings(parkings, date));

            } else {
                _parkings.push(await helpers.SetAvailableParkings(parkings, date));
            }
      }
      res.send(_parkings)
});


module.exports = router;