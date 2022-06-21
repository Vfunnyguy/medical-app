import {createSlice}from '@reduxjs/toolkit';
export const authSlice=createSlice({
    name:'auth',
    initialState:{
      email:'',
      password:''
    },
    reducers:{
      login:(state,action)=>{
        state.email=action.payload;
        state.password=action.payload;
      },
      logout:(state,action)=>{
        state=action.payload;
      }

    }
})
export const{login,logout}=authSlice.actions;
export default authSlice.reducer;