navigator.geolocation.getCurrentPosition(onSuccess, onError);

function onSuccess(position) {
   var current_lat = position.coords.latitude;
   var current_lng = position.coords.longitude;
   var secheltLoc = new google.maps.LatLng(current_lat, current_lng);

 var myMapOptions = {
   zoom: 16,
   center: secheltLoc,
   mapTypeId: google.maps.MapTypeId.HYBRID
 };
 var theMap = new google.maps.Map(document.getElementById("map_canvas"), myMapOptions);
 var image = "img/map_pin.png"
 var marker = new google.maps.Marker({
 map: theMap,
 draggable: false,
 position: new google.maps.LatLng(current_lat, current_lng),
 visible: true,
 icon: image,
 title:'Title' // Title
});

 var myOptions = {
	  content: "",
	  disableAutoPan: false,
	  maxWidth: 0,
	  pixelOffset: new google.maps.Size(-140, -110),
	  pixelOffset: new google.maps.Size(140, 110),
	  zIndex: null,
	  boxStyle: { 
		  background: "url('tipbox.gif') no-repeat",
		  opacity: 0.90
	 },
	 closeBoxMargin: "10px 2px 2px 2px",
	 closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
	 infoBoxClearance: new google.maps.Size(1, 1),
	 isHidden: false,
	 pane: "floatPane",
	 enableEventPropagation: false
 };

 var contentString = '<div class="map_anotaion_title">Yor Content</div>'; //Address on pin click

var infowindow = new google.maps.InfoWindow({
  content: contentString
 });
 infowindow.open(theMap,marker); 
 google.maps.event.addListener(marker, "click", function (e) {
    infowindow.open(theMap,marker);     
 });
}

function onError(error)
{
   alert(error) ;   
}

/*
$(document).ready(function(){
navigator.geolocation.getCurrentPosition(onSuccess, onError);

function onSuccess(position) {
   var current_lat = position.coords.latitude;
   var current_lng = position.coords.longitude;
		$('.output').append('<li>Loading Sam Croft\'s twkjhhjjhghgeets');	

		$.jsonp({
			url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+current_lat+','+current_lng+'&radius=1000&types=food&key=AIzaSyAbEK1wNjuaWBJ2PsGkKslY_zFR6SjaFCo',
			callbackParameter: 'callback',
			success: function(data, status) {
				//$('#your-tweets').append('<li>The feed loads fine');
				$.each(data, function(i,item){ 
					var tweet = item.results[i].name;
					$('.output').append('<li>'+tweet);
				});
			},
			error: function(){
				$('output').append('<li>There was an error loading the feed');
			}
		});		
	
	
}*/
function onError(error)
{
   alert(error) ;   
}
//});