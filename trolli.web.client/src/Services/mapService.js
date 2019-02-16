import axios from "axios";
const key = "AIzaSyC54wON_jHY4WTYo__qxvRwOdd-aYoV1_s";
const routeAPI = "https://maps.googleapis.com/maps/api/directions/json?";
const geoLocationAPI =
  "https://maps.googleapis.com/maps/api/geocode/json?address=";

const getRoute = (originLatLong, destinationLatLong) => {
  const config = {
    method: "GET",
    url:
      routeAPI +
      "origin=" +
      { originLatLong } +
      "&" +
      "destination" +
      { destinationLatLong } +
      "mode=transit&transit_mode=bus&key=" +
      { key },
    withCredentials: true,
    crossDomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
    .then(global.onGlobalSuccess)
    .catch(global.onGlobalError);
};

const geoLocation = (mapImageURL, onSuccess, onError) => {
  debugger;
  const config = {
    method: "POST",
    payload: { url: geoLocationAPI + mapImageURL + "&key=" + key },
    url: "https://localhost:3024/api/routes",
    // withCredentials: true,
    // crossDomain: true,
    headers: {
      "Content-Type": "application/json"
    }
  };

  return axios(config)
    .then(onSuccess)
    .catch(onError);
};

export { getRoute, geoLocation };
