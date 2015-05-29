ons.ready(function() {
	
	//myNavigator.pushPage('register.html', { animation : 'slide' } );
	
	// ####################################################################
	// Registration page
	// ####################################################################
	document.addEventListener("pageinit", function(e) {
		if (e.target.id == "register") {
			function inviteForm() {
				var name = document.forms["invitation"]["fname"].value;
				var phone = document.forms["invitation"]["fphone"].value;
				if (name == null || phone == "") {
					alert("Vul een naam en telefoon nummer in");
					return false;
				}
				localStorage.setItem("name", name);
				localStorage.setItem("phone", phone);
				myNavigator.pushPage('dashboard.html', { animation : 'slide' } );
				return false;
			}
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
			
			// Functie voor het controleren op uitnodigingen
			function checkForInvites() {
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
		
});

	