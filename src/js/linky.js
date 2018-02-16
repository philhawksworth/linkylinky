var btn = document.querySelector('#btn-create');
btn.addEventListener('click', function (event) {
  event.preventDefault();
  var url = document.querySelector('#destination').value;
  fetch('/.netlify/functions/generate-route?to='+url)
  .then(function(response) { return response.json(); })
  .then(function(data) {
    document.querySelector("#confirmation").innerHTML = '<a href="' + data.url + '" target="_BLANK" rel="noopener">' + data.url + '</a>';
    return;
  });
}, false);


var path = document.location.pathname;
if(path !== "/") {
  fetch('/.netlify/functions/get-route?code='+path.replace("/",""))
    .then(function(response) { return response.json(); })
    .then(function(data) {
      var holdingPattern = "<p>This automatic shortcode is still getting set up. In future it will redirect. Until then, this is where it points:</p>";
      holdingPattern += "<p>" + data.code + ' = <a href="' + data.url + '" target="_BLANK" rel="noopener">' + data.url + '</a></p>';
      document.querySelector("#confirmation").innerHTML = holdingPattern;
      return;
  });
}


