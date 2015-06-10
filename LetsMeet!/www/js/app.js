(function(){
  'use strict';
  var module = angular.module('app', ['onsen']);  
  
// ####################################################################
// Registration page (index.html)
// ####################################################################
  module.controller('LoginController', function($scope) {
	$scope.register = function() {
		var name = $scope.name;
		var phoneValue = $scope.phone;		
		
		if (name == null || phoneValue == "") {
			alert("Vul een naam en telefoon nummer in");
			return false;
		}
		
		var trimPhone = phoneValue.replace(/\s+/g, '');
		var phone = trimPhone.replace('+316', '06');
	
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
	
	$scope.checkFunction = function() {
		
	}
	
  });
  
  module.controller('dasboardController', function($scope, $compile, $interval) {
	
	$scope.removeResult = function(meetingId){
		$.ajax({
			type: "GET",
			url: "http://dannycoenen.nl/app/letsmeet/update.php?id=" + meetingId + "&mode=remove",
			dataType: "json",
			success: function(data) {
				alert('Afspraak verwijdert');
				var articleId = "#id" + meetingId;
				$(articleId).remove();
			},
			error: function(data) {
				alert("ERROR");
			}
		});
	}
	
	intervalFunction();
	$interval(intervalFunction, 5000);
	
	function intervalFunction(){
		var myName = localStorage.getItem("name");
		var myPhone = localStorage.getItem("phone");
		
		$.ajax({
		type: "GET",
		url: "http://dannycoenen.nl/app/letsmeet/check.php?name=" + myName + "&phone=" + myPhone,
		dataType: "json",
		success: function(data) {
			
			$('#count').remove();
			var notifications = 0;
			//var $appointment = "";
			document.getElementById("meetings").innerHTML = "";
			
			for (var i = 0; i < data.length;) {
				
				if(data[i].secondPhone == myPhone){
					if(data[i].status == "pending"){
						notifications++;
					}
				}
				 
				if(data[i].status == "accepted"){
					
					var locatieString = data[i].loclatlng;
					locatieString = locatieString.replace('(','');
					locatieString = locatieString.replace(')','');
					
					var location = 'onclick="window.open(\'geo:\'+\'' +locatieString+'\', \'_system\')"';
					var url = 'onclick="window.open(\'\'+\'' +data[i].locUrl+'\', \'_system\')"';
					var phone = 'onclick="window.open(\'tel:\'+\'' +data[i].locTel+'\', \'_system\')"';
					var remove = 'ng-click="removeResult(' + data[i].id + ')"';
					//alert(location);
					
					var myDate= data[i].date;
					myDate= myDate.split(" "); 		
					var newDate= myDate[2]+" - "+myDate[1]+" - "+myDate[3];
					
					var myTime= data[i].time;
					myTime= myTime.split(" "); 		
					var newTime= myTime[4];
					newTime= newTime.split(":"); 
					var finalTime = newTime[0]+":"+newTime[1];
					
					var $appointment = $(
							"<article id='id" + data[i].id + "' class='block info'>" +
								"<div class='left'>" +
									"<img width='40' src='"+ data[i].locIcon +"'/>" +
								"</div>" +
								"<div class='right'>" +
									"<h1>" + data[i].firstUser + "</h1>" +
									"<div class='meta' style='display: block;'>" +
										data[i].locName +
									"</div>" +
									"<div class='meta'>" +
										"<span class='icon'>&#xf041;</span>" +
										 data[i].locAdres +
									"</div>" +
									"<div class='meta'>" +
										"<span class='icon'>&#xf073;</span> " +
										  newDate +
									"</div>" +
									"<div class='meta'>" +
										"<span class='icon'>&#xf017;</span>" +
										finalTime +
									"</div>" +
									"<div class='clear'></div>" +
									"<ons-button class='btn' " + location + ">" +
										"Navigeer" +
									"</ons-button>" +
									"<ons-button class='btn' " + phone + ">" +
										"<span class='icon'>&#xf095;</span>" +
									"</ons-button>" +
									"<ons-button class='btn' " + url + ">" +
										"<span class='icon'>&#xf0ac;</span>" +
									"</ons-button>" +
									"<ons-button class='btn removeBtn' " + remove + ">" +
										"<span class='icon'>&#xf00d;</span>" +
									"</ons-button>" +
								"</div>" +
								"<div class='clear'></div>" +
							"</article>").appendTo("#meetings");
							$compile($appointment)($scope);
					;
						
				}
				i++;
			}
			
			if(notifications > 0){
				$('<div id="count"></div>').insertAfter('#notification');
				document.getElementById("count").innerHTML = notifications;
			}
			
		},
		error: function(data) {
			//alert("ERROR");
			$('#count').remove();
		}
		});
		
	}
	
  });
  
// ####################################################################
// Notification page
// ####################################################################
  module.controller('NotificationPageController', function($scope, $compile) {
	
	var myName = localStorage.getItem("name");
	var myPhone = localStorage.getItem("phone");
	
	// Controleer 1x op meldingen
	$.ajax({
	type: "GET",
	url: "http://dannycoenen.nl/app/letsmeet/check.php?name=" + myName + "&phone=" + myPhone,
	dataType: "json",
	success: function(data) {
	
		document.getElementById("notifications").innerHTML = "";
		
		for (var i = 0; i < data.length;) {
			
			if(data[i].secondPhone == myPhone){ 
				if(data[i].status == "pending"){
					
					var myDate= data[i].date;
					myDate= myDate.split(" "); 		
					var newDate= myDate[2]+" - "+myDate[1]+" - "+myDate[3];
					
					var myTime= data[i].time;
					myTime= myTime.split(" "); 		
					var newTime= myTime[4];
					newTime= newTime.split(":"); 
					var finalTime = newTime[0]+":"+newTime[1];
					
					var $appointment = $(
						"<article id='id" + data[i].id + "' class='block info'>" +
								"<h1>" + data[i].firstUser + "</h1>" +
								"<div class='meta'>" +
									"<span class='icon'>&#xf073;</span> " +
									 newDate +
								"</div>" +
								"<div class='meta'>" +
									"<span class='icon'>&#xf017;</span>" +
									finalTime +
								"</div>" +
								"<ons-button class='btn' ng-click='accept(" + data[i].id + "," + data[i].firstLat + "," + data[i].firstLon + ")'>" +
									"Accepteren" +
								"</ons-button>" +
								"<ons-button class='btn' ng-click='remove(" + data[i].id + ")'>" +
									"Afwijzen" +
								"</ons-button>" +
							"<div class='clear'></div>" +
						"</article>").appendTo("#notifications");
						$compile($appointment)($scope);
						
						$scope.meetingId = data[i].id;
				}
			}
			i++;
		}
		
	},
	error: function(data) {
		alert("Geen nieuwe meldingen gevonden");
	}
	});
	
	$scope.showPosition = function (position) {
		 var lat = position.coords.latitude;
		 var lon = position.coords.longitude;
		
		$scope.secondlat = lat;
		$scope.secondlon = lon;
		
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
	
	$scope.accept = function(meetingId, firstlat, firstlon) {
		var latitude = Number($scope.secondlat);
		var longitude = Number($scope.secondlon);
		
		var firstlat = Number(firstlat);
		var firstlon = Number(firstlon);
		
			
		var lon = (firstlon + longitude) / 2;
		var lat = (firstlat + latitude) / 2;

		var lat = lat.toString().substring(0, 9);
		var lon = lon.toString().substring(0, 9);
		
			
		$scope.initialize = function() {
		
			var pyrmont = new google.maps.LatLng(lat, lon);
		
			var request = {
				location: pyrmont,
				radius: 2000,
				types: ['restaurant']
			};

			//$scope.placesList = document.getElementById('places');
			$scope.service = new google.maps.places.PlacesService(map);
			$scope.service.nearbySearch(request, $scope.callback);
			 //alert(15236);
		}
		 $scope.callback = function (results, status) {
				//alert("yrdy");
				//alert(status);
		  if (status != google.maps.places.PlacesServiceStatus.OK) {
			return;
		  } else {
			$scope.createDetails(results);

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
		$scope.createDetails = function (places) { 
		
		  $scope.bounds = new google.maps.LatLngBounds();

		  for (var i = 0, place; place = places[i]; i++) {
			  
			 var request = {
				placeId: place.place_id
			};
//alert(place.place_id);
			$scope.serviceDetail = new google.maps.places.PlacesService(map);
			$scope.serviceDetail.getDetails(request, function(place) {
				
			/*	var placeName = place.name;
				var placeLatLng = place.geometry.location;
				var placeImage = place.icon;
				var placeAdress = place.vicinity;
				var placePhone = place.international_phone_number;
				var placeURL = place.url;*/
				//alert(place.icon);
				//return false;
				var test = "test";
				$.ajax({
					type: "GET",
					url: "http://dannycoenen.nl/app/letsmeet/update.php?id=" + meetingId + "&secondLat=" + latitude + "&secondLong=" + longitude + "&locName=" + place.name + "&loclatlng=" + place.geometry.location + "&locIcon=" + place.icon + "&locTel=" + place.international_phone_number + "&locUrl=" + place.url + "&locAdres=" + place.vicinity + "&mode=update",
					dataType: "json",
					success: function(data) {
						alert('Uitnodiging geaccepteerd');
						var articleId = "#id" + meetingId;
						$(articleId).remove();
					},
					error: function(data) {
						alert("ERROR");
					}
				});
				
			});
			//console.log(place);

			$scope.bounds.extend(place.geometry.location);
			
			if (i === 0) { break; }
			
			
		  }
		}
		$scope.initialize();
		

		
	}
	$scope.remove = function(meetingId) {
		$.ajax({
			type: "GET",
			url: "http://dannycoenen.nl/app/letsmeet/update.php?id=" + meetingId + "&mode=remove",
			dataType: "json",
			success: function(data) {
				alert('Uitnodiging afgewezen');
				var articleId = "#id" + meetingId;
				$(articleId).remove();
			},
			error: function(data) {
				alert("ERROR");
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
				
				var trimPhone = contacts[i].phoneNumbers[0].value.replace(/\s+/g, '');
				var phone = trimPhone.replace('+316', '06');
				
				var person = contacts[i].displayName + "," + phone;
				
				var $newElement = $(
					"<label>" +
					"<input type='radio' ng-model='contact' name='contact' value='" + person + "'>" +
					contacts[i].displayName + "<br />" +
					"Mobiel: " + phone +
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
			url: "http://dannycoenen.nl/app/letsmeet/register.php?name=" + myName + "&phone=" + myPhone + "&secName=" + contactArray[0] + "&secPhone=" + contactArray[1] + "&firstLat=" + latitude + "&firstLon=" + longitude + "&date=" + date + "&time=" + time + "&status=" + "pending",
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
  


 
  
})();
