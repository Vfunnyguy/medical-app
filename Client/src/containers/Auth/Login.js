import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
// import * as actions from "../store/actions";
import * as actions from '../../store/actions';
import { wel_img } from '../../utils/img';

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
  };

  render() {
    return (
      <div className="login-page  ">
        <div className="columns is-vcentered">
          <div className="login column is-4 ">
            <section className="section">
              <div className="has-text-centered">
                <span className="is-uppercase title a1">Login</span>
              </div>

              <div className="field">
                <label className="label">Username</label>
                <div className="control has-icons-right">
                  <input
                    className="input"
                    type="text"
                    placeholder="Insert your email"
                    value={this.state.username}
                    onChange={(e) => this.handleOnChangeUserName(e)}
                  />
                  <span className="icon is-small is-right">
                    <i className="fa fa-user"></i>
                  </span>
                </div>
              </div>

              <div className="field">
                <label className="label">Password</label>
                <div className="control has-icons-right">
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
              <div className="has-text-centered">
                <button
                  className="button is-vcentered is-info is-outlined w100 fw-bold "
                  onClick={() => this.handleLogin()}
                >
                  Login
                </button>
              </div>
            </section>
          </div>
          <div className="interactive-bg column is-8">
            <img className="login-logo" src={wel_img} alt="login_img" />
          </div>
        </div>
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
