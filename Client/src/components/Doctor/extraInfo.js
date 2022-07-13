import React, { Component } from "react";
import { connect } from "react-redux";
import { getExtraInfoById } from '../../services/userService'
class DocextraInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            extraInfo: {}
        }
    }
    async componentDidUpdate(prevProps) {
        if (this.props.docIDF !== prevProps.docIDF) {
            let res = await getExtraInfoById(this.props.docIDF)
            console.log(res);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfo: res.data
                })
            }
        }
    }

    render() {
        let { extraInfo } = this.state
        console.log(this.state);
        return (
            <>
                <div className="card">
                    <div className="card-header">
                        <span className="card-header-title">Địa chỉ: </span>
                        <span className="card-header-icon">
                            {extraInfo && extraInfo.nameClinic?extraInfo.nameClinic:'Bệnh viện abc' }
                        </span>
                    </div>
                    <div className="card-content">
                        <span className="fw-bold is-4">Giá khám</span><br />
                        {extraInfo && extraInfo.priceTypeData ? extraInfo.priceTypeData.value_vi : 'Free'}<br />
                        <span className="fw-bold is-4">
                            Phương thức thanh toán
                       </span><br />
                        {extraInfo && extraInfo.paymentTypeData ? extraInfo.paymentTypeData.value_vi : 'Free'}
                    </div>
                </div>
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {

    }
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DocextraInfo)