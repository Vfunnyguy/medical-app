import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { fakeData } from '../utils/dataFake';
const Home = () => {

  useEffect(() => {
    console.log(fakeData.length)

  }, [])

  return (
    <div className="home-page">

    
   {
     fakeData.map((fd,index)=>
      <div key={fd.id} className='row' >
      <Typography>
      {fd.tName}
      </Typography>
      {
        fd.doc&&fd.doc.map((it)=>
       <div className="col-md-4 mb-2">
       
        <Card sx={{ maxWidth: 345 }} key={it.id}>
      <CardMedia
        component="img"
        height="140"
        image={it.avatar}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {it.docName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {it.specs}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
       </div>      

        
        )
      }
      </div>
     )
   }
  <Link to="/auth">Login</Link>
    </div>
  );
};

export default Home;
