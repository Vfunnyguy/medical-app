import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
const Login = () => {
  const initState = { email: '', password: '' };
  const [userLogin, setUserLogin] = useState(initState);
  const { email, password } = userLogin;
  const handleChange = (e) => {
     setUserLogin({...userLogin,[e.target.name]:e.target.value}) 
  };
  // const dispatch = useDispatch();
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(userLogin);
  }
  const [typePass, setTypePass] = useState(false);
  return (
    <div className="login-page">
     <div className="login-page_title">
     Login
     </div>
      <form action="#" onSubmit={handleSubmit}>
     
        <div className="input-field">
          <input
            type="email"
            required
            id="account"
            name="email"
            // value={email}
            onChange={handleChange}
          />
          <label> Email</label>
        </div>
        <div className="input-field">
          <input
            className="pswrd"
            type={typePass ? 'text' : 'password'}
            required
            id="password"
            name="password"
            // value={password}
            onChange={handleChange}
          />
          <div className="lock-ico">
            <small onClick={() => setTypePass(!typePass)}>
              {typePass ? (
                <i className="fas fa-eye-slash show_pass"></i>
              ) : (
                <i className="fas fa-eye show_pass"></i>
              )}
            </small>
          </div>

          <label>Mật Khẩu</label>
        </div>

        <div className="button">
          <button type="submit" className="btn-login">
            Đăng Nhập
          </button>

          <input type="submit" style={{ display: 'none' }} />
        </div>
      </form>
    </div>
  );
};

export default Login;
