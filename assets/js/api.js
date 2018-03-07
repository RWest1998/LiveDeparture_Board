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
fetchData()
    .then(function(data) {
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

        for(var index = 0; index < 15; index++) {
            var output = '<div class="row">' +
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
            document.getElementById('grid').innerHTML += output;
        };
    });



