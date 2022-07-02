import React, { Component } from 'react';
import { connect } from 'react-redux';
import Banner from '../components/banner/banner';
import Carousel from '../components/carousel';
import HeaderHome from '../components/Home/headerHome';
class HomePage extends Component {
  render() {
    return (
      <div className="home-page ">
        <HeaderHome />
        <Banner />
        <div className="home-page-content mg-large container">
          <Carousel />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
