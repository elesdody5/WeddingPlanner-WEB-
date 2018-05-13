const EARTH_RADIUS = 6.371e3;

Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};

var distance = function(lat1,long1,lat2,long2){
lat1 = Math.radians(lat1) ,lat2 = Math.radians(lat2),long1 = Math.radians(long1),long2 = Math.radians(long2);
var deltaLat = Math.abs(lat2-lat1);
var deltaLong = Math.abs(long2 - long1);
var a = Math.pow(Math.sin(deltaLat/2),2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLong/2),2);
var centeralAngle = 2 * Math.asin(Math.sqrt(a));
var distance = centeralAngle * EARTH_RADIUS;
return distance;
};
module.exports = distance;
