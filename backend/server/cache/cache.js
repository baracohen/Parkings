const NodeCache = require( "node-cache" );
const parkingsModel = require('../models/parkings');

const parkingsCacheData = new NodeCache();


const getParkings = async () => {
    const _parkingsId = parkingsCacheData.get("parkings");

    if(_parkingsId && _parkingsId.length > 0 ) {
        return _parkingsId
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