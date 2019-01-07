import axios from 'axios';

const get = (url, params) => axios.get(url, { params });

const post = (url, payload) => axios.post(url, payload);

// const getUserData = (params) => get('/users', params);
const getUserData = (params) => post('/users', params);

export {
  getUserData
}