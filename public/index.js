function loginButton() {
  var http = new XMLHttpRequest()
  var url = '/login' 
  var params = {
    'username': document.getElementById("usernameInput").value,
    'password': document.getElementById("passwordInput").value
  }
  http.open('POST', url, true)
  
  //Send the proper header information along with the request
http.setRequestHeader('Content-type', 'application/json');

http.onreadystatechange = function() { // Callback function
  document.getElementById('responseText').innerHTML = http.responseText; 
  
  var res = JSON.parse(http.responseText)
    if (res.redirect !== undefined && res.redirect) {
        window.location.href = res.redirect_url;
    }
}
http.send(JSON.stringify(params));
  }
