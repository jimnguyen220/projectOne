var resultOne = $('#result-1-1');
var resultTwo = $('#result-1-2');
var resultThree = $('#result-1-3');
var resultFour = $('#result-2-1');
var resultFive = $('#result-2-2');
var resultSix = $('#result-2-3');
var resultSeven = $('#result-3-1');
var resultEight = $('#result-3-2');
var resultNine = $('#result-3-3');
var resultTen = $('#result-4-1');
var resultEleven = $('#result-4-2');
var resultTwelve = $('#result-4-3');

var userChoice = JSON.parse(localStorage.getItem("userInput"));


function renderPage() {
console.log(userChoice);
$.ajax({
    url: "https://developers.zomato.com/api/v2.1/cities?q=Madison, WI",
    headers: { 'user-key': '7f4fa469b70c80542b1210267c2e78aa' }
}).then(function (search) {

        var searchVar = search.location_suggestions[0].id;
        // var zipCode = search.restaurants[0].restaurant.location.zipcode;
        console.log(searchVar);
        // console.log(zipCode);
    

    $.ajax({
        url: "https://developers.zomato.com/api/v2.1/search?entity_id=" + searchVar + "&entity_type=city",
        headers: { 'user-key': '59d32d7639d297f576ffc1c3d64a97f4' }
    }).then(function (results) {
        console.log(results);
        var location = results.restaurants[0].restaurant.location.address;
        console.log(location);
        
        var restaurants = search.restaurants


        // var userRating = results.restaurants[0].restaurant.user_rating.aggregate_rating;
        // $('#rating-1').append(userRating);


        for (var i =0; i <search.restaurants.length; i++) {
            var userRating = results.restaurants[i].restaurant.user_rating.aggregate_rating;

        }
    })

}); // Search Ajax Call
};

renderPage();