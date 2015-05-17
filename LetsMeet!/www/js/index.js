function inviteForm() {
	var name = document.forms["invitation"]["fname"].value;
	var phone = document.forms["invitation"]["fphone"].value;
	if (name == null || phone == "") {
		alert("Vul een naam en telefoon nummer in");
		return false;
	}
	localStorage.setItem("name", name);
	localStorage.setItem("phone", phone);
	window.location = "dashboard.html";
	return false;
}