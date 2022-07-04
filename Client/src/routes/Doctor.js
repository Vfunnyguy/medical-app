import React ,{Component}from 'react'
import{ connect }from 'react-redux'
import {Redirect,Route,Switch}from 'react-router-dom'
import ManageSchedule from '../components/Doctor/manageSchedule'
import Header from '../containers/Header/Header'
class DocRoutes extends Component{
    render(){
        const { isLoggedIn}=this.props
        return(
            <div className='columns'>
               <span className='column is-2'>
               
                {isLoggedIn&& <Header/>}
               </span>
                <div className="section column">
                <Switch>
                <Route path='/doctor/manage-schedule' component={ManageSchedule}/>
                </Switch>
                </div>
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
         isLoggedIn: state.user.isLoggedIn,
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(DocRoutes)