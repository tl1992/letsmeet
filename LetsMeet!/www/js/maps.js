var map, placesList;

function initialize() {

	navigator.geolocation.getCurrentPosition(onSuccess);
	
	
	function onSuccess(position) {
		var current_lat = position.coords.latitude;
		var current_lng = position.coords.longitude;
		var pyrmont = new google.maps.LatLng(current_lat, current_lng);
		
		 map = new google.maps.Map(document.getElementById('map-canvas'), {
			center: pyrmont,
			zoom: 17
		 });
		 
		 var request = {
			location: pyrmont,
			radius: 500,
			types: ['restaurant']
		  };

		  placesList = document.getElementById('places');

		  var service = new google.maps.places.PlacesService(map);
		  service.nearbySearch(request, callback);
			
	}

	  
}

function callback(results, status, pagination) {
  if (status != google.maps.places.PlacesServiceStatus.OK) {
    return;
  } else {
    createMarkers(results);

    if (pagination.hasNextPage) {
      var moreButton = document.getElementById('more');

      moreButton.disabled = false;

      google.maps.event.addDomListenerOnce(moreButton, 'click',
          function() {
        moreButton.disabled = true;
        pagination.nextPage();
      });
    }
  }
}

function createMarkers(places) {
  var bounds = new google.maps.LatLngBounds();

  for (var i = 0, place; place = places[i]; i++) {
    var image = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

    var marker = new google.maps.Marker({
      map: map,
      icon: image,
      title: place.name,
      position: place.geometry.location
    });

    placesList.innerHTML += '<li>' + place.name + '</li>';

    bounds.extend(place.geometry.location);
  }
  map.fitBounds(bounds);
}

google.maps.event.addDomListener(window, 'load', initialize);
