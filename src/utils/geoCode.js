var request = require('request');

var geoDetails = function(address, callback) {
    var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoic2lkcjA3IiwiYSI6ImNrZm85MWx5cTFtZXoyenQ0YzZmdTJuOTcifQ.MgtZ_XUPHOIOuBwVqBleQw&limit=1';
    request({"url": url,"json": true}, function(error, response){
       if(error){
           callback("Cannot connect to the server",undefined);
       } else if(response.body.features.length == 0){
           callback("No such city exists",undefined);
       } else {
          var obj = {
               "lattitude": response.body.features[0].center[0],
               "longitude": response.body.features[0].center[1],
               "place": response.body.features[0].place_name
           }
           callback(undefined, obj);
       }
   })
}

module.exports = {
    "geoDetails" : geoDetails,
}