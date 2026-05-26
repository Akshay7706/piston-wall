const isLocalhost = 
  window.location.hostname === 'localhost' || 
  window.location.hostname === '127.0.0.1' || 
  window.location.hostname.startsWith('192.168.') || 
  window.location.hostname.startsWith('10.') || 
  window.location.hostname.endsWith('.local');

console.log('Environment Detection:', {
  hostname: window.location.hostname,
  isLocalhost
});

const BASE_URL = isLocalhost
  ? 'http://localhost:5000'
  : '/_/backend';

export const API_URL = `${BASE_URL}/api`;

export default API_URL;
