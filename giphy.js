
var favorites = ["Cat","Dog","Cow","Lion"];
$(document).ready(function(){

    getAnimalButtons(favorites);


    $("#animalButtons").on("click", ".animal",function(){

      getAnimalDetails($(this).text());
    });

    $("#animalGiphys").on("click", ".images",function(){
    	if($(this).attr("data-state") === "animate"){
    		$(this).attr("src", $(this).attr("data-still"));
    		$(this).attr("data-state","still");
    	} 
    	else{
    		$(this).attr("src", $(this).attr("data-animate"));
    		$(this).attr("data-state","animate");
    	}
    });

    $("input[type=submit]").on("click",function(event){
      event.preventDefault();
      var animal = $("input[type=text]").val();
      favorites.push(animal);
      getAnimalButtons(favorites);
    });
});

function getAnimalDetails(animalName){
		$("#animalGiphys").empty();
		        // Here we construct our URL
        var queryURL = "http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=10&q="
        +encodeURIComponent(animalName);
        $.ajax({
          url:queryURL,
          method:"GET"
        }).done(function(response){
        	var data = response.data;
            console.log(response);
            for(var i=0; i<data.length;i++){
            	var img = $("<img/>");
            	img.addClass("images");
            	img.attr("src",(data[i].images.downsized.url));
            	img.attr("data-animate",(data[i].images.downsized.url));
            	img.attr("data-still",data[i].images.downsized_still.url);
            	img.attr("data-state","animate");

              var div = $("<div/>");
              var ratingPara = $("<span>");
              ratingPara.text("Rating :").append(data[i].rating);

              div.append(img);
              div.append(ratingPara);
              div.addClass("col-md-3 divClass");

            	$("#animalGiphys").append(div);
            }
            
        });

    }

 function getAnimalButtons(favorites){
    $("#animalButtons").empty();
    
    if(!Array.isArray(favorites)){
      favorites = [];
    }

    for(var i=0; i< favorites.length; i++){

      var button = $("<button>");
      button.text(favorites[i]);
      button.addClass("btn btn-primary animal");
      button.attr("data-animal",favorites[i]);
      $("#animalButtons").append(button);
    }
 }
