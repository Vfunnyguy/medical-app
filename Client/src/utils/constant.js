export const path = {
    HOME: '/',
    LOGIN: '/login',
    LOG_OUT: '/logout',
    SYSTEM: '/system',
    HomePage:'/home',
    DETAIL_DOCTOR:'/detail-doctor/:id',
    VERIFY_BOOKING:'/verify-booking'
};

export const languages = {
    VI: 'vi',
    EN: 'en'
};
 
export const manageActions = {
    ADD: "ADD",
    EDIT: "EDIT",
    DELETE: "DELETE"
};

export const dateFormat = {
    SEND_TO_SERVER: 'DD/MM/YYYY'
};

export const YesNoObj = {
    YES: 'Y',
    NO: 'N'
}
export const crud_action={
   create:'create',
   edit:'edit',
   delete:'delete',
   read:'read'
}
export function formatCash(str) {
    if (str) return (str + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    else return 0
}