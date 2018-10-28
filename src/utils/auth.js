import decode from 'jwt-decode';
import axios from 'axios';
import auth0 from 'auth0-js';
import Router from 'vue-router';
import Auth0Lock from 'auth0-lock';
import ChatterApi from '../api/ChatterApi';
const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';
const USER_KEY = 'user_info';

const CLIENT_ID = '26K0G3dpKG3JVSMgDUCM2c4OUoxsDZY1';
const CLIENT_DOMAIN = 'chalendar.eu.auth0.com';
const REDIRECT = process.env.LOGIN_CALLBACK_URI;
const SCOPE = 'openid profile email';
const AUDIENCE = 'https://chalendar.com/';

const chatterApi = new ChatterApi();

var auth = new auth0.WebAuth({
  clientID: CLIENT_ID,
  domain: CLIENT_DOMAIN
});

var vue;
// TODO: this should not be necessary, find out the correct wy to do this
export function setVue(vueArg) {
  vue = vueArg;
}

export function login() {
  auth.authorize({
    responseType: 'token id_token',
    redirectUri: REDIRECT,
    audience: AUDIENCE,
    scope: SCOPE
  });
}

var router = new Router({
  mode: 'history',
});

export function logout() {
  clearIdToken();
  clearAccessToken();
  clearUserInfo();
  vue.$session.destroy();
  window.location.href = '/';
}

export function requireAuth(to, from, next) {
  if (!isLoggedIn()) {
    next({
      path: '/',
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
}

export function getIdToken() {
  return vue.$cookies.get(ID_TOKEN_KEY)
}

export function getAccessToken() {
  return vue.$cookies.get(ACCESS_TOKEN_KEY)
}

export function getUserInfo() {
  return vue.$cookies.get(USER_KEY)
}

function clearIdToken() {
  vue.$cookies.remove(ID_TOKEN_KEY);
}

function clearAccessToken() {
  vue.$cookies.remove(ACCESS_TOKEN_KEY);
}

function clearUserInfo() {
  vue.$cookies.remove(USER_KEY);
}

// Helper function that will allow us to extract the access_token and id_token
function getParameterByName(name) {
  let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// Get and store access_token in local storage
export function setAccessToken() {
  let accessToken = getParameterByName('access_token');
  // TODO: should be encrypted
  vue.$cookies.set(ACCESS_TOKEN_KEY, accessToken);
}

// Get and store id_token in local storage
export function setIdToken() {
  let idToken = getParameterByName('id_token');
  // TODO: should be encrypted
  vue.$cookies.set(ID_TOKEN_KEY, idToken);
}

function renewToken() {
  console.log('Renew token');
  auth.checkSession({
      responseType: 'code',
      audience: AUDIENCE,
      scope: SCOPE
    },
    function(err, result) {
      if (err) {
        console.log(err);
      } else {
        setAccessToken();
        setIdToken();
        setUserInfo(vue);
      }
    }
  );
}

export function setUserInfo(js) {
  auth.client.userInfo(getAccessToken(), function(err, user) {
    if (err) {
      renewToken();
    } else {
      // console.log(err);
      // console.log("getAccessToken():" + getAccessToken());
      console.log('user0:');
      console.log(user);
      if (user) {
        chatterApi.putChatter(user)
          .then(chatter => {
            js.$store.commit('userStore/setChatter', chatter);
          })
          .catch(error => {
            console.error(error.response ? error.response : error);
          })
      }
    }
  });
}

export function isLoggedIn() {
  if (!vue) { return false; }
  const idToken = getIdToken();

  console.log(vue.$session.getAll());

  return vue.$session.exists() && !!idToken && !isTokenExpired(idToken);
}

function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) { return null; }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}
