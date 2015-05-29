ons.ready(function() {
	
	//myNavigator.pushPage('register.html', { animation : 'slide' } );
	
	// ####################################################################
	// index page
	// ####################################################################
	document.addEventListener("pageinit", function(e) {
		if (e.target.id == "startpage") {
			alert('start');
		}
	}, false);
	
	// ####################################################################
	// Registration page
	// ####################################################################
	document.addEventListener("pageinit", function(e) {
		if (e.target.id == "register") {
			
		}
	}, false);
	
	// ####################################################################
	// Dashboard page
	// ####################################################################
	document.addEventListener("pageinit", function(e) {
		if (e.target.id == "dashboard") {
			//localStorage.clear();

			var myName = localStorage.getItem("name");
			var myPhone = localStorage.getItem("phone");
			document.getElementById("myName").innerHTML = myName;
			document.getElementById("myPhone").innerHTML = myPhone;
			
			// Controleer elke 5 seconden op uitnodigingen
			setInterval(function(){
				$.ajax({
				type: "GET",
				url: "http://dannycoenen.nl/app/letsmeet/check.php?name=" + myName + "&phone=" + myPhone,
				dataType: "json",
				success: function(data) {
					$('#count').remove();
					var notifications = data.length;
					$('<div id="count"></div>').insertAfter('#notification');
					document.getElementById("count").innerHTML = notifications;
				},
				error: function(data) {
					//alert("ERROR");
					$('#count').remove();
				}
				});
			},5000);
						
			// Functie voor het versturen van uitnodigingen
			function inviteForm() {
				var myName = localStorage.getItem("name");
				var myPhone = localStorage.getItem("phone");
			
				var secName = document.forms["invitation"]["fname"].value;
				var secPhone = document.forms["invitation"]["fphone"].value;
				
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
			
			// Inladen van contacten
			/*var options = new ContactFindOptions();
			options.filter="";
			options.multiple=true; 
			var fields = ["*"];
			navigator.contacts.find(fields, onSuccess, onError, options);
			
			function onSuccess(contacts) {
				for (var c = 0; c < contacts.length; c++) {
					alert(contacts[i].phoneNumber[0].value);
					//$("#contactList").append("<li><h1>"+contacts[i].phoneNumber[0].value+"</h1></li>");
					//$("#contactList").listview("refresh");
				}
			}
			
			function onError(){
				alert("Some Error Occured");
			}*/
		}
	}, false);
	
	
	
	
	
	// ####################################################################
	// Location page
	// ####################################################################
	document.addEventListener("pageinit", function(e) {
		if (e.target.id == "location") {
			//localStorage.clear();
			
			var map, placesList;

			var placeSearch, autocomplete;


			function initialize() {

				navigator.geolocation.getCurrentPosition(onSuccess);
				

				
				function onSuccess(position) {
					
					var input = document.getElementById('searchTextField');
					var autocomplete = new google.maps.places.Autocomplete(input);
					google.maps.event.addListener(autocomplete, 'place_changed', function () {
						var place = autocomplete.getPlace();
						document.getElementById('city2').value = place.name;
						document.getElementById('cityLat').value = place.geometry.location.lat();
						document.getElementById('cityLng').value = place.geometry.location.lng();
						//alert("This function is working!");
						//alert(place.name);
					   // alert(place.address_components[0].long_name);
					   
						var current_lat = position.coords.latitude;
						var current_lng = position.coords.longitude;	

						var averageLat = (position.coords.latitude+place.geometry.location.lat())/2;
						var averageLng = (position.coords.longitude+place.geometry.location.lng())/2;  
						
						var pyrmont = new google.maps.LatLng(averageLat, averageLng);

						
						 map = new google.maps.Map(document.getElementById('map-canvas'), {
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


			
		}
	}, false);
		
});

	