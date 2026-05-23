export const getImageUrl = (url: string) => {
  if (!url) return '';
  if (url.startsWith('/uploads/')) {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const baseUrl = isLocal ? 'http://localhost:5000' : '/_/backend';
    return `${baseUrl}${url}`;
  }
  return url;
};
