var arrSports = ["NBA","Word Cup","Baseball","UFC"];
//var apiKey    = "YnhlYwxxNFYGZ57wVPP3cfFpv672Ts1g";
var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=YnhlYwxxNFYGZ57wVPP3cfFpv672Ts1g&limit=";
var limit = 10;

$("#maxLimit").val(limit);
for (i=0; i < arrSports.length;i++){

 var newBtn = $("<button>"+  arrSports[i] +"</button>");
 $(newBtn).addClass("sportsBtn");
 $(newBtn).attr("data-sports",arrSports[i]);
 $("#buttons").append(newBtn);

}


$("#submitBtn").on("click",function(e){

e.preventDefault();
if ( !(document.getElementById("sportsName").value === "")) {
	var newBtn = $("<button>"+  $("#sportsName").val() +"</button>");
	$(newBtn).addClass("sportsBtn");
	$(newBtn).attr("data-sports",$("#sportsName").val());
	$("#buttons").append(newBtn);
	$("#sportsName").val("");
}

});

$(document).on("click", ".sportsBtn", function(e){

e.preventDefault();
$("#images").empty();

limit = $("#maxLimit").val();
var theme    = "&q=" + $(this).attr("data-sports");
queryURL     = queryURL+ limit + theme;


      // Making an http request using ajax
      $.ajax({
        url: queryURL,
        method: "GET"
      })
      // after the https is done do something
      .done(function(response) {

       for (var i = 0; (i < response.data.length); i++) {
	       var imageUrl = response.data[i].images.downsized_still.url;
	       var imageUrlAnimate = response.data[i].images.fixed_height.url;

	       var newDiv = $("<div>");
	       $(newDiv).attr("id","div"+i);
	       $(newDiv).addClass("divClass");
	        var sportsRating = $("<h4>" + "Rating : " + response.data[i].rating +"</h4>");
	        $(sportsRating).addClass("rating");
	        var sportsImage = $("<img>");
	        $(sportsImage).attr("src", imageUrl);
	        $(sportsImage).attr("title", "test");
	        $(sportsImage).attr("data-animate", imageUrlAnimate);
	        $(sportsImage).attr("data-still", imageUrl);
	        $(sportsImage).attr("data-state","still");
	        $(sportsImage).addClass("gif");
	       // $("#images").append(sportsRating);
	        //$("#images").append(sportsImage);	 
	        $(newDiv).append(sportsRating);
	        $(newDiv).append(sportsImage);	
	        $("#images").append(newDiv);             
	    }
    });

});

$(document).on("click", ".gif", function(e){

         e.preventDefault();
         var state = $(this).attr("data-state");

         if (state === "still"){
           var dataAnimate = $(this).attr("data-animate");
           $(this).attr("src",dataAnimate);
            $(this).attr("data-state", "animate");
         }
         else if (state === "animate"){
            var dataStill = $(this).attr("data-still");
            $(this).attr("src",dataStill);
            $(this).attr("data-state", "still");
         }

});
