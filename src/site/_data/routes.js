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


const baseURL = `https://api.netlify.com/api/v1/forms/${process.env.ROUTES_FORM_ID}/submissions?access_token=${process.env.API_AUTH}`;
let routes = [];
let formatted = [];

async function fetchRoutes(page) {

  const url = `${baseURL}&page=${page}`;
  const response = await axios.get(url);
  const data = response.data;

  console.log(`fetching`, url);

  if (data.length) {
    return routes.concat(await fetchRoutes(page + 1));
  } else {
    // format the result to return
    for (const item of data) {
      if (isValidUrl(item.data.destination)) {
        formatted.push({
          from: item.data.code,
          to: item.data.destination
        });
      }
    }
    return formatted;
  }

}


module.exports = async function() {
  return await fetchRoutes(1)
};