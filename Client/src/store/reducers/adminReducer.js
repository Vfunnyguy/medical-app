import actionTypes from '../actions/actionTypes';

const initialState = {
  isLoadGender: false,
  genders: [],
  roles: [],
  positions: [],
  users:[],
  topDoctor:[],
  allDoctor:[],
  allSchedule:[]
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
    case actionTypes.GET_USER_SUCCESS:
      state.users = action.users
      return{
        ...state
      }
    case actionTypes.GET_USER_END:
      state.users = []
      return{
        ...state
      }
    case actionTypes.GET_DOC_SUCCESS:
      state.topDoctor = action.data
      return{
        ...state
      }
    case actionTypes.GET_DOC_FAIL:
      state.topDoctor = []
      return{
        ...state
      }
    case actionTypes.GET_All_DOC_SUCCESS:
      state.allDoctor = action.data
      return{
        ...state
      }
    case actionTypes.GET_All_DOC_FAIL:
      state.allDoctor = []
      return{
        ...state
      }
    case actionTypes.GET_SCHEDULE_SUCCESS:
      state.allSchedule = action.dataTime
      return{
        ...state
      }
    case actionTypes.GET_SCHEDULE_FAIL:
      state.allSchedule = []
      return{
        ...state
      }
    default:
      return state;
  }
};

export default adminReducer;
