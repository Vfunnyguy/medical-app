import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'reactstrap'
import DatePicker from '../../components/Input/DatePicker'
import * as action from '../../store/actions'
import Select from 'react-select'
import { postBookingDoc } from '../../services/userService'
import { toast } from 'react-toastify'
import _ from 'lodash'
import moment from 'moment'
class ModalBooking extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectGender: '',
            docID: '',
            genders: '',
            timeType: '',
            bank:"",
            image:''
        }
    }
    async componentDidMount() {
        this.props.getGender()
    }
    selectDataGender = (data) => {
        let result = []
        if (data && data.length > 0) {
            data.map(item => {
                let obj = {}
                obj.label = item.value_vi
                obj.value = item.keyMap
                result.push(obj)
            })
        }
        return result
    }
    async componentDidUpdate(prevProps) {
        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.selectDataGender(this.props.genders)
            })
        }
        if (this.props.timeData !== prevProps.timeData) {
            if (this.props.timeData && !_.isEmpty(this.props.timeData)) {
                let docID = this.props.timeData.docID
                let bank=this.props.timeData.description
                let timeType = this.props.timeData.timeType
                this.setState({
                    docID: docID,
                    bank:bank,
                    timeType: timeType
                })
            }
        }
    }
    handleOnChangeInput = (e, id) => {
        let valueInput = e.target.value
        let cpState = { ...this.state }
        cpState[id] = valueInput
        this.setState({
            ...cpState
        })
    }
    handleOnchangeDatePick = (date) => {
        this.setState({
            birthday: date[0]
        })
    }
    handleChangeSelect = (selectOpt) => {
        this.setState({ selectGender: selectOpt })
    }
    onTimeBooking=(timeData)=>{
      if(timeData&&!_.isEmpty(timeData)){
        let time=timeData.timeTypeData.value_vi
        let date=moment.unix(+timeData.date/1000).format('dddd-DD/MM/YYYY')
        return `${time}-${date}`
      }
     return ''
    }
    buildDocName=(timeData)=>{
        if(timeData&&!_.isEmpty(timeData)){
            let name=`${timeData.docData.fullName}`
            return name
        }
        return ''
    }


    handleConfirm = async () => {
        let date = new Date(this.state.birthday).getTime()
        let timeString=this.onTimeBooking(this.props.timeData)
        let docName=this.buildDocName(this.props.timeData)
        let res = await postBookingDoc({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: this.props.timeData.date,
            birthday:date,
            selectGender: this.state.selectGender.value,
            docID: this.state.docID,
            timeType: this.state.timeType,
            timeString:timeString,
            docName:docName ,
            bank:this.state.bank
        })
        console.log(res);
        if (res && res.errCode === 0) {
            toast.success('?????t th??nh c??ng')
            this.props.closeModal()
        } else {
            toast.error('Kh??ng th??? d???t')
        }
    }
    render() {
        let { ishowModal, closeModal, timeData } = this.props;
        let docID=''
        let bank=''
        if (timeData && !_.isEmpty(timeData)){
            docID=timeData.docID
            bank=timeData.bank
        }
        console.log(this.state);
        return (
            <Modal
                isOpen={ishowModal}
                size='lg'
                centered
            >
                <div className='modal is-active'>
                    <div className='modal-background'></div>
                    <button className='modal-close button' onClick={closeModal}></button>
                    <section className='modal-card bg-white section radius scroll'>

                        <div className='columns'>
                            <div className='column'>
                                <div className="field">
                                    <label className="label">H??? t??n</label>
                                    <div className="control">
                                        <input className="input" type="text" placeholder="??i???n H??? & t??n" value={this.state.fullName} onChange={(e) => this.handleOnChangeInput(e, 'fullName')} />
                                    </div>
                                </div>

                            </div>
                            <div className='column'>
                                <div className="field">
                                    <label className="label">S??? ??i???n tho???i</label>
                                    <div className="control">
                                        <input className="input" type="text" placeholder="??i???n s??? ??i???n tho???i" value={this.state.phoneNumber} onChange={(e) => this.handleOnChangeInput(e, 'phoneNumber')} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='columns'>
                            <div className='column'>

                                <div className="field">
                                    <label className="label">Email</label>
                                    <div className="control">
                                        <input className="input" type="email" placeholder="??i???n Email" value={this.state.email} onChange={(e) => this.handleOnChangeInput(e, 'email')} />
                                    </div>
                                </div>
                            </div>
                            <div className='column'>

                                <div className="field">
                                    <label className="label">?????a ch???</label>
                                    <div className="control">
                                        <input className="input" type="text" placeholder="??i???n ?????a ch??? li??n h???" value={this.state.address} onChange={(e) => this.handleOnChangeInput(e, 'address')} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='columns'>
                            <div className='column'>
                                <div className='field'>
                                    <label className='label'>Ng??y/Th??ng/N??m sinh</label>
                                    <div className='control'>
                                    <DatePicker
                                        value={this.state.birthday}
                                        onChange={this.handleOnchangeDatePick}
                                    />
                                    </div>

                                </div>
                            </div>
                            <div className='column'>

                                <div className="field">
                                    <label className="label">Gi???i t??nh</label>
                                    <div className="control">
                                        <Select
                                            value={this.state.selectGender}
                                            onChange={this.handleChangeSelect}
                                            options={this.state.genders}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">L?? do kh??m</label>
                            <div className="control">
                                <textarea className="textarea" placeholder="??i???n l?? do kh??m" value={this.state.reason} onChange={(e) => this.handleOnChangeInput(e, 'reason')}></textarea>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">H??nh ???nh </label>
                            <div className="control">
                                <input className="input" type='file' accept='image/*' placeholder="t???i h??nh ???nh" value={this.state.image} onChange={(e) => this.handleOnChangeInput(e, 'image')}/>
                            </div>
                        </div>
                        <div className="field is-grouped">
                            <div className="control">
                                <button className="button is-link" onClick={() => this.handleConfirm()}>X??c nh???n</button>
                            </div>
                            <div className="control">
                                <button className="button is-danger" onClick={closeModal}>H???y</button>
                            </div>
                        </div>
                    </section>
                </div>



            </Modal>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        genders: state.admin.genders,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getGender: () => dispatch(action.genderStart()),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ModalBooking)