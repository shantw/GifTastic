var arrSports = ["NBA","Word Cup","Baseball","UFC"];
//var url       ="https://api.giphy.com/v1/gifs/search?api_key=YnhlYwxxNFYGZ57wVPP3cfFpv672Ts1g&q=NBA&limit=25&offset=0&rating=G&lang=en"
var apiKey    = "YnhlYwxxNFYGZ57wVPP3cfFpv672Ts1g";
var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=YnhlYwxxNFYGZ57wVPP3cfFpv672Ts1g&limit=12";

for (i=0; i < arrSports.length;i++){

 var newBtn = $("<button>"+  arrSports[i] +"</button>");
 $(newBtn).addClass("sportsBtn");
 $(newBtn).attr("data-sports",arrSports[i]);
 $("#buttons").append(newBtn);

}


$("#submitBtn").on("click",function(e){

e.preventDefault();

var newBtn = $("<button>"+  $("#sportsName").val() +"</button>");
$(newBtn).addClass("sportsBtn");
$(newBtn).attr("data-sports",$("#sportsName").val());
$("#buttons").append(newBtn);


});

$(document).on("click", ".sportsBtn", function(e){

e.preventDefault();
$("#images").empty();
console.log($(this).attr("class")); 

var theme    = "&q=" + $(this).attr("data-sports");
queryURL     = queryURL + theme;
      // Making an http request using ajax
      $.ajax({
        url: queryURL,
        method: "GET"
      })
      // after the https is done do something
      .done(function(response) {

       for (var i = 1; i < response.data.length; i++) {
	       var imageUrl = response.data[i].images.downsized_still.url;
	       var imageUrlAnimate = response.data[i].images.fixed_height.url;
	       console.log(response);
	        var sportsRating = $("<p>" + "Rating : " + response.data[i].rating +"</p>"); 
	        //sportsRating.text(response.data[i].images.rating) ;
	        var sportsImage = $("<img>");
	        sportsImage.attr("src", imageUrl);
	        sportsImage.attr("data-animate", imageUrlAnimate);
	        sportsImage.attr("data-still", imageUrl);
	        sportsImage.attr("data-state","still");
	        sportsImage.addClass("gif");
	        $("#images").append(sportsRating);
	        $("#images").append(sportsImage);
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
