import React, { Component } from "react";
import { connect } from 'react-redux'
import DatePicker from "../Input/DatePicker";
import {getPatientList}from '../../services/userService'
import moment from "moment";
class ManagePatient extends Component {
    constructor(props) {
        super(props)
        this.state = {
          currentDate:moment(new Date()).startOf('day').valueOf(),
          patientData:[]
        }
    }
    async componentDidMount(){
        let {user}=this.props
        let {currentDate}=this.state
        let formatDate=new Date(currentDate).getTime()
        this.getPatientData(user,formatDate)
    }
    getPatientData=async(user,formatDate)=>{
        let res=await getPatientList({
            docID:user.id,
            date:formatDate
        })
        console.log(res);
        if(res&&res.errCode===0){
            this.setState({
                patientData:res.data
            })
        }
    }
    handleChangeDate=(date)=>{
     this.setState({
        currentDate:date[0]
     },()=>{
        let {user}=this.props
        let {currentDate}=this.state
        let formatDate=new Date(currentDate).getTime()
        this.getPatientData(user,formatDate)
     })
    }
    render() {
        console.log(this.state);
        let {patientData}=this.state
        return (
            <section>
            <div className="center title is-3 is-uppercase">Quản lý lịch khám bệnh nhân</div>
            <h2 className="title">Chọn ngày khám</h2>
            <DatePicker
            onChange={this.handleChangeDate}
            value={this.state.currentDate}
            className='control'
            />
             <div className="box mt-4">
        <table className="table is-bordered is-fullwidth is-hoverable ml-2">
          <thead>
            <tr style={{ background: '#00d1b2' }} className='has-text-centered '>
              <th className='text-white'>Họ&Tên</th>
              <th className='text-white'>Email</th>
              <th className='text-white'>Địa chỉ</th>
              <th className='text-white'>Số điện thoại</th>
              <th className='text-white'>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {patientData &&patientData.length>0&&
              patientData.map((item, index) => {
                return (
                  <tr key={index} >
                    <td hidden>{item.id}</td>
                    <td>{item.fullName}</td>
                    <td>{item.email}</td>
                    <td>{item.address}</td>
                    <td>{item.phoneNumber}</td>
                   
                    <td  className='is-centered'>
                      <button className="button is-primary mr-2 has-text-white " >
                        <span className="icon is-small">
                          <i className="fas fa-pen-fancy"></i>
                        </span>
                      </button>
                      <button className="button is-danger " >
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
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
     user:state.user.userInfo
    }
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient)