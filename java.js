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
    var userInput = {
        zipcodeInput: $('#zipcode-input').val(),
    }
    localStorage.setItem("userInput", JSON.stringify(userInput));
    
    // window.open("restaurants.html");


    // Zip code entered and submit button pressed
        // Loop through all zip codes and get the restaurants in that zip code
    var citystateVal = $(this).siblings(".zipCodeForm").val();
    console.log(citystateVal);

    $.ajax({
        url: "https://developers.zomato.com/api/v2.1/cities?q=" + citystateVal,
        headers: { 'user-key': '7f4fa469b70c80542b1210267c2e78aa' }
    }).then(function (cities) {

            var citiesID = cities.location_suggestions[0].id;
            console.log(citiesID);
        

        $.ajax({
            url: "https://developers.zomato.com/api/v2.1/search?entity_id=" + citiesID + "&entity_type=city",
            headers: { 'user-key': '59d32d7639d297f576ffc1c3d64a97f4' }
        }).then(function (search) {
            console.log(search);
            
        }) // Search Ajax Call

    }); // Cities Ajax Call

   

}); // Click Function