import axios from '../axios'

const handleLoginApi = (email, password) => {
    return axios.post('api/login', { email:email, password:password });
}
const getAllUserApi=(id)=>{
    return axios.get(`/api/get-allUser?id=${id}`)
}
export { handleLoginApi,getAllUserApi };