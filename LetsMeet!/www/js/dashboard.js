//localStorage.clear();

var myName = localStorage.getItem("name");
var myPhone = localStorage.getItem("phone");
document.getElementById("myName").innerHTML = myName;
document.getElementById("myPhone").innerHTML = myPhone;


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
	}
	});
},5000);

	$.ajax({
	type: "GET",
	url: "http://dannycoenen.nl/app/letsmeet/check.php?name=" + myName + "&phone=" + myPhone,
	dataType: "json",
	success: function(data) {
		var notifications = data.length;
		$('<div id="count"></div>').insertAfter('#notification');
		document.getElementById("count").innerHTML = notifications;
	},
	error: function(data) {
		//alert("ERROR");
	}
	});

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