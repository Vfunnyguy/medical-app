import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { auth_img } from '@/utils';
import Login from '../components/auth/Login';
import SideBar from '../components/menu/sideBar';
import Admin from '../components/system/admin';
import { useQuery } from 'react-query';
import axios from 'axios';

const Home = () => {
 
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('get-allUser?id=ALL')
      .then((res) => res.json())
      .then(data => {
        setData(data.userData);
      });

  }, []);
//  const getDatafromProxy=()=>{
//   axios.get('/get-allUser?id=ALL').then((res)=>res.json()).then(console.log(res))
//  }

  return (
    <div className="home-page">
      {/* <Admin /> */}
      {
       data&& data.map(item=>
         
          <li key={item.id}>
          {item.fullName}
          </li>
        
        )
      }
      hello this is home page
  
    </div>
  );
};

export default Home;
