import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { auth_img } from '@/utils';
// import { getAllUserApi } from '../redux/action/authAction';
const Home = () => {

//  useEffect(()=>{
   
//    fetch('http://localhost:3920/api/get-allUser?id=ALL').then(res=>res.json()).then(res=>{
//      console.log(res);
//    })
//  },[])


  
  return (
    <div className="home-page">
       <Typography align='center'variant='h1'>
       Manage User System
       </Typography>
       <div className="img-bellow" style={{textAlign:'center'}}>
       <img src={auth_img} alt="welcome img" style={{width:'62%'}} />
       </div>
         
  
    </div>
  );
};

export default Home;
