'use strict';

const Hashids = require("hashids");
const axios = require("axios");


exports.handler = async(event) => {


  // Set the root URL according to the Netlify site we are within
  var rootURL = process.env.URL + "/";
  // var rootURL = "https://linkylinky.netlify.app/";

  // get the details of what we are creating
  var destination = event.queryStringParameters['to'];

  // generate a unique short code (stupidly for now)
  var hash = new Hashids();
  var number = Math.round(new Date().getTime() / 100);
  var code = hash.encode(number);

  // ensure that a protocol was provided
  if (destination.indexOf("://") == -1) {
    destination = "http://" + destination;
  }


  axios.post(rootURL, {
      'form-name': "routes",
      'destination': destination,
      'code': code,
      'expires': ""
    })
    .then((response) => {
      console.log(response);
      console.log("Route registered. Site deploying to include it. " + rootURL + code);
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "url": rootURL + code })
      };
    }, (error) => {
      // console.log(error);
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(error)
      };
    });



  // ENHANCEMENT: check for uniqueness of shortcode
  // ENHANCEMENT: let the user provide their own shortcode
  // ENHANCEMENT: dont' duplicate existing routes, return the current one
  // ENHANCEMENT: allow the user to specify how long the redirect should exist for

}