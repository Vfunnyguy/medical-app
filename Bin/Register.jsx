import React from 'react';
import { useDispatch } from 'react-redux';
const Register = () => {
  const initState = {
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
  };
  const [userRegister, setUserRegister] = React.useState(initState);
  const {name,email,phone,address,password} = userRegister;
  function handleChangeInput(e) {
    setUserRegister({ ...userRegister, [e.target.name]: e.target.value });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userRegister);
  }

  const [typePass, setTypePass] = React.useState(false);
  return (
    <div className="register-page">
      <form action="#">
        <div className="row">
          <div className="col">
            <div className="input-field">
              <input
                type="text"
                required
                id="account"
                name="name"
                //   value={account}
                onChange={handleChangeInput}
              />
              <label>Full Name</label>
            </div>

            <div className="input-field">
              <input
                type="text"
                required
                id="account"
                name="address"
                //   value={account}
                onChange={handleChangeInput}
              />
              <label>Địa chỉ</label>
            </div>
          </div>
          <div className="col">
            {' '}
            <div className="input-field">
              <input
                type="text"
                required
                id="account"
                name="phone"
                //   value={account}
                onChange={handleChangeInput}
              />
              <label>Phone</label>
            </div>
            <div className="input-field">
              <input
                type="email"
                required
                id="account"
                name="email"
                //   value={account}
                onChange={handleChangeInput}
              />
              <label>Email</label>
            </div>
            <div className="input-field">
              <input
                className="pswrd"
                type={typePass ? 'text' : 'password'}
                required
                id="password"
                name="password"
                //   value={password}
                onChange={handleChangeInput}
              />
              <div className="lock-ico">
                <small onClick={() => setTypePass(!typePass)}>
                  {typePass ? (
                    <i className="fas fa-eye show_pass"></i>
                  ) : (
                    <i className="fas fa-eye-slash show_pass"></i>
                  )}
                </small>
              </div>

              <label>Mật Khẩu</label>
            </div>
          </div>
        </div>

        <div className="button">
          <button className="btn-login" type="submit">
            Đăng Ký
          </button>
          <input type="submit" style={{ display: 'none' }} />
        </div>
      </form>
    </div>
  );
};

export default Register;
