var prevLat;
var prevLon;
var curLat;
var curLon;
var curSpeed;
var dist;
var speed;

setInterval(getCurrentPosition, 2000);

getCurrentPosition();

function getDistance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit=="K") { dist = dist * 1.609344 }
        if (unit=="N") { dist = dist * 0.8684 }
        return dist;
    }
}

function getCurrentPosition() {
    if (navigator.geolocation) {
        const options = {
            enableHighAccuracy: true,
            timeout: 10000,
          };
        navigator.geolocation.getCurrentPosition(storePosition, errorCallback, options);
    } else {

    }
}

function errorCallback(position) {

}

function storePosition(position) {
    prevLat = curLat;
    prevLon = curLon;
    curLat = position.coords.latitude;
    curLon = position.coords.longitude;
    document.getElementById("curLat").innerHTML = position.coords.latitude + 'pre:' + prevLat;
    document.getElementById("curLon").innerHTML = position.coords.longitude + 'pre:' + prevLon;
    dist = getDistance(curLat, curLon, prevLat, prevLon, 'K');
    //dist = dist * 1000;
    document.getElementById("curSpeed").innerHTML = dist + 'KM';
    speed = dist * 3600 /  2;
    document.getElementById("curSpeed").innerHTML = speed + 'KM/h';
    document.getElementById("curSpeedNav").innerHTML = position.coords.speed + 'KM/h'
}


