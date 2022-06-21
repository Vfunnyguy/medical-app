import actionTypes from '../actions/actionTypes';

const initialState = {
    gender:[],
    roles:[],
    position:[]
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GENDER_START:
            return {
                ...state,
            }
        case actionTypes.GENDER_SUCCESS:
            return {
                ...state,
                
            }
        case actionTypes.GENDER_END:
            return {
                ...state,
                
            }
        default:
            return state;
    }
}

export default adminReducer;