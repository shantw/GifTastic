var arrSports = ["NBA","Word Cup","Baseball","UFC"];
//var url       ="https://api.giphy.com/v1/gifs/search?api_key=YnhlYwxxNFYGZ57wVPP3cfFpv672Ts1g&q=NBA&limit=25&offset=0&rating=G&lang=en"
var apiKey    = "YnhlYwxxNFYGZ57wVPP3cfFpv672Ts1g";
var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=YnhlYwxxNFYGZ57wVPP3cfFpv672Ts1g&limit=16";

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

var theme    = "&q=" + $(this).attr("data-sports");
queryURL     = queryURL + theme;
      // Making an http request using ajax
      $.ajax({
        url: queryURL,
        method: "GET"
      })
      // after the https is done do something
      .done(function(response) {
    var x =1;
    for (j=1; (j < 5 && x < response.data.length) ; j++){
       var row = $("<div>");
	   $(row).addClass("row");
	   $(row).attr("id","row"+"j");

       for (var i = 1; (x < response.data.length && i < 5); i++) {
	       var imageUrl = response.data[x].images.downsized_still.url;
	       var imageUrlAnimate = response.data[x].images.fixed_height.url;
	      // console.log(response);
	        var col= $("<div>");
	        //	col.style.whiteSpace="nowrap";
	        $(col).addClass("col-xs-3 col-md-3");
	        $(col).attr("id","col"+i);
	         //console.log($(col).attr("id"));
	        var sportsRating = $("<h4>" + "Rating : " + response.data[x].rating +"</h4>");
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
	        //console.log($(col));
	        $(col).append(sportsRating);
	        $(col).append(sportsImage);
	        $(row).append(col);
	        x++;
	       
	    }
	    
	     $("#images").append(row);
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
