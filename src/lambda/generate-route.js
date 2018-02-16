'use strict';

var request = require("request");
var config = require("dotenv").config();
var Hashids = require("hashids");


export function handler(event, context, callback) {

  // get the details of what we are creating
  var destination = event.queryStringParameters['destination'];
  var expires = event.queryStringParameters['expires'];
  var code = event.queryStringParameters['code'];

  // generate a unique short code (stupidly for now)
  var hash = new Hashids();
  var number = Math.round(new Date().getTime() / 100);
  var code = hash.encode(number);

  // determine the expiry date for the route, (or make this a 301?)

  // post the new route to the Routes form
  var payload = {
    'form-name' : "routes",
    'destination': destination,
    'code': code,
    'expires': expires | null
  };

  request.post({'url': 'https://linkylinky.netlify.com/done', 'formData': payload }, function(err, httpResponse, body) {
    var msg;
    if (err) {
      msg = "Post to Routes stash failed: " + err;
    } else {
      msg = "Route registered. Site deploying to include it. https://linkylinky.netlify.com/" + code
    }
    console.log(msg);
    // tell the user what their shortcode will be
    return callback(null, {
      statusCode: 200,
      body: msg
    })
  });

  // ENHANCEMENT: check for uniqueness of shortcode
  // ENHANCEMENT: let the user provide their own shortcode
  // ENHANCEMENT: dont' duplicate existing routes, return the current one

}
