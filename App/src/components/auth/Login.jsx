// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import TextField from '@mui/material/TextField';
// const Login = () => {
//   const initState = { email: '', password: '' };
//   const [userLogin, setUserLogin] = useState(initState);
//   const { email, password } = userLogin;
//   const handleChange = (e) => {
//      setUserLogin({...userLogin,[e.target.name]:e.target.value}) 
//   };
//   // const dispatch = useDispatch();
//   const handleSubmit=(e)=>{
//     e.preventDefault();
//     console.log(userLogin);
//   }
//   const [typePass, setTypePass] = useState(false);
//   return (
//     <div className="login-page">
//      <div className="login-page_title">
//      Login
//      </div>
//       <form action="#" onSubmit={handleSubmit}>
     
//         <div className="input-field">
//           <input
//             type="email"
//             required
//             id="account"
//             name="email"
//             // value={email}
//             onChange={handleChange}
//           />
//           <label> Email</label>
//         </div>
//         <div className="input-field">
//           <input
//             className="pswrd"
//             type={typePass ? 'text' : 'password'}
//             required
//             id="password"
//             name="password"
//             // value={password}
//             onChange={handleChange}
//           />
//           <div className="lock-ico">
//             <small onClick={() => setTypePass(!typePass)}>
//               {typePass ? (
//                 <i className="fas fa-eye-slash show_pass"></i>
//               ) : (
//                 <i className="fas fa-eye show_pass"></i>
//               )}
//             </small>
//           </div>

//           <label>Mật Khẩu</label>
//         </div>

//         <div className="button">
//           <button type="submit" className="btn-login">
//             Đăng Nhập
//           </button>

//           <input type="submit" style={{ display: 'none' }} />
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Login;
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';



const theme = createTheme();

export default function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
             
             
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}