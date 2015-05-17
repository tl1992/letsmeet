var myName = localStorage.getItem("name");
var myPhone = localStorage.getItem("phone");
document.getElementById("myName").innerHTML = myName;
document.getElementById("myPhone").innerHTML = myPhone;

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
			// data will contain var1 and var2
			alert(data);
		},
		error: function(data) {
			alert("ERROR");
		}
	});
	
	return false;
}