import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { auth_img } from '@/utils';
const Home = () => {

 

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
