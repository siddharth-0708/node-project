console.log("This is window javascript"); //This we are running from HTML so it wont be visible in terminal.It will be visible in the brower console

//Meaning of fetch is it is a web brower API to send requests. You cannot see the response in node but you need to go in brower to see.
//It will fetch the path, 'then' it will call the callback function with the response.Then it will parse the response and call the callback function
//to pass the parsed data.Then we can use the data as we like

// fetch('http://api.weatherstack.com/current?access_key=c422ece850dce280cec2bbb52beed46a&query=hyderabad').then(function(response){
//     response.json().then(function(data){
//         console.log(data.location); 
//     })
// })

//Local Host

const weatherElement = document.querySelector('form');
const searchElement = document.querySelector('input');

const message1 = document.querySelector('#message1');
message1.textContent = '';

const message2 = document.querySelector('#message2');
message2.textContent = '';

weatherElement.addEventListener('submit',function(event){
    event.preventDefault();
    const location = searchElement.value;

    //fetch('http://localhost:3500/weather?address='+ location).then(function(response){ //package.json script start saying the server what to run on start so that webserver is running and heroku gives default port to run on , in app,js it is kept
    fetch('/weather?address='+ location).then(function(response){ //from root it will go like declared in app.js, give like how we give in get address....herooku
        response.json().then(function(data){
            if(data.error){
                message1.textContent = data.error;
            } else {
                message1.textContent = "Lattitude is" + " " +  data.lattitude + "and"+ " "+ "Longitude is" + " " + data.longitude
                message2.textContent =  "Place is"+ " "+ data.place + " "+ "and" + " "+ "Temperature is" + " " + data.temperature + " " + "degrees"
            }
        })
    })
})