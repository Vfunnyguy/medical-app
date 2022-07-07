import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import moment from 'moment';
import DatePicker from '../Input/DatePicker';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { crud_action, dateFormat } from '../../utils';
import * as action from '../../store/actions';
import { postbulkSchedule }from '../../services/userService'
class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctor: [],
      selectDoctor: '',
      currentDate: '',
      rangeTime: [],

    };
  }
  componentDidMount() {
    this.props.getAllDoc();
    this.props.getSchedule();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.allDoc !== this.props.allDoc) {
      let dataSelect = this.selectData(this.props.allDoc);
      this.setState({
        listDoctor: dataSelect,
      });
    }
    if (prevProps.allSchedule !== this.props.allSchedule) {
      var data = this.props.allSchedule
      if (data && data.length > 0) {
        data = data.map(item => ({ ...item, isSelected: false }))
      }
      this.setState({
        rangeTime: data
      });
    }
  }
  selectData = (data) => {
    let result = [];
    if (data && data.length > 0) {
      data.map((it, idx) => {
        let obj = {};
        obj.label = it.fullName;
        obj.value = it.id;
        return result.push(obj);
      });
    }
    return result;
  };
  handleChange = async (selectOption) => {
    this.setState({ selectDoctor: selectOption });
  };
  handleOndateChange = (date) => {
    this.setState({ currentDate: date[0] });
  };
  handleClickTime = (time) => {
    let { rangeTime } = this.state;
    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map(item => {
        if (item.id === time.id) item.isSelected = !item.isSelected;
        return item;
      })
      this.setState({ rangeTime: rangeTime })
    }
  }
  handleSaveSchedule = async () => {
    let { rangeTime, selectDoctor, currentDate } = this.state
    let result = []
    if (!currentDate) {
      toast.error('Chưa có ngày')
      return
    }
    if (selectDoctor && _.isEmpty(selectDoctor)) {
      toast.error('Chưa chọn bác sĩ')
      return;
    }
    let formatDate = new Date(currentDate).getTime()
    if (rangeTime && rangeTime.length > 0) {
      let selectTime = rangeTime.filter(item => item.isSelected === true)
      if (selectTime && selectTime.length > 0) {
        selectTime.map((sch, idx) => {
          let obj = {}
          obj.docID = selectDoctor.value
          obj.date = formatDate
          obj.timeType = sch.keyMap
          result.push(obj)
        })
      } else {
        toast.error('Chưa chọn giờ')
        return
      }
    }
    
    let res = await postbulkSchedule({
      arrSchedule:result,
      docID:selectDoctor.value,
      formatDate:formatDate
    })
    if(res&&res.errCode===0){
      toast.success('tạo thành công')
    }else{
      toast.error('Không thề tạo')
    }
    console.log(res);
 
    
  }
  render() {
    let { rangeTime } = this.state;
    let yesterday=new Date(new Date().setDate(new Date().getDate()-1))
    return (
      <div>
        <h1 className="title center">Manage Schedule</h1>
        <div className="box">
          <div className="columns">
            <div className="column">
              <p> Chọn bác sĩ</p>
              <Select
                value={this.state.selectDoctor}
                onChange={this.handleChange}
                options={this.state.listDoctor}
              />
            </div>
            <div className="column">
              <p>Chọn ngày</p>
              <DatePicker
                onChange={this.handleOndateChange}
                value={this.state.currentDate}
                minDate={yesterday}

              />
            </div>
          </div>
          <div className="columns is-multiline is-mobile">
            {rangeTime &&
              rangeTime.length > 0 &&
              rangeTime.map((it, idx) => {
                return (
                  <div className="column is-one-quarter" key={idx}>
                    <span className={`tag  is-large pointer ${it.isSelected === false ? 'is-info' : 'is-danger'}`} onClick={() => this.handleClickTime(it)}>{it.value_vi}</span>
                  </div>
                );
              })}
          </div>
          <button className="button is-primary" onClick={() => this.handleSaveSchedule()}>
            Lưu <i className="fas fa-save pl-2   "></i>
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    allDoc: state.admin.allDoctor,
    isLoggedIn: state.user.isLoggedIn,
    allSchedule: state.admin.allSchedule,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoc: () => dispatch(action.getAllDoctor()),
    getSchedule: () => dispatch(action.getSchedule()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
