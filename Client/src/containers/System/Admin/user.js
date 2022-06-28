import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../../store/actions/index';
import LightBox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import UserTable from './userTable';
import { crud_action,CommonUtils} from '../../../utils';
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      roleArr: [],
      positionArr: [],
      previewImgUrl: '',
      isOpen: false,
      email: '',
      password: '',
      fullName: '',
      phone: '',
      address: '',
      gender: '',
      position: '',
      role: '',
      avatar: '',
      action: '',
      editUserID: '',
    };
  }
  async componentDidMount() {
    this.props.getGender();
    this.props.getRole();
    this.props.getPosition();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderNew !== this.props.genderNew) {
      var genderValue = this.props.genderNew;
      this.setState({
        genderArr: genderValue,
        gender: genderValue && genderValue.length > 0 ? genderValue[0].keyMap : '',
      });
    }
    if (prevProps.roleNew !== this.props.roleNew) {
      let roleValue = this.props.roleNew;
      this.setState({
        roleArr: roleValue,
        role: roleValue && roleValue.length > 0 ? roleValue[0].keyMap : '',
      });
    }
    if (prevProps.positionNew !== this.props.positionNew) {
      let positionValue = this.props.positionNew;
      this.setState({
        positionArr: positionValue,
        position: positionValue && positionValue.length > 0 ? positionValue[0].keyMap : '',
      });
    }
    if (prevProps.userList !== this.props.userList) {
      var genderA = this.props.genderNew;
      var roleA = this.props.roleNew;
      var positionA = this.props.positionNew;
      this.setState({
        email: '',
        password: '',
        fullName: '',
        phone: '',
        address: '',
        gender: genderA && genderA.length > 0 ? genderA[0].keyMap : '',
        position: roleA && roleA.length > 0 ? roleA[0].keyMap : '',
        role: positionA && positionA.length > 0 ? positionA[0].keyMap : '',
        avatar: '',
        action: crud_action.create,
        previewImgUrl:''
      });
    }
  }
  handleOnchangeImg = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let base64=await CommonUtils.getBase64(file);
      let objUrl = URL.createObjectURL(file);
      this.setState({
        previewImgUrl: objUrl,
        avatar: base64,
      });
    }
  };
  openPreviewImg = () => {
    if (this.state.previewImg) return;
    this.setState({
      isOpen: true,
    });
  };
  handleSaveUser = () => {
    let isValid = this.checkValid();
    if (isValid === false) return;
    let { action } = this.state;
    if (action === crud_action.create) {
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        fullName: this.state.fullName,
        phone: this.state.phone,
        address: this.state.address,
        gender: this.state.gender,
        roleID: this.state.role,
        positionID: this.state.position,
        avatar: this.state.avatar,
      });
    }
    if (action === crud_action.edit) {
      this.props.editUser({
        email: this.state.email,
        password: this.state.password,
        fullName: this.state.fullName,
        phone: this.state.phone,
        address: this.state.address,
        gender: this.state.gender,
        roleID: this.state.role,
        positionID: this.state.position,
        avatar:this.state.avatar
      });
    }
  };
  checkValid = () => {
    let isValid = true;
    var checkArr = ['email', 'password', 'fullName', 'phoneNumber', 'address'];
    for (let i = 0; i < checkArr.length; i++) {
      if (this.state[checkArr[i]] === '') {
        isValid = false;
        alert('Please fill in the blank', checkArr[i]);
        break;
      }
    }
    return isValid;
  };
  onChangeInput = (e, id) => {
    let newState = { ...this.state };
    newState[id] = e.target.value;
    this.setState({ ...newState });
  };
  handleEditUser = (user) => {
    let imgBase64='';
    if(user.image){
      imgBase64=new Buffer(user.image, 'base64').toString('binary');
    }
    this.setState({
      email: user.email,
      password: '....',
      fullName: user.fullName,
      phone: user.phone,
      address: user.address,
      role: user.roleID,
      gender: user.gender,
      position: user.positionID,
      avatar: '',
      action: crud_action.edit,
      editUserID: user.id,
      previewImgUrl:imgBase64

    });
  };
  render() {
    let genders = this.state.genderArr;
    let roles = this.state.roleArr;
    let positions = this.state.positionArr;
    let isGetGender = this.props.isLoadGender;
    let { email, password, fullName, phone, address, gender, role, position } = this.state;
    return (
      <>
        <div className="box is-rounded">
          <div className="columns">
            <div className="column">
              <h1>{isGetGender === true ? 'Loading' : ''}</h1>
              <div className="field">
                <label className="label">Họ & Tên</label>
                <div className="control has-icons-left">
                  <input
                    className="input"
                    type="text"
                    placeholder="Insert Name"
                    value={fullName}
                    onChange={(e) => this.onChangeInput(e, 'fullName')}
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
                    value={email}
                    onChange={(e) => this.onChangeInput(e, 'email')}
                    disabled={this.state.action === crud_action.edit ? true : false}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                </div>
              </div>
              <div className="field">
                <label className="label">Số điện thoại</label>
                <div className="control has-icons-left">
                  <input
                    className="input"
                    type="number"
                    placeholder="Insert Number"
                    min="10"
                    value={phone}
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
                        <select onChange={(e) => this.onChangeInput(e, 'role')} value={role}>
                          {roles &&
                            roles.length > 0 &&
                            roles.map((item, index) => {
                              return (
                                <option key={index} value={item.keyMap}>
                                  {item.value_vi}
                                </option>
                              );
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
                        <select onChange={(e) => this.onChangeInput(e, 'gender')} value={gender}>
                          {genders &&
                            genders.length > 0 &&
                            genders.map((item, index) => {
                              return (
                                <option key={index} value={item.keyMap}>
                                  {item.value_vi}
                                </option>
                              );
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
                        <select
                          onChange={(e) => this.onChangeInput(e, 'position')}
                          value={position}
                        >
                          {positions &&
                            positions.length > 0 &&
                            positions.map((item, index) => {
                              return (
                                <option key={index} value={item.keyMap}>
                                  {item.value_vi}
                                </option>
                              );
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
                <label className="label">Địa chỉ</label>
                <div className="control has-icons-left">
                  <input
                    className="input"
                    type="text"
                    placeholder="Insert Address"
                    value={address}
                    onChange={(e) => this.onChangeInput(e, 'address')}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-address-book"></i>
                  </span>
                </div>
              </div>
              <div className="field">
                <label className="label">Mật khẩu</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    placeholder="Insert Password"
                    type="password"
                    value={password}
                    disabled={this.state.action === crud_action.edit ? true : false}
                    onChange={(e) => {
                      this.onChangeInput(e, 'password');
                    }}
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
                    <span className="label">Ảnh đại diện</span>

                    <label className="file-label">
                      <input
                        className="file-input"
                        type="file"
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
              <button
                className={`button ${
                  this.state.action !== crud_action.edit ? 'is-primary' : 'is-info'
                } w100`}
                onClick={() => this.handleSaveUser()}
              >
                {this.state.action === crud_action.edit ? 'Cập nhập' : 'Thêm mới'}
              </button>
            </div>
          </div>
          <input hidden value={this.state.editUserID}/>
          {this.state.isOpen === true && (
            <LightBox
              mainSrc={this.state.previewImgUrl}
              onCloseRequest={() => this.setState({ isOpen: false })}
            />
          )}
        </div>

        <UserTable handleEditUser={this.handleEditUser}  />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    genderNew: state.admin.genders,
    roleNew: state.admin.roles,
    positionNew: state.admin.positions,
    isLoadGender: state.admin.isLoadGender,
    userList: state.admin.users,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getGender: () => dispatch(action.genderStart()),
    getRole: () => dispatch(action.roleStart()),
    getPosition: () => dispatch(action.posStart()),
    createNewUser: (data) => dispatch(action.createNewUser(data)),
    editUser: (data) => dispatch(action.editUser(data)),
    getUserRedux: () => dispatch(action.getUserStart()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
