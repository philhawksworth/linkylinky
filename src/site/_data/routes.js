const axios = require('axios');

const isValidUrl = (url) => {
  try {
    new URL(url);
  } catch (e) {
    console.error(`INVALID URL omitted:${url}`);
    return false;
  }
  return true;
};

async function fetchRoutes(username) {
  let routes = [];
  const url = `https://api.netlify.com/api/v1/forms/${process.env.ROUTES_FORM_ID}/submissions?access_token=${process.env.API_AUTH}`;
  return axios.get(url)
    .then(res => {
      for (const item of res.data) {
        if (isValidUrl(item.data.destination)) {
          routes.push({
            from: item.data.code,
            to: item.data.destination
          });
        }
      }
      return routes;
    })
    .catch(error => {
      console.error(error)
    });
}


module.exports = async function() {
  return await fetchRoutes()
};