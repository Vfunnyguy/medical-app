import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import moment from 'moment';
import DatePicker from '../Input/DatePicker';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { crud_action ,dateFormat} from '../../utils';
import * as action from '../../store/actions';
class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctor: [],
      selectDoctor: '',
      curentDate: '',
      rangeItem: [],
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
        var data=this.props.allSchedule
        if(data&&data.length>0){
            data=data.map(item=>({...item,isSelected:false}))
        }
      this.setState({
        rangeItem:data
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
    this.setState({ curentDate: date[0] });
  };
  handleClickTime=(time)=>{
    let {rangeItem}=this.state;
   if(rangeItem&&rangeItem.length>0){
    rangeItem=rangeItem.map(item=>{
        if(item.id===time.id)item.isSelected = !item.isSelected;
        return item;
    })
    this.setState({rangeItem:rangeItem})
   }
  }
  render() {
    let { rangeItem } = this.state;
  console.log(this.state);
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
                value={this.state.curentDate}
                minDate={new Date()}
              />
            </div>
          </div>
          <div className="columns is-multiline is-mobile">
            {rangeItem &&
              rangeItem.length > 0 &&
              rangeItem.map((it, idx) => {
                return (
                  <div className="column is-one-quarter" key={idx}>
                    <span className="tag is-light is-large pointer">{it.value_vi}</span>
                  </div>
                );
              })}
          </div>
          <button className="button is-primary">
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
