$("#loginForm").submit(function(){
	var name = $('#name').val();
    var password = $('#password').val();
	
	if (name == "" || password == "") {
	alert("Vul alles in aub");
	return false;
	}	
	
	$.ajax({
		type: "GET",
		url: "http://maritapeeters.nl/periodsaver/login.php?name=" + name + "&password=" + password,
		dataType: "json",
		success: function(data) {
			alert("Je bent ingelogd!");
			window.location = "dashboard.html#/app/dashboard?userid=" + data;
			//localStorage.id = data;
		},
		error: function(data) {
			alert("Gegevens kloppen niet");
			//window.location = "index.html";
		}
	});	
	return false;	
});

$("#registerForm").submit(function(){
	var name = $('#name').val();
    var password = $('#password').val();
	var telephone = $('#telephone').val();
	
	if (name == "" || password == "") {
	alert("Vul een gebruikersnaam en wachtwoord in");
	}		
	$.ajax({
		type: "GET",
		url: "http://maritapeeters.nl/periodsaver/save.php?name=" + name + "&password=" + password + "&telephone=" + telephone,
		dataType: "json",
		success: function(data) {
			alert("Je bent geregistreerd! Log nu in!");
			window.location = "index.html";
		},
		error: function(data) {
			alert("Gebruikersnaam is al in gebruik, probeer opnieuw!");
		}
	});
	
	return false;
});

$('#register').click(function(){
	window.location = "register.html";
	return false;
});

//FUNCTIONS
function getUserData(data){
	$.ajax({
		type: "POST",
		url: "http://maritapeeters.nl/periodsaver/save.php?name=" + name + "&password=" + password,
		dataType: "json",
		success: function(data) {
			window.location = "index.html";
		},
		error: function(data) {
			alert("Gebruikersnaam is al in gebruik, probeer opnieuw!");
		}
	});
	
	return userData;
}
//SPLASH
	setTimeout(function() {
    $('#splash').fadeOut('slow');
	}, 1500);

document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady(){
setTimeout(function(){
		alert(cordova);
var telephoneNumber = cordova.require("cordova/plugin/telephonenumber");
alert(telephoneNumber);
telephoneNumber.get(function(result) {
        alert("result = " + result);
    }, function() {
        alert("error");
    });
	
	}, 5000);
}