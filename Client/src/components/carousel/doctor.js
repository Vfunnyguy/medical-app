import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Slider from 'react-slick';

class Doctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorArr: [],
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.topDoctorRd !== this.props.topDoctorRd) {
      this.setState({
        doctorArr: this.props.topDoctorRd,
      });
    }
  }
  componentDidMount() {
    this.props.loadTopDoctor();
  }
  render() {
    let topDoctors = this.state.doctorArr;
    return (
    // topDoctors=topDoctors.concat(topDoctors)
      <div className="columns">
    
     
        {
        topDoctors &&
          topDoctors.map((doctor, index) => {
            let img64 = '';
            if (doctor.image) {
              img64 = new Buffer(doctor.image, 'base64').toString('binary');
            }
            let docName = `${doctor.positionData.value_vi}, ${doctor.fullName}`;
            return (
              <div className="column" key={index}>
              {/* <Slider>
              
              </Slider> */}
                <div className="card_doctor ">
                  <div className="cover">
                    <img src={img64} alt="" />
                  </div>
                  <div className="descrip">
                    <p className="doc-name is-capitalized">{docName}</p>
                  </div>
                </div>
              </div>
            );
          })}
   
     
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    topDoctorRd: state.admin.topDoctor,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctor: () => dispatch(actions.getTopDoctor()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Doctor);

   