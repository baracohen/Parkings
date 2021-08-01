const cache = require('../cache/cache')



    setAvailableParkings = async (arr, date) => {

        const _parkings = await filterAndSetAvailableParkings(arr, date);

        return _parkings;
    },


    setAllParkings = (arr) => {

    }

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
                itm._doc.isAvalable = true;
                itm._doc.date = date;
            });
        }

        let obj = {
            date: date,
            parkings: _availableParkings
        };

        return obj

    }

    getRangeDates = (startDate, endDate) => {

        const arr = new Array();
        const dt = new Date(startDate);
        while (dt <= endDate) {
            arr.push(new Date(dt));
            dt.setDate(dt.getDate() + 1);
        }
        return arr;
       }


module.exports = {
    SetAvailableParkings: setAvailableParkings,
    GetRangeDates: getRangeDates,
    SetAllParkings:setAllParkings
};