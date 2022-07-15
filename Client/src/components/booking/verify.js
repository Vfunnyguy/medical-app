import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postVerifyBooking } from '../../services/userService'
import HeaderHome from '../Home/headerHome'
class VerifyBooking extends Component {
    constructor(props) {
        super(props)
        this.state = {
            statusData: false,
            errCode: 0
        }
    }
    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let url = new URLSearchParams(this.props.location.search)
            let token = url.get('token')
            let docID = url.get('docID')
            let res = await postVerifyBooking({
                Token: token,
                docID: docID
            })
            if (res && res.errCode === 0) {
                this.setState({
                    statusData: true,
                    errCode: res.errCode
                })
            } else {
                this.setState({
                    statusData: true,
                    errCode: res && res.errCode ? res.errCode : -1
                })
            }
        }
    }
    render() {
        let { statusData, errCode } = this.state
        console.log(this.state);
        return (
            <>
                <HeaderHome />
                <div className='center'>
                    {
                        statusData === false ?
                            <div>
                                Loading...

                            </div>
                            :
                            <div>
                                {+errCode === 0}?
                                <h1 className='has-text-danger title is-3'>Xác nhận hẹn khám thành công</h1>
                                :
                                <h1 className='has-text-danger title is-3'>Xác nhận hẹn khám không thành công</h1>
                            </div>
                    }

                </div>
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {

    }
}
const masDispatchToProps = (dispatch) => {
    return {

    }
}
export default connect(mapStateToProps, masDispatchToProps)(VerifyBooking)