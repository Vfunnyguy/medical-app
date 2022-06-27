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
const getCodeApi=(type)=>{
  return axios.get(`/api/code?type=${type}`);
}
const editUserApi=(id)=>{
return axios.put(`/api/editUser`,{data:id});
}
export { handleLoginApi, getAllUserApi, createUserApi, deleteUserApi ,getCodeApi,editUserApi};
