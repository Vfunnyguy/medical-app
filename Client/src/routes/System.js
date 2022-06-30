import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import AddNewUser from '../containers/System/AddNewUser';
import DocInfo from '../containers/System/crudDoc';
import Header from '../containers/Header/Header';
class System extends Component {
  render() {
    const { systemMenuPath, isLoggedIn } = this.props;
    return (
      <Fragment>
        <div className="columns is-fullheight">
          <div className="column is-2">{isLoggedIn && <Header />}</div>
          <div className="column">
            <Switch>
              <Route path="/system/user-manage" component={UserManage} />
  
              <Route path="/system/user-crud" component={AddNewUser} />
              <Route path="/system/user-crud-doc" component={DocInfo} />
              <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />;
                }}
              />
            </Switch>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
