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
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}
var coordinates = {};


function showPosition(position) {
  console.log("Latitude: " + position.coords.latitude);
  console.log("Longitude: " + position.coords.longitude);

  // myLatlng = new google.maps.LatLng(mapLat,mapLng);

  coordinates = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  }

  getMap();

  // localStorage.setItem("coordinates", JSON.stringify(coordinates));
 
}

function getMap() {

  var mapOptions = {
    zoom: 12,
    center: coordinates
    // 'coordinates should be entered as object '{lat: 44.978200, lng: -93.274120}' or 'new google.maps.LatLng(44.978200, -93.274120)'
  }
  map = new google.maps.Map(document.getElementById("map"), mapOptions);

  // var marker = new google.maps.Marker ({
  //   position: myLatlng,
  //   map: map
  // })
  calcRoute();
}


function calcRoute() {
  var directionsService = new google.maps.DirectionsService();
  var directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);
  var request = {
    origin: coordinates,
    destination: {lat: 44.978200, lng: -93.274120},
    //change hard code to coordinates from local storage from zomato API
    travelMode: 'DRIVING'
  };

  directionsService.route(request, function(result, status) {
    if (status == 'OK') {
      directionsRenderer.setDirections(result);
    }
  });
}

$('#get-location').on('click', getLocation);

