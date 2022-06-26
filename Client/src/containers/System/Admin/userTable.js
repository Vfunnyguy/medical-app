import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../../store/actions/index';
class UserTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRedux: [],
    };
  }
  componentDidMount() {
    this.props.getUserRedux();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.userList !== this.props.userList) {
      this.setState({
        userRedux: this.props.userList,
      });
    }
  }
  handleDelete = (user) => {
    this.props.deleteUser(user.id);
  };
  handleEdit=(user)=>{
    this.props.handleEdit(user)
  }
  render() {
    let listUsers = this.state.userRedux;
    return (
      <div className="box">
        <table className="table is-bordered is-fullwidth is-hoverable ml-2">
          <thead>
            <tr style={{ background: '#00d1b2', color: '#fff' }}>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {listUsers &&listUsers.length>0&&
              listUsers.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.fullName}</td>
                    <td>{item.email}</td>
                    <td>{item.address}</td>
                    <td>{item.phoneNumber}</td>
                    <td>
                      <button className="button is-primary mr-2 has-text-white " onClick={()=>this.handleEdit(item)}>
                        <span className="icon is-small">
                          <i class="fas fa-pen-fancy"></i>
                        </span>
                      </button>
                      <button className="button is-danger " onClick={() => this.handleDelete(item)}>
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
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userList: state.admin.users,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUserRedux: () => dispatch(action.getUserStart()),
    deleteUser: (id) => dispatch(action.deleteUserStart(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserTable);
