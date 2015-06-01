ons.ready(function() {
	
	// ####################################################################
	// index page
	// ####################################################################
	document.addEventListener("pageinit", function(e) {
		if (e.target.id == "startpage") {
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
			//document.getElementById("myName").innerHTML = myName;
			//document.getElementById("myPhone").innerHTML = myPhone;
			
			// Controleer elke 5 seconden op uitnodigingen
			setInterval(function(){
				$.ajax({
				type: "GET",
				url: "http://dannycoenen.nl/app/letsmeet/check.php?name=" + myName + "&phone=" + myPhone,
				dataType: "json",
				success: function(data) {
					
					$('#count').remove();
					var notifications = 0;
					document.getElementById("meetings").innerHTML = "";
					
					for (var i = 0; i < data.length;) {
						
						if(data[i].status == "pending"){
							notifications++;
						}
						
						if(data[i].status == "accepted"){
							
							var location = 'onclick="window.open(\'geo:\'+\'38.897096,-77.036545\', \'_system\')"';
							
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
										"<span class='icon'>&#xf0f4;</span>" +
									"</div>" +
									"<div class='right'>" +
										"<h1>" + data[i].firstUser + "</h1>" +
										"<div class='meta'>" +
											"<span class='icon'>&#xf041;</span>" +
											"Testlocatie" +
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
			},2000);
		}
	}, false);
	
	
	// ####################################################################
	// Notification page
	// ####################################################################
	document.addEventListener("pageinit", function(e) {
		if (e.target.id == "notification") {

		}
	}, false);
	
	// ####################################################################
	// Invite page
	// ####################################################################
	document.addEventListener("pageinit", function(e) {
		if (e.target.id == "invite") {
			$("#inviteForm").hide();
		}
	}, false);
		
});

	