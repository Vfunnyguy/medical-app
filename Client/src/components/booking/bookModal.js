import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'reactstrap'
import DatePicker from '../../components/Input/DatePicker'
import * as action from '../../store/actions'
import Select from 'react-select'
import { postBookingDoc } from '../../services/userService'
import { toast } from 'react-toastify'
import _ from 'lodash'
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
        }
    }
    async componentDidMount() {
        this.props.getGender()
    }
    selectDataGender = (data) => {
        var result = []
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
        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let docID = this.props.dataTime.docID
                let timeType = this.props.dataTime.timeType
                this.setState({
                    docID: docID,
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

    handleConfirm = async () => {
        let date = new Date(this.state.birthday).getTime()
        let res = await postBookingDoc({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: date,
            selectGender: this.state.selectGender.value,
            docID: this.state.docID,
            timeType: this.state.timeType,
        })
        console.log(res);
        if (res && res.errCode === 0) {
            toast.success('Đặt thành công')
            this.props.closeModal()
        } else {
            toast.error('Không thể dặt')
        }
    }
    render() {
        let { ishowModal, closeModal, timeData } = this.props;
        let docName = '';
        if (timeData && _.isEmpty(timeData)) {
            docName = timeData.docID
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
                                    <label className="label">Họ tên</label>
                                    <div className="control">
                                        <input className="input" type="text" placeholder="Điền Họ & tên" value={this.state.fullName} onChange={(e) => this.handleOnChangeInput(e, 'fullName')} />
                                    </div>
                                </div>

                            </div>
                            <div className='column'>
                                <div className="field">
                                    <label className="label">Số điện thoại</label>
                                    <div className="control">
                                        <input className="input" type="number" placeholder="Điền số điện thoại" value={this.state.phoneNumber} onChange={(e) => this.handleOnChangeInput(e, 'phoneNumber')} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='columns'>
                            <div className='column'>

                                <div className="field">
                                    <label className="label">Email</label>
                                    <div className="control">
                                        <input className="input" type="email" placeholder="Điền Email" value={this.state.email} onChange={(e) => this.handleOnChangeInput(e, 'email')} />
                                    </div>
                                </div>
                            </div>
                            <div className='column'>

                                <div className="field">
                                    <label className="label">Địa chỉ</label>
                                    <div className="control">
                                        <input className="input" type="text" placeholder="Điền Địa chỉ liên hệ" value={this.state.address} onChange={(e) => this.handleOnChangeInput(e, 'address')} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='columns'>
                            <div className='column'>
                                <div className='field'>
                                    <label className='label'>Ngày/Tháng/Năm sinh</label>
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
                                    <label className="label">Giới tính</label>
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
                            <label className="label">Lý do khám</label>
                            <div className="control">
                                <textarea className="textarea" placeholder="Điền lý do khám" value={this.state.reason} onChange={(e) => this.handleOnChangeInput(e, 'reason')}></textarea>
                            </div>
                        </div>
                        <div className="field is-grouped">
                            <div className="control">
                                <button className="button is-link" onClick={() => this.handleConfirm()}>Xác nhận</button>
                            </div>
                            <div className="control">
                                <button className="button is-danger" onClick={closeModal}>Hủy</button>
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