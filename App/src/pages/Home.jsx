import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { auth_img } from '@/utils';
import Login from '../components/auth/Login';
import SideBar from '../components/menu/sideBar';
import Admin from '../components/system/admin';
// import { getAllUserApi } from '../redux/action/authAction';
const Home = () => {

//  useEffect(()=>{
   
//    fetch('http://localhost:3920/api/get-allUser?id=ALL').then(res=>res.json()).then(res=>{
//      console.log(res);
//    })
//  },[])


  
  return (
    <div className="home-page">

     <Admin/>
      
         
  
    </div>
  );
};

export default Home;
