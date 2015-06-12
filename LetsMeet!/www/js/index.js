ons.ready(function() {	
	document.addEventListener("pageinit", function(e) {
			if (e.target.id == "notification") {

			alert("hoi");
			
			var telephoneNumber = cordova.require("cordova/plugin/telephonenumber");
			telephoneNumber.get(function(result) {
					alert("result = " + result);
				}, function(error) {
					alert("error = " + error.code);
				});
				
			}

			
	});
});