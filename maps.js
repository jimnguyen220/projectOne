function initMap() {
  
  var location = { lat: 44.977, lng: -93.264 };
  var map = new google.maps.Map(document.getElementById("map"), {
    center: location,
    zoom: 13,
  });
  var marker = new google.maps.Marker ({
    position: location,
    map: map
  })
}

function getLocation() {
    navigator.geolocation.getCurrentPosition(showPosition);
}

var coordinates = {};
var mapLat;
var mapLng;
var myLatlng;

function showPosition(position) {
  console.log("Latitude: " + position.coords.latitude);
  console.log("Longitude: " + position.coords.longitude);

  mapLat =  position.coords.latitude;
  mapLng =  position.coords.longitude;
  myLatlng = new google.maps.LatLng(mapLat,mapLng);

  coordinates = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  }

  getMap();

  // localStorage.setItem("coordinates", JSON.stringify(coordinates));
 
  // getDirections();
}

function getMap() {
  console.log(mapLat)

  var mapOptions = {
    zoom: 12,
    center: myLatlng
    // 'center: coordinates' also works - can use coordinates as an object or 'new google.maps.LatLng(43.084, -93.986)'
  }
  map = new google.maps.Map(document.getElementById("map"), mapOptions);

  var marker = new google.maps.Marker ({
    position: myLatlng,
    map: map
  })
  calcRoute();
}

// function showMap() {

//   var directionsRenderer = new google.maps.DirectionsRenderer();
//   var chicago = new google.maps.LatLng(41.850033, -87.6500523);
//   var mapOptions = {
//     zoom:7,
//     center: chicago
//   }
//   var map = new google.maps.Map(document.getElementById('map'), mapOptions);
//   directionsRenderer.setMap(map);
// }

function calcRoute() {
  var directionsService = new google.maps.DirectionsService();
  var directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);
  var request = {
    origin: coordinates,
    destination: {lat: 44.978200, lng: -93.274120},
    travelMode: 'DRIVING'
  };

  directionsService.route(request, function(result, status) {
    if (status == 'OK') {
      directionsRenderer.setDirections(result);
    }
  });
}

$('#get-location').on('click', getLocation);

