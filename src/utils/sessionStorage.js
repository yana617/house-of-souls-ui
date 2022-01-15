const getToken = () => localStorage.getItem('x-access-token');

const setToken = (token) => localStorage.setItem('x-access-token', token);

const clearStorage = () => localStorage.clear();

export {
  getToken,
  setToken,
  clearStorage,
};
