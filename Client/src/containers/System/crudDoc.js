import React, { Component } from 'react';
import { connect } from 'react-redux';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import {crud_action} from '../../utils' 
import { getDetailDoctor } from '../../services/userService';
import * as action from '../../store/actions/adminActions'
const mdParser = new MarkdownIt();


class DocInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
     markDownContent: '',
     htmlContent: '',
      selectedOption: '',
      description:'',
      docList:[],
      oldData:false 
    };
  }
   
  componentDidMount() {
    this.props.getAllDoc();
  }
  selectData = (dataI) => {
   var result=[]
   if(dataI&&dataI.length>0){
    dataI.map((it,idx)=>{
        let obj={}
        obj.label=it.fullName
        obj.value=it.id
       return  result.push(obj)
    })
   }
   return result
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.allDoc!==this.props.allDoc){
        let dataSelect=this.selectData(this.props.allDoc)
        this.setState({
            docList:dataSelect
        })
    }
  }
  
  handleEditorChange=({html,text})=>{
    this.setState({
     markDownContent: text,
     htmlContent: html
    })
  }
  handleSaveContent=()=>{
    let {oldData}=this.state
    this.props.saveInfo({
        docID:this.state.selectedOption.value,
        htmlContent:this.state.contentH,
        markDownContent:this.state.contentM,
        description:this.state.description,
        action:oldData===true?crud_action.edit:crud_action.create
    })
 
  }
  handleChangeSelect = async (selectedOption) => {
  this.setState({ selectedOption });
  let res=await getDetailDoctor(selectedOption.value)
  if(res&&res.errCode===0&&res.data&&res.data.MarkDown){
   let markdown=res.data.MarkDown
    this.setState({
      htmlContent:markdown.htmlContent,
      markDownContent:markdown.markDownContent,
      description:markdown.description,
      oldData:true
    })
  }else{
    this.setState({
      htmlContent:'',
      markDownContent:'',
      description:'',
      oldData:false
    })
  }
    console.log(selectedOption);
    console.log(res);
  };
  handleChangeDescription=(e)=>{
    this.setState({
      description:e.target.value
    })
  }

  render() {
    console.log(this.state);
    let {oldData}=this.state
    return (
      <div className="section">
        <h1 className="is-3 title center">Tạo thông tin bác sĩ</h1>
        <div className="box block">
          <div className="columns">
            <div className="column">
              <span className="is-4 fw-bold">Chọn bác sĩ</span>
              <Select
                value={this.state.selectedOption}
                options={this.state.docList}
                onChange={this.handleChangeSelect}
              />
            </div>
            <div className="column">
              <span className="is-4 fw-bold">Thông tin giới thiệu</span>
              <textarea className="textarea is-info"
              value={this.state.description}
              onChange={(e)=>this.handleChangeDescription(e)}
              ></textarea>
            </div>
          </div>
          <MdEditor
            style={{ height: '500px', width: '100%' }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.markDownContent}
          />
        </div>
        <button className='w-100 is-info button'onClick={()=>this.handleSaveContent()}>
        {
          oldData===true?'Cập nhật':'Lưu'
        }
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    allDoc:state.admin.allDoctor,
    
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoc:()=>dispatch(action.getAllDoctor()),
    saveInfo:(data)=>dispatch(action.saveDocInfo(data))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DocInfo);
