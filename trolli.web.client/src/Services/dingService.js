import * as global from "./serviceHelpers";
import axios from "axios";
import qs from "qs";

const getRoutes = (originLatLong, destinationLatLong) => {
  const config = {
    method: "GET",
    url: "http://api.metro.net/agencies/lametro/",
    withCredentials: true,
    crossDomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
    .then(global.onGlobalSuccess)
    .catch(global.onGlobalError);
};

const create = payload => {
  const config = {
    data: payload,
    method: "POST",
    url: "/api/trolli",
    withCredentials: true,
    crossDomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
    .then(global.onGlobalSuccess)
    .catch(global.onGlobalError);
};

const getPageNearby = qStr => {
  const config = {
    method: "GET",
    url: "/api/trolli?" + qs.stringify(qStr),
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
    .then(global.onGlobalSuccess)
    .catch(global.onGlobalError);
};

const getPageMine = qStr => {
  const config = {
    method: "GET",
    url: "/api/trolli/mydings?" + qs.stringify(qStr),
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
    .then(global.onGlobalSuccess)
    .catch(global.onGlobalError);
};

export { getPageNearby, create, getRoutes, getPageMine };
