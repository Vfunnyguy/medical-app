import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
class HeaderHome extends Component {
  
  render() {
    return (
      <nav className="navbar is-info ">
        <div className="navbar-brand">


            <Link to="/home" className="navbar-item">
            <i className="fas fa-medkit is-medium fs-18 mr-2 "></i>
            <span className='is-uppercase fs-18'>Medical Booking</span>
            </Link>
          <span
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </span>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link className="navbar-item fw-medium">Chuyên khoa</Link>

            <Link className="navbar-item fw-medium">Cơ sở y tế</Link>
            <Link className="navbar-item fw-medium">Bác Sĩ</Link>
            <Link className="navbar-item fw-medium">Gói Khám</Link>

            {/*  */}
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="control has-icons-left">
              <input className="input" type="text" placeholder="Tìm Kiếm" />
               <span className='icon is-small is-left'>
               <i className="fas fa-search    "></i>
               </span>
              </div>
            </div>
           
          </div>
        </div>
      </nav>
    );
  }
}
const mapStateToProps = (state) => {
  return {
        isLoggedIn: state.user.isLoggedIn,
        
       language: state.app.language,
  };
};
const masDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, masDispatchToProps)(HeaderHome);
