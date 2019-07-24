var buttons = ["persian cat", "siamese cat", "himalayan cat", "burmese cat", "bengal cat"]


function makeButtons(){
$("#tags").empty();
for (var i = 0; i < buttons.length; i++) {
    var catB = $("<button class='btn btn-primary m-2'>");
    catB.text(buttons[i]);
    catB.addClass("tagButton");
    catB.attr("data-name", buttons[i]);
    $("#tags").append(catB);
}
}

makeButtons();


$(document).on("click", ".tagButton", function (event){  
    $("#gifs").empty();
    $("#gif-name").empty();
    var button = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        button + "&api_key=S0s43WOAT4jzNdL4GICYdNrVfDl0MWMH&limit=10";
        
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data;
        console.log(button);
       
        $("#gif-name").append("Showing Results for " + button);
        

        for (var i = 0; i <results.length; i++){

        var resultsB = $("<div class='card mb-2 float-left' style='width: 18rem;'>");
       var ratingsValue = results[i].rating;

        var imageURL = results[i].images.fixed_height_still.url;

        var images = $("<img>");
        images.attr("src", imageURL);
        images.attr("alt", "cat image");
        images.attr("data-state", "still");
        images.attr("data-still", results[i].images.fixed_height_still.url);
        images.attr("data-animate", results[i].images.fixed_height.url);
        images.attr("class", "pause-state");
        

        var p = $("<div class='card-header pb-2 bg-secondary'><h5>").text("Rating: " + ratingsValue);

        (resultsB).append(images);
        (resultsB).prepend(p);
        
        $("#gifs").prepend(resultsB);
        }
    });
});

$("#submit-item").on("click", function(event){

    event.preventDefault();

    var input = $("#add-item").val().trim();
    
    console.log(input);
    buttons.push(input);
    makeButtons();
});



$(document).on("click", ".pause-state", function(){
    var state = $(this).attr("data-state");

    if(state === "still"){
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    else{
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
})





