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

                if (i===3){
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
                    $(directionLink).attr("href", restaurantDirections);
                var menuLink = $("<a>");
                    $(menuLink).attr("id", "menu-link" + [i]);
                    $(menuLink).attr("href","restaurantMenu");

                $("#row").append(columnDiv);
                $(columnDiv).append(cardDiv);
                $(cardDiv).append(cardbodyDiv);
                $(cardbodyDiv).append(cardtitle);
                $(cardbodyDiv).append(cardsubtitle);
                $(cardbodyDiv).append(pEl);
                $(cardbodyDiv).append(homeLink);
                $(cardbodyDiv).append(directionLink);
                $(cardbodyDiv).append(menuLink);



                $(".card-title" + [i]).append(restaurantName);
                // $(".card-subtitle mb-2 text-muted" + [i]).append(stringRating); //NO SHOW
                $("#home-link" + [i]).append(homeLink).text(restaurantName);
                $("#directions-link" + [i]).append(directionLink).html("<br>" + restaurantDirections);
                $("#menu-link" + [i]).append(menuLink).html("<br> Menu");
                $(".card-text" + [i]).html("Phone Number: " + restaurantNumber + " <br> Schedule: " + restaurantSchedule + " <br> Cuisines: " + restaurantCuisines + "<br> Cost for Two: " + restaurantCost);

            } // For Loop
            


        }); // Search Ajax Call
    }); // Cities Ajax Call
} // Onload Function

function verify(input) {

    if (input == "") {
        $("#blankInput").append("Please put in a city and state!");
        document.getElementById('city-state').style.backgroundColor = "#e37685";
        return false;
    }
    else {
        zipCodeForm.style.diplay = "none"
        starterTag.style.display = "inline"
    }
    
}

//opens restaurants page - rename element on index.html for submit-btn
$('#submit-btn').on('click', function(event){
    event.preventDefault();
    
    // Local storing city and state
    var userInput = $("#city-state").val().trim();
    //if user input is blank or if ajax call returns undefined
    if (verify(userInput) == false){
        return;
    }
    
    localStorage.setItem("userInput", JSON.stringify(userInput));
    //updated this to open page in same window instead of a different tab
    window.location.href="restaurants.html";

}); // Click Function