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
  return axios.delete(`/api/deleteUser`, { data: { id: userId } });
};
const getCodeApi = (type) => {
  return axios.get(`/api/code?type=${type}`);
};
const editUserApi = (typeI) => {
  return axios.put(`/api/editUser`, { data: typeI });
};
const getTopDoctorApi = (limit) => {
  return axios.get(`/api/get-top-doctor?limit=${limit}`);
};
const getAllDoctorApi = () => {
  return axios.get(`/api/get-all-doctor`);
};
const saveDoctorInfoApi = (data) => {
  return axios.post('/api/save-doc-info', data);
}
const getDetailDoctor=(inputID)=>{
  return axios.get(`/api/get-doctor-byID?id=${inputID}`)
}
export {
  handleLoginApi,
  getAllUserApi,
  createUserApi,
  deleteUserApi,
  getCodeApi,
  editUserApi,
  getTopDoctorApi,
  getAllDoctorApi,
  saveDoctorInfoApi,
  getDetailDoctor
};
