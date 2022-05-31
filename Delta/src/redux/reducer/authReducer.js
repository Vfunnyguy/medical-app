let initialState={
    user:'',
    password:'',
}
export const authReducer=(state=initialState,action)=>{
 switch (action.type) {
     case Auth:
          return{
                ...state,
                user:action.payload.user,
                password:action.payload.password,
          }
         
         break;
 
     default:
         break;
 }

}