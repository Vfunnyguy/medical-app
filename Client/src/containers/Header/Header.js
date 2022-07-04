import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu,doctorMenu } from './menuApp';


class Header extends Component {
    constructor(props){
        super(props)
        this.state={
            menuApp:[]
        }
    }
    componentDidMount(){
        let {userInfo}=this.props
        let menu=[]
        
            let role=userInfo.roleID
            console.log(role);
            if(role==='R1'){

              menu=adminMenu
            }
            if(role==='R2'){
                menu=doctorMenu
            }
        
        this.setState({menuApp:menu})
    }
    render() {
        const { processLogout,userInfo } = this.props;
        console.log(this.state);
        return (
            <aside className="menu  fs-18 is-fullheight p3">
                {/* thanh navigator */}
                <ul className="menu-list">
                    <Navigator menus={this.state.menuApp} />
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
