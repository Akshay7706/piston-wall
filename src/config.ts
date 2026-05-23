const BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5000'
  : '/_/backend';

export const API_URL = `${BASE_URL}/api`;

export default API_URL;
