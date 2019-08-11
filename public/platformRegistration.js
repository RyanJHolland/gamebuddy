function platformRegistrationButton() {
  var http = new XMLHttpRequest()
  var url = '/registerPlatform' 
  
  
  var selection = document.getElementById("platformSelection");
  var platform = selection.options[selection.selectedIndex].value;
  
  var params = {
    'username': document.getElementById("usernameInput").value,
    'password': document.getElementById("passwordInput").value,
    'platform' : platform
  }
  http.open('POST', url, true)
  
  //Send the proper header information along with the request
  http.setRequestHeader('Content-type', 'application/json');

  http.onreadystatechange = function() { // Callback function
    document.getElementById('responseText').innerHTML = http.responseText; 
  
}

http.send(JSON.stringify(params));
  }
