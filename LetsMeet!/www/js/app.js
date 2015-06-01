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

// ####################################################################
// Invite page
// ####################################################################
  module.controller('SearchContactController', function($scope, $compile) {
	  
	//Search phone contacts
	$scope.searchContact = function() {
		
		var myName = localStorage.getItem("name");
		var myPhone = localStorage.getItem("phone");
	
		var secName = $scope.name;

		var options = new ContactFindOptions();
		options.filter = secName;
		options.multiple = true;
		var fields = ["displayName", "name", "phoneNumbers"];
		navigator.contacts.find(fields, onSuccess, onError, options);

		function onSuccess(contacts) {
			$("#inviteForm").slideDown();
			document.getElementById("valueContact").innerHTML = "";
			for (var i = 0; i < contacts.length; i++) {
				
				var person = contacts[i].displayName + "," + contacts[i].phoneNumbers[0].value;
				
				var $newElement = $(
					"<label>" +
					"<input type='radio' ng-model='contact' name='contact' value='" + person + "'>" +
					contacts[i].displayName + "<br />" +
					"Mobiel: " + contacts[i].phoneNumbers[0].value +
					"</label><br /><br />").appendTo("#valueContact");
					$compile($newElement)($scope);
					
			}

		};
		function onError(contactError) {
			alert('onError!');
		}
		
		return false;
	}
	

	$scope.showPosition = function (position) {
		 var lat = position.coords.latitude;
		 var lon = position.coords.longitude;
		
		$scope.firstlat = lat;
		$scope.firstlon = lon;
		
	 }
	 
	 $scope.getLocation = function () {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.showError);
		}
		else {
			$scope.error = "Geolocation is not supported by this browser.";
		}
	}
	
	$scope.getLocation();
	 
	 $scope.showError = function (error) {
		switch (error.code) {
			case error.PERMISSION_DENIED:
				$scope.error = "User denied the request for Geolocation."
				break;
			case error.POSITION_UNAVAILABLE:
				$scope.error = "Location information is unavailable."
				break;
			case error.TIMEOUT:
				$scope.error = "The request to get user location timed out."
				break;
			case error.UNKNOWN_ERROR:
				$scope.error = "An unknown error occurred."
				break;
		}
		$scope.$apply();
	}
	
	//Invite selected phone contact
	$scope.invite = function() {
		
		
		
		var myName = localStorage.getItem("name");
		var myPhone = localStorage.getItem("phone");
		
		var contactArray = $scope.contact.split(',');
		
		var secName = $scope.contact;
		var secPhone = "test";
		
		var latitude = $scope.firstlat;
		var longitude = $scope.firstlon;
		var date = $scope.datum;
		var time = $scope.tijd;
		
		if (contactArray[0] == null || contactArray[1] == "") { 
			alert("Vul een naam en telefoon nummer in");
			return false;
		}
		
		$.ajax({
			type: "GET",
			url: "http://dannycoenen.nl/app/letsmeet/register.php?name=" + myName + "&phone=" + myPhone + "&secName=" + contactArray[0] + "&secPhone=" + contactArray[1] + "&firstLat=" + latitude + "&firstLon=" + longitude + "&date=" + date + "&time=" + time,
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
  


	// ####################################################################
	// Location page
	// ####################################################################
  
 	//Angular App Module and Controller
	angular.module('mapsApp', [])
	module.controller('MapCtrl', function ($scope) {
		
		
		 $scope.showPosition = function (position) {
			 
			var pyrmont = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			var mapOptions = {
				zoom: 16,
				center: pyrmont,
				mapTypeId: google.maps.MapTypeId.TERRAIN
			}

			$scope.map = new google.maps.Map(document.getElementById('maps'), mapOptions);
			
			 var request = {
				location: pyrmont,
				radius: 2000,
				types: ['restaurant']
			  };

			  $scope.placesList = document.getElementById('places');

			  $scope.service = new google.maps.places.PlacesService(map);
			  $scope.service.nearbySearch(request, $scope.callback);
		 }
		 
		 $scope.callback = function (results, status, pagination) {
		  if (status != google.maps.places.PlacesServiceStatus.OK) {
			return;
		  } else {
			$scope.createMarkers(results);

			/*if (pagination.hasNextPage) {
			  var moreButton = document.getElementById('more');

			  moreButton.disabled = false;

			  google.maps.event.addDomListenerOnce(moreButton, 'click',
				  function() {
				moreButton.disabled = true;
				pagination.nextPage();
			  });
			}*/
		  }
		}
		$scope.createMarkers = function (places) {
		  $scope.bounds = new google.maps.LatLngBounds();

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

			$scope.placesList.innerHTML += '<li>' + place.name + '</li>';

			$scope.bounds.extend(place.geometry.location);
		  }
		  $scope.map.fitBounds($scope.bounds);
		}
		 
		 $scope.showError = function (error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    $scope.error = "User denied the request for Geolocation."
                    break;
                case error.POSITION_UNAVAILABLE:
                    $scope.error = "Location information is unavailable."
                    break;
                case error.TIMEOUT:
                    $scope.error = "The request to get user location timed out."
                    break;
                case error.UNKNOWN_ERROR:
                    $scope.error = "An unknown error occurred."
                    break;
            }
            $scope.$apply();
        }
		
		
		$scope.getLocation = function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.showError);
            }
            else {
                $scope.error = "Geolocation is not supported by this browser.";
            }
        }

        $scope.getLocation();

	});
  
 
  
})();
