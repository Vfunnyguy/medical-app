import axios from '../axios';

const handleLoginApi = (email, password) => {
  return axios.post('api/login', { email: email, password: password });
};
const getAllUserApi = (id) => {
  return axios.get(`/api/get-allUser?id=${id}`);
};
const createUserApi = (data) => {
  return axios.post('/api/create-user', data);
};
const deleteUserApi = (userId) => {
  return axios.delete(`/api/deleteUser`,{data:{id:userId}});
};

export { handleLoginApi, getAllUserApi, createUserApi, deleteUserApi };
