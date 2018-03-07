const departureTime = "13:20".split(':');
const currentDateTime = new Date();
const departureDateTime = new Date(currentDateTime.getFullYear(), currentDateTime.getMonth(), currentDateTime.getDate(), departureTime[0], departureTime[1]);
console.log(departureDateTime);