(function(){
  'use strict';
  var module = angular.module('app', ['onsen']);  
  
// ####################################################################
// Registration page
// ####################################################################
  module.controller('LoginController', function($scope) {
	$scope.register = function() {
		var name = $scope.name;
		var phone = $scope.phone;
		if (name == null || phone == "") {
			alert("Vul een naam en telefoon nummer in");
			return false;
		}
		localStorage.setItem("name", name);
		localStorage.setItem("phone", phone);
		myNavigator.pushPage('dashboard.html', { animation : 'slide' } );
		return false;
	}
  });
  
// ####################################################################
// Dashboard page
// ####################################################################
  module.controller('NotificationController', function($scope) {
	$scope.check = function() {
		var myName = localStorage.getItem("name");
		var myPhone = localStorage.getItem("phone");
		
		$.ajax({
			type: "GET",
			url: "http://dannycoenen.nl/app/letsmeet/check.php?name=" + myName + "&phone=" + myPhone,
			dataType: "json",
			success: function(data) {
				for (var i = 0; i < data.length;) {
					alert('Je hebt een nieuwe uitnodiging van: ' + data[i].firstUser);
					i++;
				}
			},
			error: function(data) {
				alert("Geen nieuwe meldingen");
			}
		});
	}
  });
  
  module.controller('InviteController', function($scope) {
	$scope.invite = function() {
		
		var myName = localStorage.getItem("name");
		var myPhone = localStorage.getItem("phone");
	
		var secName = $scope.name;
		var secPhone = $scope.phone;
		
		if (secName == null || secPhone == "") {
			alert("Vul een naam en telefoon nummer in");
			return false;
		}
		
		$.ajax({
			type: "GET",
			url: "http://dannycoenen.nl/app/letsmeet/register.php?name=" + myName + "&phone=" + myPhone + "&secName=" + secName + "&secPhone=" + secPhone,
			dataType: "json",
			success: function(data) {
				alert(data);
			},
			error: function(data) {
				alert("ERROR");
			}
		});
		
		return false;
	}

  });
  
  module.controller('InviteContactController', function($scope) {
	$scope.inviteContact = function() {
		
		var myName = localStorage.getItem("name");
		var myPhone = localStorage.getItem("phone");
	
		var secName = $scope.name;



		var options = new ContactFindOptions();
		options.filter = secName;
		var fields = ["displayName", "name"];
		navigator.contacts.find(fields, onSuccess, onError, options);

		function onSuccess(contacts) {
			for (var i = 0; i < contacts.length; i++) {
				alert("Display Name = " + contacts[i].displayName);
			}
		}
		function onError(contactError) {
			alert('onError!');
		}
		
		return false;
	}
  });
  
  
  module.controller('MapController', function ($scope) {
		  
		var map, placesList;

		var placeSearch, autocomplete;

		$scope.initialize = function () {
			//alert(223456);
			
			
			$scope.getLocation = function () {
				navigator.geolocation.getCurrentPosition($scope.onSuccess);
			}
	 
			$scope.getLocation();
			
			//navigator.geolocation.getCurrentPosition($scope.onSuccess);
			
			$scope.onSuccess = function (position) {
				alert(456);
				var input = document.getElementById('searchTextField');
				var autocomplete = new google.maps.places.Autocomplete(input);
				google.maps.event.addListener(autocomplete, 'place_changed', function () {
					var place = autocomplete.getPlace();
					$scope.city2 = place.name;
					$scope.cityLat = place.geometry.location.lat();
					$scope.cityLng = place.geometry.location.lng();
					//alert("This function is working!");
					//alert(place.name);
				   // alert(place.address_components[0].long_name);
				   
					$scope.current_lat = position.coords.latitude;
					$scope.current_lng = position.coords.longitude;	

					var averageLat = (position.coords.latitude+place.geometry.location.lat())/2;
					var averageLng = (position.coords.longitude+place.geometry.location.lng())/2;  
					
					var pyrmont = new google.maps.LatLng(averageLat, averageLng);

					
					 $scope.map = new google.maps.Map(document.getElementById('map-canvas'), {
						center: pyrmont,
						zoom: 10 
					 });
					 
					 var request = {
						location: pyrmont,
						radius: 2000,
						types: ['restaurant']
					  };

					  placesList = document.getElementById('places');

					  var service = new google.maps.places.PlacesService(map);
					  service.nearbySearch(request, callback);
				   

				});


					
			} 

			  
		}
		$scope.callback = function (results, status, pagination) {
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
		$scope.createMarkers = function (places) {
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
			  map: $scope.map,
			  icon: image,
			  title: place.name,
			  position: place.geometry.location
			});

			placesList.innerHTML += '<li>' + place.name + '</li>';

			bounds.extend(place.geometry.location);
		  }
		  map.fitBounds(bounds);
		}

		//google.maps.event.addDomListener(window, 'load', initialize);
  
  });
 
  
})();

