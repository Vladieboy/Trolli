import axios from "axios";
const key = "AIzaSyC54wON_jHY4WTYo__qxvRwOdd-aYoV1_s";
const routeAPI = "https://maps.googleapis.com/maps/api/directions/json?";
const geoLocationAPI =
  "https://maps.googleapis.com/maps/api/geocode/json?address=";

const getRoute = (originLatLong, destinationLatLong, onSuccess, onError) => {
  let r = `${routeAPI}origin=${originLatLong.lat},${
    originLatLong.lng
  }&destination=${destinationLatLong.lat},${
    destinationLatLong.lng
  }&mode=transit&key=${key}`;
  const config = {
    method: "PUT",
    url: "http://localhost:3024/api/routes",
    data: { Url: r },
    withCredentials: true,
    crossDomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
    .then(onSuccess)
    .catch(onError);
};

const geoLocation = (mapImageURL, onSuccess, onError) => {
  let s = `${geoLocationAPI + mapImageURL}&key=${key}`;
  const config = {
    method: "PUT",
    data: { Url: s },
    url: "http://localhost:3024/api/routes",
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

const listOfDings = (payload, onSuccess, onError) => {
  const config = {
    method: "POST",
    data: payload,
    url: "http://localhost:3024/api/trolli/routes",
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

export { getRoute, geoLocation, listOfDings };
