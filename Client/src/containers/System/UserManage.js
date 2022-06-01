
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllUserApi } from '../../services/userService';
// import Modal from './crud/modal';
// import CrudForm from './crud/crudForm';
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allUser: [],
    };
  }
  async componentDidMount() {
    let res = await getAllUserApi('ALL');
    if (res && res.errCode === 0) {
      this.setState({ allUser: res.userData });
    }
    console.log(res);
  }

  render() {
    let allUser = this.state.allUser;
    return (
      <div className="manage__user-page ">
      
        <div className="container has-text-centered">
          <div className="columns is-mobile is-centered">
            <div className="column is-8">
              <div>
                <h1 className="title mt-5">Users Manage</h1>
                <hr />
              </div>
              <table className="table is-bordered is-fullwidth is-hoverable ml-2">
                <thead>
                  <tr style={{ background: '#00d1b2', color: '#fff' }}>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Phone No.</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allUser &&
                    allUser.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.fullName}</td>
                          <td>{item.email}</td>
                          <td>{item.address}</td>
                          <td>{item.phoneNumber}</td>
                          <td>
                            <button className="button is-primary mr-2 ">
                              <span className="icon is-small">
                                <i class="fas fa-pen-fancy"></i>
                              </span>
                            </button>
                            <button className="button is-danger ">
                              <span className="icon is-small">
                                <i className="fas fa-trash-alt" />
                              </span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="column">
            <button className="button is-info has-icons-right">
              <span>Create new user</span>
              <span className=" ml-3 icon is-small icon-is-right">
                <i className="fas fa-plus-circle    "></i>
              </span>
            </button>
          </div>
        </div>
      {/* <CrudForm/> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
