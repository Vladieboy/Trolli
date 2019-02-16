import qs from "qs";
import Jquery from "jquery";
// import axios from "axios";
// axios.defaults.withCredentials = true;
// // Add a request interceptor
// axios.interceptors.request.use(function(config) {
//   console.log("withCredentials");
//   config.withCredentials = true;
//   return config;
// });
// // withCredentials: true,

/**
 * Will unpack the response body from reponse object
 * @param {*} response
 *
 */
const onGlobalSuccess = response => {
  /// Should not use if you need access to anything other than the data
  return response.data;
};

const onGlobalError = err => {
  return Promise.reject(err);
};

window.jQuery = Jquery;
window.jquery = Jquery;
window.$ = Jquery;

const API_HOST_PREFIX = process.env.REACT_APP_API_HOST_PREFIX;
const FACEBOOK_APP_ID = process.env.REACT_APP_FACEBOOK_APP_ID;

export { onGlobalError, onGlobalSuccess, API_HOST_PREFIX, FACEBOOK_APP_ID, qs };
