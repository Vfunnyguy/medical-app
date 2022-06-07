import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';


class Header extends Component {

    render() {
        const { processLogout,userInfo } = this.props;
    console.log('userInfo',userInfo);
        return (
            <nav className="navbar fs-18 is-info">
                {/* thanh navigator */}
                <div className="navbar-item ">
                    <Navigator menus={adminMenu} />
                </div>

                {/* nút logout */}
                <div className="navbar-end  mt-3 mr-2" >
                <span className='mr-2'>
                hello {userInfo&&userInfo.fullName?userInfo.fullName:''}
                </span>
                    <i className="fas fa-sign-out-alt"style={{fontSize:'18px'}}onClick={processLogout}></i>
                </div>
            </nav>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo:state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
