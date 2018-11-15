# It really is my Hometown Map

This project from Udacity focuses in Front End development by using frameworks as Knockout and JQuery and data from API's.
For this work, I've used Google Maps API for places visualization and Wikipedia for information about those places.

## Getting Started

Clone or download this project (folder: myHometown) in your local machine to be able to run the website.
You will have a folder structure like this:

css/styles.css
js/app.js
  /lib/knockout-3.4.2.js
	  /jquery.min.js
index.html

### Need to have/install Knockout 3.4.2:

If you do not have it you can download it [here](https://knockoutjs.com/downloads/)
However, the KO script required for this application is included in the repository.


## Running my Hometown App (Bucaramanga Map)

1. Open index.html in your favorite browser.

2. Initially, you'll see Bucaramanga (Colombia) region map with my favorite seven places shown with markers. A 4-bar span icon is also located in the upper left.
If clicked will display the list of my favorite places (Not organized in order of favoritism, except for the first one that indicates the university where I studied :) ).
	
3. There's a search window that serves as filter window within the list of places. If you type any of the seven places, the app will filter down the markers to find the one that corresponds to the place searched.

4. In they side bar, there's also a section that will display relevant Wikipedia articles of the place searched. The request is limited up to 3 articles per place if Wikipedia offers more articles.

Just give it a try!

NOTE: Please feel free to suggest modifications/improvements or to make a pull request to contribute.

## Authors

* **Jhon Diaz** - [jfbeyond](https://github.com/jfbeyond)

## Acknowledgments

* Udacity (Google Maps API lessons and methods). I heavily relied on class material to load map and find places.
* snazzymaps [style](https://snazzymaps.com/style/236895/lassishop1)
* Other maps apps found in the web. [Here](https://code.sololearn.com/WQAIc8Q1YhPy/#html) and [here](https://codepen.io/rchrdchn/pen/EoNBQJ). These apps are more sophisticated and elaborated than mine, but I used them as reference for key parts of my work.
For instance, I think it was very useful to hide the sidebar to give more map visibility if open in a handheld device.
* Inspiration
