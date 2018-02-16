# LinkyLinky

A little URL shortener of your own.

## Description

This site provides a simple short URL generator for you to host on you own domain. It is not optimized for giant sites or commercial use, but would most likely be best suited for personal use or as an addition to a company site who might be generating a few hundred, or a few thousand short urls.

The redirect rules it generates will be created on Netlify's intelligent CDN and so should be very fast at access time. The generation of new shortcodes will use a static site generation build step to populate and deploy a Netlify `_redirects` file.

Any server side logic for the creation of unique shortcodes will take place in an AWS Lambda which will be created and managed from within Netlify thanks to Netlify Functions.


## Get your own

You can clone this repo to your own github account and create a new site on Netlify to make your own by clicking the _Deploy to Netlify button_ below, and then providing a couple of configuration values.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/philhawksworth/linkylinky)




## Configuration

Before you can start using the URL shortener, you'll need to tell your build script where it can find your data. We'll make use of Netlify's Form Handling and access the content via the provided API.

To do this we'll need to define the following Environment Variables:

- `QUEUE_FORM_ID` : The ID of the form in your Netlify site which will contain all URL shortening requests until they are given a unique shortcode.
- `ROUTES_FORM_ID` : The ID of the form in your Netlify site which contains all of your active routes


