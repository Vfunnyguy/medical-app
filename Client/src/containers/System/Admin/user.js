import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../../store/actions/index';
import LightBox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      roleArr: [],
      positionArr: [],
      previewImgUrl: '',
      isOpen: false,
      email:'',
      password: '',
      fullName: '',
      phoneNumber: '',
      address: '',
      gender: '',
      position: '',
      role: '',
      avatar: '',
    };
  }
  async componentDidMount() {
    this.props.getGender();
    this.props.getRole();
    this.props.getPosition();
    this.props.createNewUser()
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderNew !== this.props.genderNew) {
      var genderValue=this.props.genderNew
      this.setState({
        genderArr: genderValue,
        gender:genderValue&&genderValue.length>0?genderValue[0].key:''
      });
    }
    if (prevProps.roleNew !== this.props.roleNew) {
      let roleValue=this.props.roleNew
      this.setState({
        roleArr: roleValue,
        role:roleValue&&roleValue.length>0?roleValue[0].key:''
      });
    }
    if (prevProps.positionNew !== this.props.positionNew) {
      const positionValue=this.props.positionNew
      this.setState({
        positionArr: positionValue,
        position:positionValue&&positionValue.length>0?positionValue[0].key:''
      });
    }
  }
  handleOnchangeImg = (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let objUrl = URL.createObjectURL(file);
      this.setState({
        previewImgUrl: objUrl,
        avatar: file,
      });
    }
  };
  openPreviewImg = () => {
    if (this.state.previewImg) return;
    this.setState({
      isOpen: true,
    });
  };
  handleSaveUser=()=>{
   let isValid=this.checkValid()
   if(isValid===false)return
   this.props.createNewUser({
    email: this.state.email,
    password: this.state.password,
    fullName: this.state.fullName,
    phoneNumber: this.state.phoneNumber,
    address: this.state.address,
    gender:this.state.gender,
    roleID:this.state.role,
    positionID:this.state.position
   })
  }
  checkValid=()=>{
    let isValid=true;
    var checkArr=['email','password','fullName','phoneNumber','address']
    for (let i=0;i<checkArr.length;i++){
        if(this.state[checkArr[i]]===''){
            isValid=false
            alert('Please fill in the blank',checkArr[i])
            break
        }
    }
    return isValid
  }
  onChangeInput=(e,id)=>{
   let newState=[...this.state]
   newState[id]=e.target.value
    this.setState({...newState})
  }
  render() {
    let genders = this.state.genderArr;
    let roles = this.state.roleArr;
    let positions = this.state.positionArr;
    let isGetGender = this.props.isLoadGender;
    let {email,password,fullName,phoneNumber,address,gender,role,position,avatar}=this.state
    return (
      <div className="crud-modal">
        <div className="columns">
          <div className="column">
            <h1>{isGetGender === true ? 'Loading' : ''}</h1>
            <div className="field">
              <label className="label" htmlFor="Fname">
                Full Name
              </label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="text"
                  placeholder="Insert Name"
                  name="Fname"
                  value={fullName}
                  onChange={(e) => this.onChangeInput(e, 'Fname')}
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
                  value={email}
                  onChange={(e) => this.onChangeInput(e, 'email')}
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
                  value={phoneNumber}
                  onChange={(e) => this.onChangeInput(e, 'phone')}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-mobile"></i>
                </span>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <div className="field">
                  <label className="label">Vai trò</label>
                  <div className="control">
                    <div className="select">
                      <select onChange={(e)=>this.onChangeInput(e,'role')}>
                        {roles &&
                          roles.length > 0 &&
                          roles.map((item, index) => {
                            return <option key={index} value={item.key}>{item.value_vi}</option>;
                          })}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="field">
                  <label className="label">Giới tính</label>
                  <div className="control">
                    <div className="select">
                      <select onChange={(e)=>this.onChangeInput(e,'gender')}>
                        {genders &&
                          genders.length > 0 &&
                          genders.map((item, index) => {
                            return <option key={index} value={item.key}>{item.value_vi}</option>;
                          })}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="field">
                  <label className="label">Chức vụ</label>
                  <div className="control">
                    <div className="select">
                      <select onChange={(e)=>this.onChangeInput(e,'position')}>
                        {positions &&
                          positions.length > 0 &&
                          positions.map((item, index) => {
                            return <option key={index} value={item.key}>{item.value_vi}</option>;
                          })}
                      </select>
                    </div>
                  </div>
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
                  value={address}
                  onChange={(e) => this.onChangeInput(e, 'address')}
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
                  placeholder="Insert Password"
                  name="password"
                  value={password}
                  onChange={(e) => this.onChangeInput(e, 'password')}
                />

                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </div>
            </div>
            <div className="columns">
              <div className="column"></div>
              <div className="column"></div>
            </div>
            <div className="columns">
              <div className="column">
                <div className="field">
                  <span className="label">Avatar</span>

                  <label className="file-label">
                    <input
                      className="file-input"
                      type="file"
                      name="avatar"
                      hidden
                      onChange={(e) => this.handleOnchangeImg(e)}
                    />
                    <span className="file-cta">
                      <span className="file-icon">
                        <i className="fas fa-upload"></i>
                      </span>
                      <span className="file-label">Choose a file…</span>
                    </span>
                  </label>
                </div>
              </div>
              <div className="column  box" onClick={(e) => this.openPreviewImg(e)}>
                <img src={this.state.previewImgUrl} alt="preview" className="image is-96x96" />
              </div>
            </div>
          </div>
        </div>
        <div className="field is-centered center">
          <div className="control">
            <button className="button is-primary w100" onClick={()=>this.handleSaveUser()}>Thêm người dùng</button>
          </div>
        </div>
        {this.state.isOpen === true && (
          <LightBox
            mainSrc={this.state.previewImgUrl}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    genderNew: state.admin.genders,
    roleNew: state.admin.roles,
    positionNew: state.admin.positions,
    isLoadGender: state.admin.isLoadGender,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getGender: () => dispatch(action.genderStart()),
    getRole: () => dispatch(action.roleStart()),
    getPosition: () => dispatch(action.posStart()),
    createNewUser:(data)=>dispatch(action.createNewUser(data))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
