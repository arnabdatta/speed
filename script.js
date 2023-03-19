var prevLat;
var prevLon;
var curLat;
var curLon;
var curSpeed;
var dist;
var speed;

setInterval(getCurrentPosition, 2000);

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
        navigator.geolocation.getCurrentPosition(storePosition);
    } else {

    }
}

function storePosition(position) {
    document.getElementById("curLat").innerHTML = position.coords.latitude;
    document.getElementById("curLon").innerHTML = position.coords.longitude;
    prevLat = curLat;
    prevLon = curLon;
    curLat = position.coords.latitude;
    curLon = position.coords.longitude;
    dist = getDistance(curLat, curLon, prevLat, prevLon, 'K') * 1000;
    document.getElementById("curSpeed").innerHTML = dist + 'm';
    speed = dist /  2;
    document.getElementById("curSpeed").innerHTML = speed + 'm/s';
}


