// npm install @googlemaps/js-api-loader
// import { Loader } from "@googlemaps/js-api-loader"
// const loader = new Loader({
//     apiKey: "AIzaSyBqaNR3uvzsucoC2tlWSAao5fSmurSGR1g",
//     version: "weekly",
//     ...additionalOptions,
//   });
//   loader.load().then(() => {
//     map = new google.maps.Map(document.getElementById("map"), {
//       center: { lat: -34.397, lng: 150.644 },
//       zoom: 8,
//     });
//   });


let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 44.977, lng: -93.264 },
    zoom: 13,
  });
}

var x = document.getElementById("demo");


//to get this to work, need to comment out lines 13 - 16 in maps.html
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  console.log("Latitude: " + position.coords.latitude);
  console.log("Longitude: " + position.coords.longitude);

  var coordinates = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude
  }

  localStorage.setItem("coordinates", JSON.stringify(coordinates));

}

$('#get-location').on('click', getLocation);