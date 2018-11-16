//Global Variables
var map;

// Create a new blank array for all the listing markers.
var markers = [];

var viewModel;

// These are the favorite places I'll display on my homewtown map
var myPlaces = ['Universidad Industrial de Santander',
				'Juan Valdez', 'Chicamocha National Park',
				'Estadio Alfonso Lopez','Palonegro International Airport',
				'Floridablanca, Santander', 'Piedecuesta']

function initMap() {

// Style from https://snazzymaps.com/style/236895/lassishop1 by sadaf
var styles = [
    {
        'featureType': 'all',
        'elementType': 'labels.text.fill',
        'stylers': [
            {
                'color': '#626262'
            }
        ]
    },
    {
        'featureType': 'all',
        'elementType': 'labels.text.stroke',
        'stylers': [
            {
                'color': '#ffffff'
            }
        ]
    },
    {
        'featureType': 'administrative.land_parcel',
        'elementType': 'geometry.fill',
        'stylers': [
            {
                'color': '#f90808'
            }
        ]
    },
    {
        'featureType': 'landscape',
        'elementType': 'geometry.fill',
        'stylers': [
            {
                'color': '#05567a'
            }
        ]
    },
    {
        'featureType': 'landscape.man_made',
        'elementType': 'geometry.fill',
        'stylers': [
            {
                'color': '#cbdede'
            }
        ]
    },
    {
        'featureType': 'landscape.man_made',
        'elementType': 'geometry.stroke',
        'stylers': [
            {
                'color': '#06016c'
            }
        ]
    },
    {
        'featureType': 'landscape.man_made',
        'elementType': 'labels.icon',
        'stylers': [
            {
                'color': '#ec4545'
            }
        ]
    },
    {
        'featureType': 'landscape.natural',
        'elementType': 'geometry.fill',
        'stylers': [
            {
                'color': '#ffffff'
            }
        ]
    },
    {
        'featureType': 'landscape.natural.landcover',
        'elementType': 'geometry.fill',
        'stylers': [
            {
                'color': '#db890e'
            }
        ]
    },
    {
        'featureType': 'poi.place_of_worship',
        'elementType': 'geometry.fill',
        'stylers': [
            {
                'color': '#036f05'
            }
        ]
    },
    {
        'featureType': 'road',
        'elementType': 'geometry.fill',
        'stylers': [
            {
                'color': '#665c52'
            }
        ]
    },
    {
        'featureType': 'road',
        'elementType': 'geometry.stroke',
        'stylers': [
            {
                'color': '#d32828'
            }
        ]
    },
    {
        'featureType': 'road.highway',
        'elementType': 'geometry.fill',
        'stylers': [
            {
                'color': '#ec8d00'
            }
        ]
    },
    {
        'featureType': 'road.local',
        'elementType': 'geometry.fill',
        'stylers': [
            {
                'color': '#cf9864'
            }
        ]
    },
    {
        'featureType': 'transit.line',
        'elementType': 'geometry.fill',
        'stylers': [
            {
                'color': '#e06262'
            }
        ]
    },
    {
        'featureType': 'water',
        'elementType': 'geometry.fill',
        'stylers': [
            {
                'color': '#19b6cc'
            }
        ]
    },
    {
        'featureType': 'water',
        'elementType': 'geometry.stroke',
        'stylers': [
            {
                'color': '#021731'
            }
        ]
    },
    {
        'featureType': 'water',
        'elementType': 'labels.text.stroke',
        'stylers': [
            {
                'color': '#03365a'
            },
            {
                'visibility': 'on'
            }
        ]
    }
]
  // Constructor creates a new map - only center and zoom are required.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 7.119349, lng: -73.122742},
    zoom: 13,
	styles: styles,
    mapTypeControl: false
  });
  
  // These are the locations of my favorite places
  var locations = [
	{title: myPlaces[0], location: {lat: 7.140089, lng: -73.120552}},
	{title: myPlaces[1], location: {lat: 7.099242, lng: -73.107306}},
	{title: myPlaces[2], location: {lat: 6.791288, lng: -73.00339}},
	{title: myPlaces[3], location: {lat: 7.136748, lng: -73.116497}},
	{title: myPlaces[4], location: {lat: 7.12809, lng: -73.181271}},
	{title: myPlaces[5], location: {lat: 7.070517, lng: -73.093750}},
	{title: myPlaces[6], location: {lat: 6.997249, lng: -73.053140}}  
  ];
  
  var largeInfowindow = new google.maps.InfoWindow();

  //all lists to adjust the boundaries of the map

  var defaultIcon = makeMarkerIcon('0091ff');
  // Create a "highlighted location" marker color for when the user
  // mouses over the marker.
  var highlightedIcon = makeMarkerIcon('FFFF24');

  var bounds = new google.maps.LatLngBounds();
  // Style the markers a bit. This will be my place marker icon.
  // The following group uses the location array to create an array of markers on initialize.
  for (var i = 0; i < locations.length; i++) {
    // Get the position from the location array.
    var position = locations[i].location;
    var title = locations[i].title;
    // Create a marker per location, and put into markers array.
    var marker = new google.maps.Marker({
      position: position,
      map: map,
	  title:title,
      name: title,
      animation: google.maps.Animation.DROP,
	  icon: defaultIcon,
	  infowindow: largeInfowindow,
      id: i
    });
    // Push the marker to our array of markers.
    markers.push(marker);
	  
    // Create an onclick event to open the large infowindow at each marker and make Wikipedia place call
    marker.addListener('click', function() {
      populateInfoWindow(this, largeInfowindow);
	  var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + this.name + '&format=json&callback=wikiCallback';
	  viewModel.WikiCall(wikiUrl);
    });
	// Two event listeners - one for mouseover, one for mouseout,
          // to change the colors back and forth.
    marker.addListener('mouseover', function() {
      this.setIcon(highlightedIcon);
    });
    marker.addListener('mouseout', function() {
      this.setIcon(defaultIcon);
    });
    // Extend boundaries for every marker that we make
    bounds.extend(markers[i].position);
  }
  
  function populateInfoWindow(marker, infowindow) {
	// Check to make sure the infowindow is not already opened on this marker.
	if (infowindow.marker != marker) {
	// Clear the infowindow content to give the streetview time to load.
	  infowindow.setContent('');
	  infowindow.marker = marker;
	  // Make sure the marker property is cleared if the infowindow is closed.
	  infowindow.addListener('closeclick', function() {
	  infowindow.marker = null;
	  });
	  // sets animation to bounce 2 times when marker is clicked
	  marker.setAnimation(google.maps.Animation.BOUNCE);
	  setTimeout(function() {
	  	marker.setAnimation(null);
	  }, 1130);
	  var streetViewService = new google.maps.StreetViewService();
	  var radius = 50;
	  // In case the status is OK, which means the pano was found, compute the
	  // position of the streetview image, then calculate the heading, then get a
	  // panorama from that and set the options
	  function getStreetView(data, status) {
	  	if (status == google.maps.StreetViewStatus.OK) {
	  	  var nearStreetViewLocation = data.location.latLng;
	  	  var heading = google.maps.geometry.spherical.computeHeading(
	  		nearStreetViewLocation, marker.position);
		  infowindow.setContent('<div>' + marker.title + '</div><div id="pano"></div>');
          var panoramaOptions = {
			position: nearStreetViewLocation,
			pov: {
                  heading: heading,
                  pitch: 30
				}
				};
		  var panorama = new google.maps.StreetViewPanorama(
			document.getElementById('pano'), panoramaOptions);
		} else {
			infowindow.setContent('<div>' + marker.title + '</div>' +
				'<div>No Street View Found</div>');
        }
	  }
          // Use streetview service to get the closest streetview image within
          // 50 meters of the markers position
          streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
          // Open the infowindow on the correct marker.
          infowindow.open(map, marker);
	}
  }
	  
  // This function takes in a COLOR, and then creates a new marker
  // icon of that color. The icon will be 21 px wide by 34 high, have an origin
  // of 0, 0 and be anchored at 10, 34).
  function makeMarkerIcon(markerColor) {
	var markerImage = new google.maps.MarkerImage(
	  'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
	  '|40|_|%E2%80%A2',
	  new google.maps.Size(21, 34),
	  new google.maps.Point(0, 0),
	  new google.maps.Point(10, 34),
	  new google.maps.Size(21,34));
	  return markerImage;
  }
	  
  //  tell the map to fit itself to those bounds
  map.fitBounds(bounds);
  
  // Activates knockout.js
  // instantiate the ViewModel using the new operator and apply the bindings (aka activate KO)
  viewModel = new ViewModel();

  // activate knockout apply binding
  ko.applyBindings(viewModel);
  
}


//Google maps error handling
function errorHandling() {
  alert("It seems you can't see my hometown. Please try again.");
}

// Place constructor, used in wikipedia handling
var Place = function(data) {
  this.name = ko.observable(data);
}

// Function to hide any open InfoWindow when filtering down the places
function hideAllInfoWindows(map) {
   markers.forEach(function(marker) {
     marker.infowindow.close(map, marker);
  }); 
}

// ViewModel - JavaScript that defines the data and behavior of your UI
var ViewModel = function() {
	
  var self = this;
  // Stores and updates userInput from index.html 
  this.userInput = ko.observable("");
  // Stores and upates markers in knockout.js observable array
  this.myLocations = ko.observableArray();
  //Iterates over markers array and creates copies in the locations observable array
  for ( var i = 0; i < markers.length; i++) {
    self.myLocations.push(markers[i])
	//console.log(self.myLocations());
  }
  
  // Filter Marker
  this.filteredLocations = ko.computed(function() {
    var filter = self.userInput().toLowerCase();
    // If nothing in the search window, then show all the places list
	if (!filter) {
	  self.myLocations().forEach(function(item){
          item.setVisible(true);
      });
      return self.myLocations();
	// If there's an input find the match and display it only
	// Also delete the list of wikipedia founds if displayed
    } else {
	  // Close any open infowindow and removes lingering wikipedia links
      	  hideAllInfoWindows(map);
	  self.LastPlace.removeAll();
	  return ko.utils.arrayFilter(self.myLocations(), function(item) {
        var match = item.name.toLowerCase().indexOf(filter) >= 0
          item.setVisible(match);
          return match;
      })
    }}, self);
	
	// Wikipedia Handling
	self.placeList = ko.observableArray([]);
	self.LastPlace = ko.observableArray([]);
	
	myPlaces.forEach(function(placeItem){
	  self.placeList.push(new Place(placeItem) );
	});
		
	self.currentPlace = ko.observable(this.placeList());
	
	// This function triggers marker selection based on clicked place on the list. 
	self.setPlace = function(clickedPlace){

	  self.currentPlace(clickedPlace);
	  // Activate marker for selected place in the list
	  google.maps.event.trigger(self.currentPlace(), 'click');

	}
	
	// Separate Wikipedia AJAX call to use it when the marker is clicked
	self.WikiCall = function(wikiUrl) {
	  self.LastPlace.removeAll();
	  $.ajax({
		url: wikiUrl,
		dataType: "jsonp",
		jsonp: "callback",
		timeout: 1000, // Timeout for error handling
		success: function( response ) {
		  var articleList = response[1];
		  for (var i = 0; i < articleList.length; i++) {
	        var articleStr = articleList[i];
		    var url = 'http://en.wikipedia.org/wiki/' + articleStr;
		    // I want to display only first three articles found (if more than 3 are retrieved from Wikipedia API)
		    if ( i < 3) {
		      self.placeList.push(url);
			  self.LastPlace.push(self.placeList.pop());
			};
		  };    
	    }, // #Error handling. I'm using a direct timeout function that will display an error message if there's a problem with the request
		error: function(jqXHR, status, error){
		  if (status==="timeout") {
		    self.LastPlace.push('Something went wrong with Wikipedia');
		  }
		}
		});
	
	}
	
}

// Mouseover highlighted for sidebar
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle('active');
}
