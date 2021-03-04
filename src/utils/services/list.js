import 'whatwg-fetch';

export const list = (url) => {
  const options = {
    method: 'GET'
  };
  return fetch(url, options);
};
