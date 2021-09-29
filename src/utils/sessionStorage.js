const getToken = () => sessionStorage.getItem('x-access-token');

const setToken = (token) => sessionStorage.setItem('x-access-token', token);

const clearStorage = () => sessionStorage.clear();

export {
  getToken,
  setToken,
  clearStorage,
};
