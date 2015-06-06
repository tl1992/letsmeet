ons.ready(function() {
	
	// ####################################################################
	// Dashboard page
	// ####################################################################
	document.addEventListener("pageinit", function(e, $scope) {
		if (e.target.id == "dashboard") {
			//localStorage.clear();
			
			var myName = localStorage.getItem("name");
			var myPhone = localStorage.getItem("phone");
			
			function fullCheck(){
				$.ajax({
				type: "GET",
				url: "http://dannycoenen.nl/app/letsmeet/check.php?name=" + myName + "&phone=" + myPhone,
				dataType: "json",
				success: function(data) {
					
					$('#count').remove();
					var notifications = 0;
					document.getElementById("meetings").innerHTML = "";
					
					for (var i = 0; i < data.length;) {
						
						if(data[i].secondPhone == myPhone){
							if(data[i].status == "pending"){
								notifications++;
							}
						}
						
						var firstLat = Number(data[i].firstLat);
						var secondLat = Number(data[i].secondLat);
						
						var firstLon = Number(data[i].firstLon);
						var secondLon = Number(data[i].secondLon);
						
						var lat = (firstLat + secondLat) / 2;					
						var lon = (firstLon + secondLon) / 2;
						
						function initialize() {
							
							//alert(123);
							var pyrmont = new google.maps.LatLng(lat, lon);

							 var request = {
								location: pyrmont,
								radius: 2000,
								types: ['restaurant']
							  };

							  var placesList = document.getElementById('places');

							  var service = new google.maps.places.PlacesService(map);
							  service.nearbySearch(request, callback);
						}
						
						function callback(results, status, pagination) {
						  if (status == google.maps.places.PlacesServiceStatus.OK) {
								createDetails(results);
						  }
						}
						function createDetails(places) {
						  var bounds = new google.maps.LatLngBounds();

						  for (var i = 0, place; place = places[i]; i++) {
							  
							 var request = {
								placeId: place.place_id
							};

							var serviceDetail = new google.maps.places.PlacesService(map);
							serviceDetail.getDetails(request, function(place) {
								 //alert(place.international_phone_number);
												
								
								if(data[i].status == "accepted"){  
							
							
									var location = 'onclick="window.open(\'geo:\'+\'' +place.geometry.location+'\', \'_system\')"';
									var call = 'onclick="window.open(\'tel:\'+\'' +place.international_phone_number+'\', \'_system\')"';
									var url = 'onclick="window.open(\'\'+\'' +place.url+'\', \'_system\')"';

									
									var myDate= data[i].date;
									myDate= myDate.split(" "); 		
									var newDate= myDate[2]+" - "+myDate[1]+" - "+myDate[3];
									
									var myTime= data[i].time;
									myTime= myTime.split(" "); 		
									var newTime= myTime[4];
									newTime= newTime.split(":"); 
									var finalTime = newTime[0]+":"+newTime[1];
									
									var $appointment = $(
										"<article class='block info'>" +
											"<div class='left'>" +
												"<img src=" + place.icon + " />" +
											"</div>" +
											"<div class='right'>" +
												"<h1>" + data[i].firstUser + "</h1>" +
												"<div class='meta'>" +
													"<span class='icon'>&#xf041;</span>" +
													 place.name  +
												"</div>" +
												"<div class='meta'>" +
													"<span class='icon'>&#xf073;</span> " +
													  newDate +
												"</div>" +
												"<div class='meta'>" +
													"<span class='icon'>&#xf017;</span>" +
													finalTime +
												"</div>" +
												"<ons-button class='btn' " + location + ">" +
													"Navigeer" +
												"</ons-button>" +												
												"<ons-button class='btn' " + call + ">" +
													"Bellen" +
												"</ons-button>" +
												"<ons-button class='btn' " + url + ">" +
													"Website" +
												"</ons-button>" +
											"</div>" +
											"<div class='clear'></div>" +
										"</article>").appendTo("#meetings");
										
								}
								
								
								
							});
							//console.log(place);

							bounds.extend(place.geometry.location);
							
							if (i === 0) { break; }
							
						  }
						}
						initialize();
						

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
			
			
			// Controleer elke 5 seconden op uitnodigingen
			fullCheck();
			setInterval(function(){
				fullCheck();
			},10000);
			
		}
	}, false);
		
});

	