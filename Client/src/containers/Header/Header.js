import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';


class Header extends Component {

    render() {
        const { processLogout,userInfo } = this.props;
        return (
            <aside className="menu  fs-18 is-fullheight p3">
                {/* thanh navigator */}
                <ul className="menu-list">
                    <Navigator menus={adminMenu} />
                </ul>

                {/* nút logout */}
                <div className=" mt-3 mr-2 bg-active is-rounded" >
                <span className='mr-2 menu-item '>
                hello {userInfo&&userInfo.fullName?userInfo.fullName:''}
                </span>
                    <i className="fas fa-sign-out-alt"style={{fontSize:'18px'}}onClick={processLogout}></i>
                </div>
            </aside>
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
