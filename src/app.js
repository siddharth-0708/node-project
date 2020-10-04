const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3500

var geo = require('./utils/geoCode.js'); // when requiring something from exports, we need to give complete file name and not just the directory
var weather = require('./utils/weatherCode.js');

const gamePath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../views'); // set path always

//handlers
app.set('view engine', 'hbs'); //It is expected to be in root of the folder that is web-server in views folder by default
app.set('views', viewPath); // set path from where it will look for views folder

//2 ways to load default page
// app.get('', function(req, res){ // get is by default it is setting root open and / to go further isrrespective of the path
//     res.send("hello webserver");
// })

//***IMPORTANT***
app.use(express.static(gamePath)); //One way : takes current directory by gamepath and looks for index.html by default else u can give (/index) in page. similarly, from here move forward to acess any other HTML file, it is static. In this case the current directory on any hosting is from the public folder, HTML

app.get('/about', function(req, res){ // second way: from the root directory of any server, when someone visiting /about from the root that is opening page by default 
    res.render('about',{ //about is the file name that is rendered on the screen(HTML page), automatically searches for in views folder for about file and it will take path whatever set in views. So it will be __dirname,'../views/about' which is correct
        title1:"ABOUT",
        name: "siddharth"
    });
})

app.get('/about1', function(req, res){ 
    res.send('hello'); // **IMPORTANT!!!** if u typle manually from server then send data in page u will see else if from HTML js then in console
})

//Intergrating express and require that is geo and weather functions
app.get('/weather', function(req, res){
    if(!req.query.address){
        res.send({
            "error": "Please provide an address"
        });
        return;
    }
    geo.geoDetails(req.query.address, function(error,data){
        if(error){
            res.send({
                "error": error
            });
        } else {
            weather.weatherDetails(req.query.address, function(error,data1){
                if(error){
                    res.send({
                        "error": error
                    });
                } else {
                    res.send({
                        "lattitude": data.lattitude,
                        "longitude": data.longitude,
                        "place": data.place,
                        "temperature": data1.temperature
                    });
                }
            })
        }
    })
    
})
//app.com
//app.com/help
//app.com/about
//app.com/weather

app.get('/breakout.html/*', function(req, res){
    res.send("404 Error");
})

app.get('*', function(req, res){ 
    res.render('404', { // render means showing a file named with 404 in views folder.That is also a HTML file and uses this object
        error: "404 error page"
    }
    );
})

app.listen(port, function(){
    console.log("web server is running with port" + port);
})