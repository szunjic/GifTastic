# GifTastic

#### HW #6 for The Coding Bootcamp at UT Austin

For this assignment, I used the GIPHY API to make a dynamic web page that populates with gifs of a specified topic. 

To finish this task I called the GIPHY API and used JavaScript and jQuery to change the HTML of my site.

To begin, I created an array of strings, each one related to a topic that interests me. I saved it to a variable called “topics”.

My app takes the topics in this array and creates buttons in my HTML. For this I created a loop that appends a button for each string in the array. 

When the user clicks on a button, the page grabs 10 static, non-animated gif images from the GIPHY API and places them on the page. 

When the user clicks one of the still GIPHY images, the gif animates. If the user clicks the gif again, it stops playing. 

With the data provided by the GIPHY API, I was able to display a rating underneath every gif. 

I also added a form to my page that takes a value from a user input box and adds it into my “topics” array. I then call a function that takes each topic in the array and remakes the buttons on the page. 
