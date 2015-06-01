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
					var notifications = data.length;
					$('<div id="count"></div>').insertAfter('#notification');
					document.getElementById("count").innerHTML = notifications;
					
					document.getElementById("meetings").innerHTML = "";
					
					for (var i = 0; i < data.length;) {
						var location = 'onclick="window.open(\'geo:\'+\'38.897096,-77.036545\', \'_system\')"';
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
										 data[i].date +
									"</div>" +
									"<div class='meta'>" +
										"<span class='icon'>&#xf017;</span>" +
										data[i].time +
									"</div>" +
									"<ons-button class='btn' " + location + ">" +
										"Navigeer" +
									"</ons-button>" +
								"</div>" +
								"<div class='clear'></div>" +
							"</article>").appendTo("#meetings");
						i++;
					}
					
				},
				error: function(data) {
					//alert("ERROR");
					$('#count').remove();
				}
				});
			},5000);
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

	