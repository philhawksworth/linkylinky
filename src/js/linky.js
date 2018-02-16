var btn = document.querySelector('#btn-create');
btn.addEventListener('click', function (event) {
  event.preventDefault();
  var url = document.querySelector('#destination');

  fetch('/.netlify/functions/generate-route?destination='+url)
  .then(function(response) { return response.json(); })
  .then(function(data) {
    console.log(data)
    return;
  });


}, false);
