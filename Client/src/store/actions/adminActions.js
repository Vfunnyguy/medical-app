import actionTypes from './actionTypes';
import { getCodeApi, createUserApi } from '../../services/userService';
import { identity } from 'lodash';

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
      if (res && res.errCode === 0) {
        dispatch(createUserSuccess());
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
