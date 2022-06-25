
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllUserApi,deleteUserApi } from '../../services/userService';



class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allUser: [],
    };
  }
  async componentDidMount() {
   this.getAllUserFunc()
  }
  getAllUserFunc=async()=>{
    let res = await getAllUserApi('ALL');
    if (res && res.errCode === 0) {
      this.setState({ allUser: res.userData });
    }
  }

  handleDelete= async(user)=>{
    console.log('delete',user);
    try {
      var u=await deleteUserApi(user.id);
      if(u&&u.errCode===0){
      await  this.getAllUserFunc()
      }else{
        alert(u.errMessage);
      }
    } catch (error) {
      console.log(error);
    }
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
                  <th>Id</th>
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
                          <td>{item.id}</td>
                          <td>{item.fullName}</td>
                          <td>{item.email}</td>
                          <td>{item.address}</td>
                          <td>{item.phoneNumber}</td>
                          <td>
                            <button className="button is-primary mr-2 has-text-white ">
                              <span className="icon is-small">
                                <i class="fas fa-pen-fancy"></i>
                              </span>
                            </button>
                            <button className="button is-danger " onClick={()=>this.handleDelete(item)}>
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
          
          </div>
        </div>
  
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
