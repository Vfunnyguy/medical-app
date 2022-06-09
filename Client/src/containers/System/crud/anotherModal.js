import React, { useState, useEffect, useCallback } from 'react';
import { createUserApi, getCodeApi } from '../../../services/userService';
const ModalNew = () => {
  const initState = {
    Fname: '',
    email: '',
    phone: '',
    password: '',
    gender: [],
  };
  const [createUser, setCreateUser] = useState(initState);
  //   const dispatch = useDispatch();
  var [showPass, setShowPass] = useState(false);
  function handleChangeInput(e, id) {
    setCreateUser({ ...createUser, [id]: e.target.value });
  }
  function checkValidInput() {
    let isValid = true;
    var arrInput = ['Fname', 'email', 'phone', 'password'];
    for (let i = 0; i < arrInput.length; i++) {
      if (createUser[arrInput[i]] === '') {
        isValid = false;
        alert(`Please input ${arrInput[i]} field`);
        break;
      }
    }
    return isValid;
  }
  async function handleAddNewUser(e) {
    e.preventDefault();
    let hasData = checkValidInput();
    if (hasData) {
      try {
        let result = await createUserApi(createUser);
        if (result && result.errCode !== 0) {
          alert(result.message);
        } else {
          alert('Create user success');
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  

  return (
    <div className="crud-modal">
      <div className="columns">
        <div className="column">
          <div className="field">
            <label className="label" for="Fname">
              Full Name
            </label>
            <div className="control has-icons-left">
              <input
                className="input"
                type="text"
                placeholder="Insert Name"
                name="Fname"
                value={createUser.Fname}
                onChange={(e) => handleChangeInput(e, 'Fname')}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
            </div>
          </div>

          <div className="field">
            <label className="label">Email</label>
            <div className="control has-icons-left has-icons-right">
              <input
                className="input"
                type="email"
                placeholder="Insert Email"
                name="email"
                value={createUser.email}
                onChange={(e) => handleChangeInput(e, 'email')}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label">Phone Number</label>
            <div className="control has-icons-left">
              <input
                className="input"
                type="number"
                placeholder="Insert Number"
                name="phone"
                min="10"
                value={createUser.phone}
                onChange={(e) => handleChangeInput(e, 'phone')}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-mobile"></i>
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label">Chức vụ</label>
            <div className="control">
              <div className="select">
                <select>
                  <option>Admin</option>
                  <option>Doctor</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label className="label">Address</label>
            <div className="control has-icons-left">
              <input
                className="input"
                type="text"
                placeholder="Insert Address"
                name="address"
                value={createUser.address}
                onChange={(e) => handleChangeInput(e, 'address')}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-address-book"></i>
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control has-icons-left has-icons-right">
              <input
                className="input"
                type={showPass ? 'text' : 'password'}
                placeholder="Insert Password"
                name="password"
                value={createUser.password}
                onChange={(e) => handleChangeInput(e, 'password')}
              />

              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
              <span className="icon is-small is-right" onClick={() => setShowPass(!showPass)}>
                {showPass ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label">Giới tính</label>
            <div className="control">
              <div className="select">
                <select>
                  <option>Admin</option>
                  <option>Doctor</option>
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <span className="label">Avatar</span>

            <label className="file-label">
              <input className="file-input" type="file" name="avatar" />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">Choose a file…</span>
              </span>
            </label>
          </div>
        </div>
      </div>
      <div className="field is-centered center">
        <div className="control">
          <button className="button is-primary w100" onClick={handleAddNewUser}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalNew;
