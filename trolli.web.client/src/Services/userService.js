import * as global from "./serviceHelpers";
import axios from "axios";

const getCurrent = () => {
  const config = {
    method: "GET",
    url: "/api/users/current",
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
    .then(global.onGlobalSuccess)
    .catch(global.onGlobalError);
};

const login = payload => {
  const config = {
    method: "POST",
    url: "/api/users/login",
    data: payload,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
    .then(global.onGlobalSuccess)
    .catch(global.onGlobalError);
};

const logout = () => {
  const config = {
    method: "GET",
    url: "/api/users/logout",
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
    .then(global.onGlobalSuccess)
    .catch(global.onGlobalError);
};

const create = payload => {
  const config = {
    method: "POST",
    url: "/api/users",
    data: payload,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
    .then(global.onGlobalSuccess)
    .catch(global.onGlobalError);
};

export { login, logout, getCurrent, create };
