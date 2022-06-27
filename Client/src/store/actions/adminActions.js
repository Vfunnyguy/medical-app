import actionTypes from './actionTypes';
import {
  getCodeApi,
  createUserApi,
  getAllUserApi,
  deleteUserApi,
  editUserApi,
} from '../../services/userService';
import { toast } from 'react-toastify';

export const genderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.GENDER_START });
      let res = await getCodeApi('GENDER');
      if (res && res.errCode === 0) {
        dispatch(genderSuccess(res.data));
      } else {
        dispatch(genderEnd());
      }
    } catch (error) {
      dispatch(genderEnd());
      console.log(error);
    }
  };

  // type: actionTypes.GENDER_START
};
export const genderSuccess = (genData) => ({
  type: actionTypes.GENDER_SUCCESS,
  data: genData,
});
export const genderEnd = () => ({
  type: actionTypes.GENDER_END,
});
export const posSuccess = (posData) => ({
  type: actionTypes.POSITION_SUCCESS,
  data: posData,
});
export const posEnd = () => ({
  type: actionTypes.POSITION_END,
});
export const roleSuccess = (roleData) => ({
  type: actionTypes.ROLE_SUCCESS,
  data: roleData,
});
export const roleEnd = () => ({
  type: actionTypes.ROLE_END,
});
export const posStart = () => {
  return async (dispatch, getState) => {
    try {
      // dispatch({type:actionTypes.POSITION_START})
      let res = await getCodeApi('POSITION');
      if (res && res.errCode === 0) {
        dispatch(posSuccess(res.data));
      } else {
        dispatch(posEnd());
      }
    } catch (error) {
      dispatch(posEnd());
      console.log(error);
    }
  };
};
export const roleStart = () => {
  return async (dispatch, getState) => {
    try {
      // dispatch({type:actionTypes.ROLE_START})
      let res = await getCodeApi('ROLE');
      if (res && res.errCode === 0) {
        dispatch(roleSuccess(res.data));
      } else {
        dispatch(roleEnd());
      }
    } catch (error) {
      dispatch(roleEnd());
      console.log(error);
    }
  };
};
export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createUserApi(data);
      console.log(res);
      if (res.user && res.user.errCode === 0) {
        toast.success('Tạo thành công');
        dispatch(createUserSuccess());
        dispatch(getUserStart());
      } else {
        dispatch(createUserFail());
      }
    } catch (error) {
      dispatch(createUserFail());
      console.log(error);
    }
  };
};
export const createUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
  //   data: data,data
});
export const createUserFail = () => ({
  type: actionTypes.CREATE_USER_FAIL,
});
export const getUserStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUserApi('ALL');
      if (res && res.errCode === 0) {
        dispatch(getUserSuccess(res.userData.reverse()));
      } else {
        toast.error('Không thể lấy dữ liệu');
        dispatch(getUserEnd());
      }
    } catch (error) {
      toast.error('Không thể lấy dữ liệu');

      dispatch(getUserEnd());
      console.log(error);
    }
  };
};
export const getUserSuccess = (data) => ({
  type: actionTypes.GET_USER_SUCCESS,
  users: data,
});
export const getUserEnd = () => ({
  type: actionTypes.GET_USER_END,
});
export const deleteUserStart = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserApi(id);
      if (res.result && res.result.errCode === 0) {
        toast.success('Xóa thành công');
        dispatch(deleteUserSuccess());
        dispatch(getUserStart());
      } else {
        toast.error('Không thể xóa');
        dispatch(deleteUserEnd());
      }
    } catch (error) {
      toast.error('Không thể xóa');
      dispatch(deleteUserEnd());
      console.log(error);
    }
  };
};
export const deleteUserSuccess = () => ({
  type:' DEL_SUCCESS',
});
export const deleteUserEnd = () => ({
  type: 'DEL_END',
});
export const editUser=(data)=>{
  return async(dispatch,getState)=>{
    try{
      let res=await editUserApi(data);
      console.log(res.message);
      if(res.message&&res.message.errCode===0){
        toast.success('Sửa thành công');
        dispatch(editUserSuccess());
        dispatch(getUserStart());
      }else{
        toast.error('Không thể sửa');
        dispatch(editUserEnd());
      }
    }catch(error){
      toast.error('Không thể sửa');
      dispatch(editUserEnd());
      console.log(error);
    }
  }
}
export const editUserSuccess=()=>({
  type:actionTypes.EDIT_SUCCESS,

})
export const editUserEnd=()=>({
  type:actionTypes.EDIT_FAIL
})