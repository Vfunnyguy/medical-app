import actionTypes from '../actions/actionTypes';

const initialState = {
  isLoadGender: false,
  genders: [],
  roles: [],
  positions: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GENDER_START:
      var cpState = { ...state };
      cpState.isLoadGender = true;
      return {
        ...cpState,
      };
    case actionTypes.GENDER_SUCCESS:
      state.genders = action.data;
      state.isLoadGender = false;
      return {
        ...state,
      };
    case actionTypes.GENDER_END:
      state.isLoadGender = false;
      state.genders = [];
      return {
        ...state,
      };
    case actionTypes.POSITION_SUCCESS:
      state.positions = action.data;
      return {
        ...state,
      };
    case actionTypes.POSITION_END:
      state.positions = [];
      return {
        ...state,
      };
    case actionTypes.ROLE_SUCCESS:
      state.roles = action.data;
      return {
        ...state,
      };
    case actionTypes.ROLE_END:
      state.roles = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;
