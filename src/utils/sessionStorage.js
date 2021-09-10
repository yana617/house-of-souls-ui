exports.getToken = () => sessionStorage.getItem('x-access-token');

exports.setToken = (token) => sessionStorage.setItem('x-access-token', token);

exports.clearStorage = () => sessionStorage.clear();
