ons.ready(function() {
	
	// ####################################################################
	// Dashboard page
	// ####################################################################
	document.addEventListener("pageinit", function(e) {
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
						 
						if(data[i].status == "accepted"){
							
							var locatieString = data[i].loclatlng;
							locatieString = locatieString.replace('(','');
							locatieString = locatieString.replace(')','');
							
							var location = 'onclick="window.open(\'geo:\'+\'' +locatieString+'\', \'_system\')"';
							var url = 'onclick="window.open(\'\'+\'' +data[i].locUrl+'\', \'_system\')"';
							var phone = 'onclick="window.open(\'tel:\'+\'' +data[i].locTel+'\', \'_system\')"';
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
								"<article class='block info'>" +
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
									"</div>" +
									"<div class='clear'></div>" +
								"</article>").appendTo("#meetings");
								
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
			
			
			// Controleer elke 5 seconden op uitnodigingen
			fullCheck();
			setInterval(function(){
				fullCheck();
			},10000);
			
		}
	}, false);
		
});

	