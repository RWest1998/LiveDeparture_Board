// Hooking into api
const fetchData = function() {
    return fetch('/static/data/data.json', {
        headers: {
            'Authorization': 'Token 8F974D788A6FA7F22AEC511E8D38EC6E'
        }
    })
        .then(function(res) {
            return res.json()
        })
        .then(function(json) {
            return json;
        });
};

//auto reload the data every minute to keep the bus timetable up to date
const intervalID = setInterval(function() {
    fetchData().then(function(data) {
        processResults(data);
    });

}, 60000);

fetchData()
    .then(function(data) {
        processResults(data);
    });

function processResults(data) {
    //display the stop name
    const stopName = data.stop_name;
    document.getElementById('stop').innerHTML = stopName + " Bus Timetable";

    const filteredItems = data.departures.filter(function(item){
        //splitting the departure time up into separate hours and minutes
        let departureTime = item.time.split(':');
        //Current date and time
        let currentDateTime = new Date();
        //defining the departure time in a readable format
        let departureDateTime = new Date(currentDateTime.getFullYear(), currentDateTime.getMonth(), currentDateTime.getDate(), departureTime[0], departureTime[1]);
        //if statement to ignore Elm Row as a destination and ignore departures after the current time
        if (item.destination !== "Elm Row" && (currentDateTime <= departureDateTime)){
            return item;
        }
    });

//HTML structure of the grid
    let gridrows = '';
    for(var index = 0; index < 10; index++) {
        output = '<div class="row">' +
            '<div class="col-sm"> ' +
            '<div>' + filteredItems[index].destination + '</div> ' +
            '</div> ' +
            '<div class="col-sm"> ' +
            '<div>' + filteredItems[index].service_name + '</div> ' +
            '</div> ' +
            '<div class="col-sm"> ' +
            '<div>' + filteredItems[index].time + '</div> ' +
            '</div> ' +
            '</div>';
        gridrows += output;
    }
    document.getElementById('grid-rows').innerHTML = gridrows;
}



