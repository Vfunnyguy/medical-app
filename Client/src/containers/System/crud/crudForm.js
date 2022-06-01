import React, { Component } from 'react';
import { connect } from 'react-redux';
class CrudForm extends Component {
  render() {
    return (
      <>
        <div classNameName="columns">
          <div className="column">
            <div className="field">
              <label className="label" for="Fname">
                {' '}
                Full Name
              </label>
              <div className="control has-icons-left">
                <input className="input" type="text" placeholder="Insert Name" name="Fname" />
                <span className="icon is-small is-left">
                  <i className="fas fa-user"></i>
                </span>
              </div>
            </div>

            <div className="field">
              <label className="label">Email</label>
              <div className="control has-icons-left has-icons-right">
                <input className="input" type="email" placeholder="Insert Email" name="email" />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label">Phone Number</label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="number"
                  placeholder="Insert Number"
                  name="phone"
                  min="10"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-mobile"></i>
                </span>
              </div>
            </div>
            <div className="field">
              <label className="label">Address</label>
              <div className="control has-icons-left">
                <input className="input" type="text" placeholder="Insert Address" name="address" />
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
                  type="password"
                  placeholder="Insert Password"
                  name="password"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
                <span className="icon is-small is-right">
                  <i className="fas fa-eye"></i>
                </span>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label for="#" className="label">
                Avatar
              </label>
              <div className="control">
                <div className="file">
                  <label className="file-label">
                    <input className="file-input" type="file" name="image" />
                    <span className="file-cta">
                      <span className="file-icon">
                        <i className="fas fa-upload"></i>
                      </span>
                      <span className="file-label"> Choose a file… </span>
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">Gender</label>
              <div className="control">
                <label className="radio">
                  <input type="radio" name="gender" value="1" />
                  Male
                </label>
                <label className="radio">
                  <input type="radio" name="gender" value="0" />
                  Female
                </label>
              </div>
            </div>
            <div className="field" style={{marginTop:"26px"}}>
              <label className="label">Role</label>
              <div className="select">
                <select name="role">
                  <option value="1">Admin</option>
                  <option value="2">Doctor</option>
                  <option value="3">Patient</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="field is-centered">
          <div className="control">
            <button className="button is-link">Submit</button>
            <input type="submit" style="display: none;" />
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
        
       language: state.app.language,
  };
};
const mapDispatchToProps = (dispatch) => {
  return{};
};
export default connect(mapStateToProps, mapDispatchToProps)(CrudForm);
