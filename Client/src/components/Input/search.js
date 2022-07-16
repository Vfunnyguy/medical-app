import React, { Component } from "react";
import { connect } from 'react-redux'
class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <>
               <div className="control has-icons-left">
                <input className="input" type="text" placeholder="Tìm Kiếm" />
                <span className='icon is-small is-left'>
                  <i className="fas fa-search    "></i>
                </span>
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
export default connect(mapStateToProps, mapDispatchToProps)(Search)