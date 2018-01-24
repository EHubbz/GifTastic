var bands = ["Cher", "Steely Dan", "The Doobie Brothers"];

function showBandInfo() {
	var band = $(this).attr("data-band");
	var queryURL = "" + band + "";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		console.log(response);

		var bandDiv = $("#gifBox");

		var rating = response.Rating;

		var p1 = $("<p>").text("Rating: " + response.Rating);

		bandDiv.append(p1)
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
      };

     $("#submitBtn").on("click", function(event) {
     	event.preventDefault();
     	var band = $("#band-search").val().trim();

     	bands.push(band);

     	renderButtons();
     });

     $(document).on("click", ".band", showBandInfo);

     renderButtons();