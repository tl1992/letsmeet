angular.module('starter.controllers', ['ngRoute'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $interval, $http, $location) {
	// GET USERID FROM URL
	var userid = $location.search();
	for(key in userid) {
        var value = userid[key];
        //do something with value;
		var userId = value;
		console.log(userId);
	}
	//var userId = "30";
	//var paramValue = $location.search().userid;
	//console.log(paramValue);
	callAtInterval($scope, $http, userId);
	$interval(callAtInterval($scope, $http, userId), 300000);
	//console.log($location.search('userid'));
	//check which user it is
	//checkuser();
	
	
  // Form data for the login modal
  //$scope.loginData = {};
	
  // Create the login modal that we will use later
  /*$ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);*/

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    /*$timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };*/
  
  // When someone is logging out, there comes an alert and returns to the index.html
  $scope.logout = function() {
	alert("Je bent uitgelogd!");
   	window.location = "index.html";
  };
  
})

.controller('DashboardCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Marita', distance: '75' , id: 1 },
    { title: 'Anne', distance: '90', id: 2 },
    { title: 'Lisa', distance: '100', id: 3 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
	$scope.user = [
    { title: $stateParams["playlistTitle"], afbeelding: 'https://yt3.ggpht.com/-1_-y_LjEf7Y/AAAAAAAAAAI/AAAAAAAAAAA/VTzJV_9Gkiw/s900-c-k-no/photo.jpg', gear: 'Always extra plus',telefoonnummer: '0653282684', id: 1}
  	];
	
	$scope.contactme = function() {
	//alert('hy');
	var message = "hoi";
	 var options = {
            replaceLineBreaks: false, // true to replace \n by a new line, false by default
            android: {
                intent: 'INTENT'  // send SMS with the native android SMS messaging
                //intent: '' // send SMS without open any other app
            }
        };

        var success = function () { alert('Message sent successfully'); };
        var error = function (e) { alert('Message Failed:' + e); };
        sms.send("0653282684", message, options, success, error);
       }
});

function callAtInterval($scope, $http, userId) {
	//now send this value to the database!
	  window.navigator.geolocation.getCurrentPosition(function(position) {
		  		var latitude = position.coords.latitude;
				var longitude = position.coords.longitude;
				
				$http.post("http://maritapeeters.nl/periodsaver/postdata.php?userId="+userId+"&latitude="+latitude+"&longitude="+longitude).success(function(data){
				$scope.tasks = data;
				});
                }, function(error) {
                    alert(error);
            });
	
};

/*function checkuser(){
	var searchObject = location.search();
	console.log(searchObject);
};*/
// Geo location
/*module.controller('GeoCtrl', function($cordovaGeolocation) {

  var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      var lat  = position.coords.latitude
      var lon = position.coords.longitude
    }, function(err) {
      // error
    });


  var watchOptions = {
    frequency : 1000,
    timeout : 3000,
    enableHighAccuracy: false // may cause errors if true
  };

  var watch = $cordovaGeolocation.watchPosition(watchOptions);
  watch.then(
    null,
    function(err) {
      // error
    },
    function(position) {
      var lat  = position.coords.latitude
      var lon = position.coords.longitude
  });


  watch.clearWatch();
  // OR
  $cordovaGeolocation.clearWatch(watch)
    .then(function(result) {
      // success
      }, function (error) {
      // error
    });
});*/

/*.controller('LocationCtrl', function($scope) {
	$scope.getLocation = function () { 
		if (navigator.geolocation) { 
			navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.showError); 
		} 
		else { 
			$scope.error = "Geolocation is not supported by this browser."; 
		} 
	} 
	$scope.getLocation();
	
	$scope.showPosition = function (position) { 
		var lat = position.coords.latitude; 
		var lon = position.coords.longitude; 
		alert(lat); 
		alert(lon); 
	}
	
	$scope.showError = function (error) { 
	switch (error.code) { 
			case error.PERMISSION_DENIED: $scope.error = "User denied the request for Geolocation." 
			break; 
			case error.POSITION_UNAVAILABLE: $scope.error = "Location information is unavailable." 
			break; 
			case error.TIMEOUT: $scope.error = "The request to get user location timed out." 
			break; 
			case error.UNKNOWN_ERROR: $scope.error = "An unknown error occurred." 
			break; 
		} 
		$scope.$apply(); 
	}
});*/

// Test 123 GEO LOCATION, yet another fail
/*

var app = angular.module('app', []);

app.controller('LocationCtrl', function($scope, $window) {
	$window.navigator.geoLocation.getCurrentPosition(function(position){
		var lat = position.coords.latitude;
		var lng = position.coords.longitude;
		
		$scope.appy(function(){ 
			$scope.lat = lat;
			$scope.lng = lng;
			
		});
	});
});


*/


/* ONE WAY OR ANOTHER IM GONNA FIND YOU!

var module = angular.module('app', ['ionic'])

module.controller('LocationCtrl', function($scope) {
	$scope.getLocation = function () { 
		if (navigator.geolocation) { 
			navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.showError); 
		} 
		else { 
			$scope.error = "Geolocation is not supported by this browser."; 
		} 
	} 
		$scope.getLocation();
		
	$scope.showPosition = function (position) { 
		var lat = position.coords.latitude; 
		var lon = position.coords.longitude; 
		
		alert(lat); 
		alert(lon); 
	}
	
	$scope.showError = function (error) { 
		switch (error.code) { 
			case error.PERMISSION_DENIED: $scope.error = "User denied the request for Geolocation." 
			break; 
			case error.POSITION_UNAVAILABLE: $scope.error = "Location information is unavailable." 
			break; 
			case error.TIMEOUT: $scope.error = "The request to get user location timed out." 
			break; 
			case error.UNKNOWN_ERROR: $scope.error = "An unknown error occurred." 
			break; 
		} 
			$scope.$apply(); 
	}
		
}); */



