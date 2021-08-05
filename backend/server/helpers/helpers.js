const cache = require('../cache/cache')



    setAvailableParkings = async (arr, date, isAll) => {

        const _parkings = !isAll ? await filterAndSetAvailableParkings(arr, date) : await setAllParkings(arr, date);

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
    setAllParkings = async (arr, date) => {
        const parkings =  await cache();

        if(_availableParkings && _availableParkings.length > 0) {

            parkings.forEach((itm) => {
                let isExist = arr.find(element => {
                           element.parkingId === el.parkingId;
                  });
                itm._doc.isAvalable = isExist && isExist.length > 0 ? true : false;
                itm._doc.date = date;
            });
        }

        let obj = {
            date: date,
            parkings: parkings
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