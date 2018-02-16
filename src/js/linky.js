var btn = document.querySelector('#btn-create');
btn.addEventListener('click', function (event) {
  event.preventDefault();
  var url = document.querySelector('#destination').value;
  fetch('/.netlify/functions/generate-route?destination='+url)
  .then(function(response) { return response.json(); })
  .then(function(data) {
    document.querySelector("#confirmation").innerHTML = '<a href="' + data.url + '" target="_BLANK" rel="noopener">' + data.url + '</a>';
    return;
  });
}, false);
