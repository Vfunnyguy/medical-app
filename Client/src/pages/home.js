import React,{Component} from "react";
import {connect} from 'react-redux';
import HeaderHome from "../components/Home/headerHome";
import Banner from "../components/banner/banner";
class HomePage extends Component{

    render(){
       
        return(
            <div className="home-page ">
                <HeaderHome/>
                <Banner/>
                <div className="home-page-content mg-large container">
               {/* <img src={banner_img}alt='banenr'/> */}
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
