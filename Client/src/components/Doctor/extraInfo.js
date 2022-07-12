import React,{Component} from "react";
import { connect, Connect } from "react-redux";
import {getScheduleByDate} from '../../services/userService'
class DocextraInfo extends Component{
    constructor(props){
        super(props)
        this.state={
            isShow:false
        }
    }
    async componentDidUpdate(prevProps){
     
    }
    showHideInfo=(status)=>{
        this.setState({
            isShow:status
        })
    }
    render(){
        let{isShowInfo}=this.state
        return(
            <>
            <div className="card">
                <div className="card-header">
                 <span className="card-header-title">Địa chỉ</span>
                 <span className="card-header-icon">
                    
                abc,abcd,vn
                </span>   
                </div>
                <div className="card-content">
                    <span className="fw-bold is-4">Giá khám</span><br/>

                    30500
                </div>
            </div>
            </>
        )
    }
}
const mapStateToProps=(state)=>{
    return {

    }
}
const mapDispatchToProps=(dispatch)=>{
    return{

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(DocextraInfo)