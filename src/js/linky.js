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
console.log("path", path);
if(path !== "/") {
  fetch('/.netlify/functions/get-route?code='+url)
    .then(function(response) { return response.json(); })
    .then(function(data) {
      document.querySelector("#confirmation").innerHTML = data.code + ' = <a href="' + data.url + '" target="_BLANK" rel="noopener">' + data.url + '</a>';
      return;
  });
}


