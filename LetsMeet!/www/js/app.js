(function(){
  'use strict';
  var module = angular.module('app', ['onsen']);

  module.controller('AppController', function($scope, $data) {
    $scope.doSomething = function() {
      alert('Hello, World!');
    };
	
  });
  
  module.factory('$data', function() {
      var data = {};
      
      data.items = [
          { 
              title: 'Item 1 Title',
              label: '4h',
              desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          },
          { 
              title: 'Another Item Title',
              label: '6h',
              desc: 'Ut enim ad minim veniam.'
          },
          { 
              title: 'Yet Another Item Title',
              label: '1day ago',
              desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
          },
          { 
              title: 'Yet Another Item Title',
              label: '1day ago',
              desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
          }
      ]; 
      
      return data;
  });
  
// ####################################################################
// Registration page
// ####################################################################
  module.controller('LoginController', function($scope, $data) {
	$scope.register = function() {
		var name = $scope.name;
		var phone = $scope.phone;
		if (name == null || phone == "") {
			alert("Vul een naam en telefoon nummer in");
			return false;
		}
		localStorage.setItem("name", name);
		localStorage.setItem("phone", phone);
		myNavigator.pushPage('dashboard.html', { animation : 'slide' } );
		return false;
	}
  });
  
// ####################################################################
// Dashboard page
// ####################################################################
  module.controller('NotificationController', function($scope, $data) {
	$scope.check = function() {
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
  });
  
  module.controller('InviteController', function($scope, $data) {
	$scope.invite = function() {
		
		var myName = localStorage.getItem("name");
		var myPhone = localStorage.getItem("phone");
	
		var secName = $scope.name;
		var secPhone = $scope.phone;
		
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
  });
  
  
  
})();

