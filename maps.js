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

function showPosition(position) {
  console.log("Latitude: " + position.coords.latitude);
  console.log("Longitude: " + position.coords.longitude);

  mapLat =  position.coords.latitude;
  mapLng =  position.coords.longitude

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
    zoom: 14,
    center: {lat: 44.9288, lng: -93.103}
  }
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

// function getDirections(origin, destination) {
//   var directionsService = new google.maps.DirectionsService();
//   var direcstionsDisplay = new google.maps.DirectionsRender();
//   request = {
//     origin: origin,
//     destination: destination,
//     travelMode: 'DRIVING'
//   }
//   direcstionsDisplay.setMap(map);
//   directionsService.route(request, (result, status) {
//     if (status == "ok") {
//       directionsDisplay.setDirections(result);
//     }
//   })
// }

$('#get-location').on('click', getLocation);

