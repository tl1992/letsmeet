ons.ready(function() {
	
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
		}
	}, false);
	
		
});

	