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
    if(http.readyState == 4 && http.status == 200) {
        document.getElementById('responseText').innerValue = http.responseText;
    }
}
http.send(JSON.stringify(params));
  }
