$(document).ready(function() {
	// Initial array of topics
	var topics = [
    "dog", "cat", "rabbit", "hamster", "skunk", "goldfish",
    "bird", "ferret", "turtle", "sugar glider", "chinchilla",
    "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken",
    "capybara", "teacup pig", "serval", "salamander", "frog"
  ];

  
  // Function for displaying topic buttons
  function renderButtons() {
  	// Deleting the topic buttons prior to adding new topic buttons
		// (necessary otherwise will have repeat buttons)
  	$("#buttons-view").empty();

  	// Looping through the array of topics
  	for (var i = 0; i < topics.length; i++) {
  		// Dynamicaly generating buttons for each topic in the array.
  		var button = $("<button>");
  		// Adding a class
  		button.addClass("topic");
  		// Adding a data-attribute with a value of the topic at index i
  		button.attr("data-name", topics[i]);
  		// Providing the button's text with a value of the topic at index i
  		button.text(topics[i]);
  		// Adding the button to the page
  		$("#buttons-view").append(button);

  	}
  }

  // Function that creates a new button when "Submit" button is clicked
  $("#add-topic").on("click", function(event) {
  	// Prevents the form from trying to submit itself
  	event.preventDefault();

  	// Grab the text from the input box
  	var topic = $("#topic-input").val().trim();
  	// The topic from the textbox is then added to the array
    topics.push(topic);
    // Calling renderButtons which handles the processing of the topics array
    renderButtons();
    // Clearing input box
    $('#topic-input').val('');
  })


  // Function for display gifs
  function displayTopicGifs() {
  	$("#gifs-view").empty();

  	console.log(this);
  	var topic = $(this).attr("data-name");
    // console.log(topic);
  	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=9591cd9481214c8aae69b8076962931e&limit=10";

  	// Creating an AJAX call for the specific topic button being clicked
  	$.ajax({
  		url: queryURL,
  		method: "GET"
  	}).done(function(response) {
  		console.log(response);

    // When the user clicks on a topic button, 
    // the page should grab 10 static, non-animated gif images from the GIPHY API 
    // and place them on the page.

      for (var i = 0; i < response.data.length; i++) {
        var imgData = response.data[i]; 
        // console.log(imgData);
        var imgURL = imgData.images.fixed_width_still.url;
        var movingURL = imgData.images.fixed_width.url;
        var image = $("<img>");
        image.addClass("gif col-md-3");
        image.attr("src", imgURL);
        image.attr("dataStill", imgURL);
        image.attr("dataMoving", movingURL);
        image.attr("dataState", "still");
        var rating = imgData.rating;
        var p = $("<p>").text("Rating: " + rating);
        // console.log(image);
        // console.log(imgURL);
        // console.log(movingURL);
        // console.log(rating);

        $("#gifs-view").append(p);
        $("#gifs-view").append(image);
      };

      // When the user clicks one of the still GIPHY images, 
      // the gif should animate. 
      // If the user clicks the gif again, it should stop playing.

      $(".gif").click(function() {
        var state = $(this).attr("dataState");
        var still = $(this)[0].attributes.dataStill.value;
        var moving = $(this)[0].attributes.dataMoving.value;

        console.log(state);
        console.log(still);
        console.log(moving);

        // If the clicked image's state is still,
        // update its src attribute to its dataMoving value is
        // Then, set the image's dataState to moving
        // Else set src to the dataStill value

        if (state === "still") {
          $(this).attr('src',moving);
          $(this).attr("dataState", "moving");
        } else {
          $(this).attr('src',still);
          $(this).attr("dataState", "still");
        }

      });

  	});

  }

	// Calling the renderButtons function at least once to display the initial list of topics
	renderButtons();


	// Adding a click event listener to all elements with a class of "topic"
	$(document).on("click", ".topic", displayTopicGifs);

})