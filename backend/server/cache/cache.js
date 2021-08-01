const NodeCache = require( "node-cache" );
const parkingsModel = require('../models/parkings');

const parkingsCacheData = new NodeCache();


const getParkings = async () => {
    const _parkings = parkingsCacheData.get("parkings");

    if(_parkings && _parkings.length > 0 ) {
        return _parkings
    } else {
        await parkingsModel.find().then((data) => {
            if(data && data[0]) {
                const parkings = data.shift();
                parkingsCacheData.set( "parkings", parkings.parkings);
            }
        })
    }
    return parkingsCacheData.get("parkings");
}

module.exports = getParkings;