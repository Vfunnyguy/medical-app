import React, {
    Component
} from "react";
import {
    connect
} from 'react-redux';
import localization from 'moment/locale/vi'
import { LanguageUtils } from "../../utils";
import moment from "moment";
import {
    getScheduleByDate
} from "../../services/userService";
class DoctorSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allDays: [],
            valiableTime: [],
        }
    }
    async componentDidMount() {
      let allDays= this.getArrday()
       this.setState({
        allDays:allDays
       })
    }
    getArrday=()=>{
        let allDays = []
        for (let i = 0; i < 7; i++) {
            let obj = {}
            if (i === 0) {
                let ddMM = moment(new Date()).format('DD/MM')
                let today = `Hôm Nay - ${ddMM}`
                obj.label = today
            } else {
                obj.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM').toUpperCase()
            }
            obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()
            allDays.push(obj)
        }
        return allDays
    }
    async componentDidUpdate(prevProps) {
        if (this.props.docIDF !== prevProps.docIDF) {
            let allDays=this.getArrday()
            let res = await getScheduleByDate(this.props.docIDF,allDays[0].value)
            this.setState({
                valiableTime: res.data ? res.data : []
            })
            console.log(res);
        }
    }
    handleOnChangeSelect = async (e) => {
        if (this.props.docIDF && this.props.docIDF !== -1) {
            let docID = this.props.docIDF
            let date = e.target.value
            let res = await getScheduleByDate(docID, date)
            if (res && res.errCode === 0) {
                this.setState({
                    valiableTime: res.data ? res.data : []
                })
            }
            console.log(res);
        }
    }
    render() {
        let { allDays, valiableTime } = this.state

        return (
            <>

                <div className="select is-primary">
                    <select onChange={(e) => this.handleOnChangeSelect(e)}>
                        {
                            allDays && allDays.map((it, idx) => {
                                return (
                                    <option
                                        value={it.value}
                                        key={idx}
                                    >
                                        {it.label}
                                    </option>
                                )
                            })
                        }



                    </select>
                </div>
                <div className="block">
                    <div className="is-one-third">
                        <h4 className="fw-bold is-uppercase">Lịch khám</h4>
                        {
                            valiableTime && valiableTime.length > 0
                                ?
                                valiableTime.map((item, index) => {
                                    let timeDisplay = item.timeTypeData.value_vi
                                    return (
                                        <button className=" button  is-primary ml-2 " key={index}>{timeDisplay}</button>
                                    )
                                })
                                :
                                <h2> Không có lịch hẹn trong ngày,vui lòng chọn ngày khác</h2>
                        }

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
export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule)