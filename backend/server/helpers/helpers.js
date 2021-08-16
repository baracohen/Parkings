const cache = require('../cache/cache')



    SetParkings = async (arr, date) => {

        const _parkings = await setAllParkings(arr, date);

        return _parkings;
    },


    filterAndSetAvailableParkings = async (arr, date) => {
        const parkings =  await cache();
        let _availableParkings = {};

        if(arr && arr.length > 0) {
            _availableParkings = parkings.filter(el => {
                      return !arr.find(element => {
                         return element.parkingId === el.parkingId;
                      });
               });
        } else {
            _availableParkings = parkings
        }

        if(_availableParkings && _availableParkings.length > 0) {

            _availableParkings.forEach((itm) =>{
                itm._doc.isAvailable = true;
                itm._doc.date = date;
            });
        }

        let obj = {
            date: date,
            parkings: _availableParkings
        };

        return obj
    }
    setAllParkings = async (arr, date) => {
        const parkings =  await cache();
            parkings.forEach((itm) => {
                itm._doc.isAvailable =  true;
                itm._doc.date = date;

                let isExist = arr && arr.length > 0 ? arr.filter(element => {
                           return element.parkingId === itm.parkingId;
                  }) : [];
                if(isExist && isExist.length > 0) {
                    itm._doc.isAvailable =  false;
                    itm._doc.userId = isExist[0].userId;
                }
            });

        let obj = {
            date: date,
            parkings: parkings
        };

        return obj
    }


module.exports = {
    SetParkings: SetParkings,
    SetAllParkings:setAllParkings
};