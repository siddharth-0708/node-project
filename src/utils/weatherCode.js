var request = require('request');

var weatherDetails = function(address, callback) {
    var url = 'http://api.weatherstack.com/current?access_key=c422ece850dce280cec2bbb52beed46a&query=' + address;
    request({"url": url,"json": true}, function(error, response){
       if(error){
           callback("Cannot connect to the server",undefined);
       } else if(response.body.location == undefined){
           callback("No such city exists",undefined);
       } else {
          var obj = {
               "lattitude": response.body.location.lat,
               "longitude": response.body.location.lon,
               "country": response.body.location.country,
               "temperature": response.body.current.temperature
           }
           callback(undefined, obj);
       }
   })
}

module.exports = {
    "weatherDetails" : weatherDetails,
}