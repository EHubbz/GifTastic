var bands = [];

function showBandInfo() {

	var band = $(this).attr("data-band");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        band + "&api_key=0AWwsjZTvljUMm0gm136sPAkF3uy9pss&limit=10";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		console.log(response);

		
		var results = response.data;
		var rating = response.rating;
	  //var rating = response[i].rating; does not work?
		
		for (var i = 0; i < results.length; i++) {
			var bandDiv = $("<div class=gifs>");
			var p1 = $("<p>");
			p1.text("Rating: " + results[i], rating);
			

			var bandImg = $("<img>");
			bandImg.attr("src", results[i].images.fixed_height_small_still.url);
			bandImg.attr("data-still", results[i].images.fixed_height_small_still.url);
			bandImg.attr("data-animate",results[i].images.fixed_height_small.url);
			bandImg.addClass("gif");
			bandDiv.append(bandImg);
			bandDiv.append(p1);
			$("#gifBox").prepend(bandDiv)
	};
  });
}
function renderButtons() {
	$("#btnHolder").empty();

	for (var i = 0; i < bands.length; i++) {
		var button = $("<button>");
		button.addClass("bands");
		button.attr("data-band", bands[i]);
		button.text(bands[i]);
		$("#btnHolder").append(button);
        }
      }

     $("#submitBtn").on("click", function(event) {
     	event.preventDefault();
     	var band = $("#textBox").val().trim();

     	bands.push(band);

     	renderButtons();
     });

	$(document).on("click",".gif", function() {
		var state = $(this).attr("data-state");
			if (state === "still") {
				$(this).attr("src", $(this).data("animate"));
				$(this).attr("data-state", "animate");

			}else {
				$(this).attr("src", $(this).data("still"));
				$(this).attr("data-state", "still");
			};
	});   

    $(document).on("click", ".bands", showBandInfo);

     renderButtons();
