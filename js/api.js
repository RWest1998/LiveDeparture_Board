var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://tfe-opendata.com/api/v1/timetables/36235979');
xhr.setRequestHeader("Authorization", "8F974D788A6FA7F22AEC511E8D38EC6E");
xhr.onload = function() {
    if (xhr.status === 200) {
        console.log(xhr.responseText);
    }
    else {
        alert('Request failed.  Returned status of ' + xhr.status);
    }
};
xhr.send();