import React, { Component } from 'react';
import { connect } from 'react-redux';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { crud_action } from '../../utils'
import { getDetailDoctor } from '../../services/userService';
import * as action from '../../store/actions/adminActions'
import { formatCash } from '../../utils';

const mdParser = new MarkdownIt();


class DocInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markDownContent: '',
      htmlContent: '',
      selectedOption: '',
      description: '',
      docList: [],
      oldData: false,
      listPrice: [],
      listPayment: [],
      selectPrice: '',
      selectPayment: '',
      nameClinic: '',
      addressClinic: '',
      note: '',
    };
  }

  componentDidMount() {
    this.props.getAllDoc();
    this.props.getAllDocInfo()
  }
  selectData = (dataI, type) => {
    var result = []
    if (dataI && dataI.length > 0) {
      if (type === 'USERS') {
        dataI.map((it, idx) => {
          let obj = {}
          obj.label = it.fullName
          obj.value = it.id
          result.push(obj)
        })
      }
      if (type === 'PRICE') {
        dataI.map((it, idx) => {
          let obj = {}
          let formatValue = formatCash(it.value_vi)
          obj.label = `${formatValue} VNĐ`
          obj.value = it.keyMap
          result.push(obj)
        })
      }
      if (type === 'PAYMENT') {
        dataI.map((it, idx) => {
          let obj = {}
          obj.label = it.value_vi
          obj.value = it.keyMap
          result.push(obj)
        })
      }

    }
    return result
  }
  componentDidUpdate(prevProps) {
    if (prevProps.allDoc !== this.props.allDoc) {
      let dataSelect = this.selectData(this.props.allDoc, 'USERS')
      this.setState({
        docList: dataSelect
      })
    }
    if (prevProps.allDocInfo !== this.props.allDocInfo) {
      let { resPayment, resPrice } = this.props.allDocInfo
      let dataSelectprice = this.selectData(resPrice, 'PRICE')
      let dataSelectpay = this.selectData(resPayment, 'PAYMENT')
      this.setState({
        listPrice: dataSelectprice,
        listPayment: dataSelectpay,
      })
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      markDownContent: text,
      htmlContent: html
    })
  }
  handleSaveContent = () => {
    let { oldData } = this.state
    this.props.saveInfo({
      docID: this.state.selectedOption.value,
      htmlContent: this.state.htmlContent,
      markDownContent: this.state.markDownContent,
      description: this.state.description,
      action: oldData === true ? crud_action.edit : crud_action.create,
      selectPrice: this.state.selectPrice.value,
      selectPayment: this.state.selectPayment.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note
    })

  }
  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption })
    let { listPrice, listPayment } = this.state
    let res = await getDetailDoctor(selectedOption.value)
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown
      let addressClinic = '', nameClinic = '', note = '', paymentID = '', priceID = '',
        selectPayment = '', selectPrice = '';
      if (res.data.DocInfo) {
          addressClinic = res.data.DocInfo.addressClinic
          nameClinic = res.data.DocInfo.nameClinic
          note = res.data.DocInfo.note
          priceID = res.data.DocInfo.priceID
          paymentID = res.data.DocInfo.paymentID;
        selectPayment = listPayment.find(item => {
          return item && item.value === paymentID
        })
        selectPrice = listPrice.find(item => {
          return item && item.value === priceID
        })
        this.setState({
          htmlContent: markdown.htmlContent,
          markDownContent: markdown.markDownContent,
          description: markdown.description,
          oldData: true,
          addressClinic: addressClinic,
          nameClinic: nameClinic,
          note: note,
          selectPrice: selectPrice,
          selectPayment: selectPayment
        })
      }
    } else {
      this.setState({
        htmlContent: '',
        markDownContent: '',
        description: '',
        oldData: false,
        addressClinic: '',
        nameClinic: '',
        note: ''
      })

    }
  };
  handleChangeSelectDoctorInfo = async (selectedOption, name) => {
    let stateName = name.name
    let cpState = { ...this.state }
    cpState[stateName] = selectedOption
    this.setState({
      ...cpState
    })
  }
  onChangeText = (e, id) => {
    let copyState = { ...this.state }
    copyState[id] = e.target.value
    this.setState({
      ...copyState
    })
  }

  render() {
    let { oldData } = this.state
    return (
      <div className="section">
         

        <h1 className="is-3 title center">Tạo thông tin bác sĩ</h1>
        <div className="box block">
          <div className="columns">
            <div className="column">

              <Select
                value={this.state.selectedOption}
                options={this.state.docList}
                onChange={this.handleChangeSelect}
                placeholder='Chọn bác sĩ'
                name='selectedOption'
              />
            </div>
            <div className="column">

              <Select
                value={this.state.selectPayment}
                options={this.state.listPayment}
                onChange={this.handleChangeSelectDoctorInfo}
                placeholder='Chọn cách thức thanh toán'
                name='selectPayment'
              />
            </div>
            <div className="column">

              <Select
                value={this.state.selectPrice}
                options={this.state.listPrice}
                onChange={this.handleChangeSelectDoctorInfo}
                placeholder='Chọn giá'
                name='selectPrice'

              />
            </div>

          </div>
          <div className='columns'>
            <div className='column'>
              <input placeholder='note' className='input'
                value={this.state.note}
                onChange={(e) => this.onChangeText(e, 'note')}
              />
            </div>
            <div className='column'>
              <input placeholder='địa chỉ phòng khám' className='input'
                value={this.state.addressClinic}
                onChange={(e) => this.onChangeText(e, 'addressClinic')}
              />
            </div>
            <div className='column'>
              <input placeholder='Tên phòng khám' className='input'
                value={this.state.nameClinic}
                onChange={(e) => this.onChangeText(e, 'nameClinic')}
              />

            </div>

          </div>
          <div className="block">
            <span className="is-4 fw-bold">Số tài khoản ngân hàng</span>
            <input className="input is-info"
              value={this.state.description}
              onChange={(e) => this.onChangeText(e, 'description')}
            />
          </div>
          <MdEditor
            style={{ height: '500px', width: '100%' }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.markDownContent}
          />
        </div>
        <button className='w-100 is-info button' onClick={() => this.handleSaveContent()}>
          {
            oldData === true ? 'Cập nhật' : 'Lưu'
          }
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    allDoc: state.admin.allDoctor,
    allDocInfo: state.admin.allDocInfo

  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoc: () => dispatch(action.getAllDoctor()),
    saveInfo: (data) => dispatch(action.saveDocInfo(data)),
    getAllDocInfo: () => dispatch(action.getAllDocInfo())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DocInfo);
