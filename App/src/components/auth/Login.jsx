import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { InputAdornment, FormControl, InputLabel, IconButton } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Visibility, VisibilityOff } from '@/mui-import ';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
// import {useDispatch, useSelector} from 'react-redux';
// import {login,logout}from '../../redux/slice/authSlice'
const theme = createTheme();

export default function Login() {

  const initState = {
    email: '',
    password: '',
    errMessage: '',
  };
  // const dispath=useDispatch()
  // const auth=useSelector((state)=>state.auth.initState)

  const [user, setUser] = React.useState(initState);
  const { email, password } = user;
  const [showPass, setShowPass] = React.useState(false);
  function handleInputChange(e) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }
  const handleShowpass = () => {
    setShowPass(!showPass);
  };
  const handleLogin = async () => {
    try {
      let data = await axios.post('http://localhost:3920/api/login', email, password);
      if (data && data.errCode !== 0) {
        setUser({ errMessage: data.message });
      }
    } catch (e) {
      console.log(e);
    }
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
            backgroundImage:
              'url(https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)',
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
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={handleInputChange}
              />

              <TextField
                label="Password"
                fullWidth
                required
                margin="normal"
                autoComplete="current-password"
                id="password"
                name="password"
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={handleInputChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton onClick={handleShowpass}>
                        {showPass ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                // onClick={ dispath(login(email,password))}
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
