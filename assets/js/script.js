
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

                if (i === 12) {
                    break;
                }

                // Restaurant Cost for Two
                var restaurantCost = search.restaurants[i].restaurant.average_cost_for_two;
                // Restaurant Name
                var restaurantName = search.restaurants[i].restaurant.name;
                // Restaurant Rating
                var restaurantRating = search.restaurants[i].restaurant.user_rating.rating_text;
                // Restaurant Description
                var restaurantNumber = search.restaurants[i].restaurant.phone_numbers;
                var restaurantSchedule = search.restaurants[i].restaurant.timings;
                var restaurantCuisines = search.restaurants[i].restaurant.cuisines;
                //Restaurant Menu
                var restaurantMenu = search.restaurants[i].restaurant.menu_url;
                // Restaurant Home Page
                var restaurantURL = search.restaurants[i].restaurant.url;
                // Restaurant Directions            
                var restaurantDirections = search.restaurants[i].restaurant.location.address;
                // Restaurant Latitude
                var restaurantLat = search.restaurants[i].restaurant.location.latitude;
                // Restaurant Longitude
                var restaurantLon = search.restaurants[i].restaurant.location.longitude;

                console.log(restaurantName);
                console.log(restaurantRating);
                console.log(restaurantURL);
                console.log(restaurantDirections);
                console.log(restaurantNumber);
                console.log(restaurantSchedule);
                console.log(restaurantCuisines);

                var columnDiv = $("<div>");
                $(columnDiv).attr("class", "col-sm-12 col-md-4 col-lg-4");
                var cardDiv = $("<div>");
                $(cardDiv).attr("class", "card start");
                $(cardDiv).css("width: 20rem");

                var cardbodyDiv = $("<div>");
                $(cardbodyDiv).attr("class", "card-body");
                var cardtitle = $("<h5>");
                $(cardtitle).attr("class", "card-title" + [i]);
                var cardsubtitle = $("<h6>");
                $(cardsubtitle).attr("class", "card-subtitle mb-2 text-muted" + [i]);
                var pEl = $("<p>");
                $(pEl).attr("class", "card-text" + [i]);
                var homeLink = $("<a>");
                $(homeLink).attr("id", "home-link" + [i]);
                $(homeLink).attr("href", restaurantURL);
                var directionLink = $("<a>");
                    $(directionLink).attr("id", "directions-link" + [i]);
                    // $(directionLink).attr("href", restaurantDirections);
                    $(directionLink).attr("data-lat", + restaurantLat);
                    $(directionLink).attr("data-lon", + restaurantLon);
                    $(directionLink).attr("data-name", + restaurantName);
                    $(directionLink).attr("class", "map-link")
                    //removed href link and created class for event listener
                var menuLink = $("<a>");
                $(menuLink).attr("id", "menu-link" + [i]);
                $(menuLink).attr("href", restaurantMenu);

                $("#row").append(columnDiv);
                $(columnDiv).append(cardDiv);
                $(cardDiv).append(cardbodyDiv);
                $(cardbodyDiv).append(cardtitle);
                $(cardbodyDiv).append(cardsubtitle);
                $(cardbodyDiv).append(pEl);
                $(cardbodyDiv).append(homeLink);
                $(cardbodyDiv).append(directionLink);
                $(cardbodyDiv).append(menuLink);
                


                $(".card-title" + [i]).html("<h2>"+restaurantName+"</h2><br>");
                // $(".card-subtitle mb-2 text-muted" + [i]).append(stringRating); //NO SHOW
                $("#home-link" + [i]).append(homeLink).html("<br>🌐" + restaurantName);
                $(".card-text" + [i]).html("📞Phone Number: " + restaurantNumber + " <br>📅Schedule: " + restaurantSchedule + " <br>🍛Cuisines: " + restaurantCuisines + "<br>💲💲Cost for Two: " + restaurantCost);
                $("#directions-link" + [i]).append(directionLink).html("<br>🚗" + restaurantDirections);
                $("#menu-link" + [i]).append(menuLink).html("<br>🧾Menu");



                // localStorage.setItem("restaurantLat" + [i], restaurantLat);
                // localStorage.setItem("restaurantLon" + [i], restaurantLon);

            } // For Loop



        }); // Search Ajax Call
    }); // Cities Ajax Call
} // Onload Function

function verify(input) {

    if (input == "") {
        $("#blankInput").text("Please put in a city and state!");
        document.getElementById('city-state').style.backgroundColor = "#e37685";
        return false;
    }

}

//opens restaurants page - rename element on index.html for submit-btn
$('#submit-btn').on('click', function (event) {
    event.preventDefault();

    // Local storing city and state
    var userInput = $("#city-state").val().trim();
    //if user input is blank or if ajax call returns undefined
    if (verify(userInput) == false) {
        return;
    }
    localStorage.setItem("userInput", JSON.stringify(userInput));
    //updated this to open page in same window instead of a different tab
    window.location.href = "./restaurants.html";


}); // Click Function


// Click Function for GO!
$("#go-button").click(function (event) {

        event.preventDefault();
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
                
    
    
    
            }) // Search Ajax Call
        }); // Cities Ajax Call
})


//listener for click to get to directions
$(document).on('click', '.map-link', function() {

    var restaurantCoords = {
        lat: $(this).attr("data-lat"),
        lng: $(this).attr("data-lon")
    };
    var restaurantName = $(this).attr("data-name");
    localStorage.setItem("restaurantCoords", JSON.stringify(restaurantCoords));
    localStorage.setItem("restaurantName", restaurantName);
    window.location.href="./maps.html";
});
