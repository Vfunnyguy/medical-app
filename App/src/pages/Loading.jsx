import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
const Loading = () => {
  var loadStyle={
    position:'absolute',
    top:'50%',
    left:'50%'
  }
  return (
  <div  style={loadStyle}>
  
  <Box sx={{ display: 'flex',alignItems:'center',justifyContent:'space-around' }}>
  <CircularProgress/>
  </Box>
  </div>
  );
};

export default Loading;
