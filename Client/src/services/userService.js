import axios from '../axios';

const handleLoginApi = (email, password) => {
  return axios.post('api/login', {
    email: email,
    password: password
  });
};
const getAllUserApi = (id) => {
  return axios.get(`/api/get-allUser?id=${id}`);
};
const createUserApi = (data) => {
  return axios.post('/api/create-user', data);
};
const deleteUserApi = (userId) => {
  return axios.delete(`/api/deleteUser`, {
    data: {
      id: userId
    }
  });
};
const getCodeApi = (type) => {
  return axios.get(`/api/code?type=${type}`);
};
const editUserApi = (typeI) => {
  return axios.put(`/api/editUser`, {
    data: typeI
  });
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
const getDetailDoctor = (inputID) => {
  return axios.get(`/api/get-doctor-byID?id=${inputID}`)
}
const postbulkSchedule = (bulkData) => {
  return axios.post('/api/bulk-schedule-post', bulkData)
}
const getScheduleByDate = (docId, date) => {
  return axios.get(`/api/get-schedule-byDate?docID=${docId}&date=${date}`)
}
const getExtraInfoById = (inputID) => {
  return axios.get(`/api/get-extra-info-byID?docID=${inputID}`)
}
const getProfileDocInfoById = (inputID) => {
  return axios.get(`/api/get-profile-doc-byID?docID=${inputID}`)
}
const postBookingDoc=(data)=>{
  return axios.post('/api/patient-booking-doctor',data)
}
const postVerifyBooking=(data)=>{
  return axios.post('/api/verify-booking',data)
}
const getPatientList=(docID,date)=>{
  return axios.get(`/api/get-patient-list?docId=${docID}&date=${date}`)
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
  getDetailDoctor,
  postbulkSchedule,
  getScheduleByDate,
  getExtraInfoById,
  getProfileDocInfoById,
  postBookingDoc,
  postVerifyBooking,
  getPatientList
};