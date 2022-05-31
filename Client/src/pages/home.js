import React,{Component} from "react";
import {connect} from 'react-redux';
import HeaderHome from "../components/Home/headerHome";
class HomePage extends Component{
    render(){
        return(
            <div className="home-page ">
                <HeaderHome/>
                <div className="home-page-content mg-large container">
                 dasd

                
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
return{
        isLoggedIn: state.user.isLoggedIn

}
}
const mapDispatchToProps = dispatch => {
    return{

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
