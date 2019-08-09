function registerButton() {
  var http = new XMLHttpRequest()
  var url = '/register' 
  var params = {
    'username': document.getElementById("usernameInput").value,
    'password': document.getElementById("passwordInput").value
  }
  http.open('POST', url, true)
  
  //Send the proper header information along with the request
http.setRequestHeader('Content-type', 'application/json');

http.onreadystatechange = function() { // Callback function
  document.getElementById('responseText').innerHTML = http.responseText;
}
http.send(JSON.stringify(params));
  }
