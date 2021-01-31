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



//opens restaurants page - rename element on index.html for submit-btn
$('#submit-btn').on('click', function(event){
    event.preventDefault();
    
    // Local storing city and state
    var userInput = $("#city-state").val();
    localStorage.setItem("userInput", JSON.stringify(userInput));
    //updated this to open page in same window instead of a different tab
    window.location.href="restaurants.html";



    // Ajax call to get restaurants in city
    var citystateVal = $("#city-state").val();
    console.log(citystateVal);

    $.ajax({
        url: "https://developers.zomato.com/api/v2.1/cities?q=" + citystateVal,
        headers: { 'user-key': '7f4fa469b70c80542b1210267c2e78aa' }
    }).done(function (cities) {

            var citiesID = cities.location_suggestions[0].id;
            console.log(citiesID);
        

        $.ajax({
            url: "https://developers.zomato.com/api/v2.1/search?entity_id=" + citiesID + "&entity_type=city",
            headers: { 'user-key': '59d32d7639d297f576ffc1c3d64a97f4' }
        }).then(function (search) {
            console.log(search);

            for (var i = 0; i < search.restaurants.length; i++) {

                if (i>3){
                    break;
                }

                // Restaurant Image
                // Restaurant Name
                var restaurantName = search.restaurants[i].restaurant.name;
                // Restaurant Rating
                // Restaurant Description
                // Restaurant Home Page
                var restaurantURL = search.restaurants[i].restaurant.url;
                // Restaurant Directions            
                var restaurantDirections = search.restaurants[i].restaurant.location.address;

                console.log(restaurantName);
                console.log(restaurantURL);
                console.log(restaurantDirections);
            }
            


        }) // Search Ajax Call
    }); // Cities Ajax Call

   

}); // Click Function

// Onload Function
function loadRestaurantInfo() {

    // Ajax call to get restaurants in city
    var citystateVal = localStorage.getItem("userInput");
    console.log(citystateVal);

    $.ajax({
        url: "https://developers.zomato.com/api/v2.1/cities?q=" + citystateVal,
        headers: { 'user-key': '7f4fa469b70c80542b1210267c2e78aa' }
    }).done(function (cities) {

        var citiesID = cities.location_suggestions[0].id;
        console.log(citiesID);
        

        $.ajax({
            url: "https://developers.zomato.com/api/v2.1/search?entity_id=" + citiesID + "&entity_type=city",
            headers: { 'user-key': '59d32d7639d297f576ffc1c3d64a97f4' }
        }).then(function (search) {
            console.log(search);

            for (var i = 0; i < search.restaurants.length; i++) {

                if (i>3){
                    break;
                }

                // Restaurant Image
                // Restaurant Name
                var restaurantName = search.restaurants[i].restaurant.name;
                // Restaurant Rating
                // Restaurant Description
                // Restaurant Home Page
                var restaurantURL = search.restaurants[i].restaurant.url;
                // Restaurant Directions            
                var restaurantDirections = search.restaurants[i].restaurant.location.address;

                console.log(restaurantName);
                console.log(restaurantURL);
                console.log(restaurantDirections);

                $(".card-title").append(restaurantName);
            }
            


        }) // Search Ajax Call
    }); // Cities Ajax Call
} // Onload Function