const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',
    //admin
    GENDER_START:'GENDER_START',
    GENDER_SUCCESS:'GENDER_SUCCESS',
    GENDER_END:'GENDER_END',
    POSITION_SUCCESS:'POSITION_SUCCESS',
    POSITION_END:'POSITION_END',
    ROLE_SUCCESS:'ROLE_SUCCESS',
    ROLE_END:'ROLE_END',
    CREATE_USER_SUCCESS:'CREATE_USER_SUCCESS',
    CREATE_USER_FAIL:'CREATE_USER_FAIL',
    DEL_SUCCESS:'DEL_SUCCESS',
    DEL_END:'DEL_END',
    GET_USER_SUCCESS:'GET_USER_SUCCESS',
    GET_USER_END:'GET_USER_END',
    EDIT_SUCCESS:'EDIT_SUCCESS',
    EDIT_FAIL:'EDIT_FAIL',
    GET_DOC_SUCCESS:'GET_DOC_SUCCESS',
    GET_DOC_FAIL:'GET_DOC_FAIL',
    GET_All_DOC_SUCCESS:'GET_All_DOC_SUCCESS',
    GET_All_DOC_FAIL:'GET_All_DOC_FAIL',
    SAVE_DOC_INFO_SUCCESS:'SAVE_DOC_INFO_SUCCESS',
    SAVE_DOC_INFO_FAIL:'SAVE_DOC_INFO_FAIL',
    GET_SCHEDULE_SUCCESS:'GET_SCHEDULE_SUCCESS',
    GET_SCHEDULE_FAIL:'GET_SCHEDULE_FAIL',
})

export default actionTypes;