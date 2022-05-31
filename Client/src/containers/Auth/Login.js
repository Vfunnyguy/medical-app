import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
// import * as actions from "../store/actions";
import * as actions from '../../store/actions';
import { wel_img } from '../../utils/img';
import { FormattedMessage } from "react-intl";
// import { userService } from '../../services/userService';
import { handleLoginApi } from '../../services/userService';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      showPassword: false,
      errMessage: '',
    };
  }

  handleOnChangeUserName = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  handleOnChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleLogin = async () => {
    this.setState({
      errMessage: '',
    });
    try {
      let data = await handleLoginApi(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
        console.log('login success');
      }
    } catch (e) {
      if (e.response) {
        if (e.response.data) {
          this.setState({
            errMessage: e.response.data.message,
          });
        }
      }
      console.log('error message', e.response);
    }
  };

  handleShowHidePassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
    // console.log(this.state.showPassword);
  };

  render() {
    return (
      <div className="login-page  ">
        <section className="columns is-vertical">
          <div className="column login-page__form pt-5">
            <div className="box mgt-medium">
              <span className="center">
                <h1 className="title"> Login</h1>
              </span>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Insert your email"
                    value={this.state.username}
                    onChange={(e) => this.handleOnChangeUserName(e)}
                  />
                </div>
               
              </div>

              <div className="field ">
                <label className="label">Password</label>
                <div className="control has-icons-right ">
                  <input
                    className="input"
                    placeholder="Insert your pasword"
                    type={this.state.showPassword ? 'text' : 'password'}
                    value={this.state.password}
                    onChange={(e) => this.handleOnChangePassword(e)}
                  />
                  <span
                    className=" login-page__pass icon is-small is-right  "
                    style={{ pointerEvent: 'auto' }}
                    onClick={() => this.handleShowHidePassword()}
                  >
                    <i
                      className={this.state.showPassword ? 'fas fa-eye ' : 'fas fa-eye-slash '}
                    ></i>
                  </span>
                </div>
                 <p class="help is-danger"> {this.state.errMessage}</p>
              </div>
              <div className="center">
                <button onClick={() => this.handleLogin()} className="button is-info w100"style={{fontWeight:700,fontSize:'20px'}}>
                  Sign in
                </button>
              </div>
            </div>
          </div>
          <div className="column is-hidden-mobile">
            <img src={wel_img} alt="welcome img" />
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
