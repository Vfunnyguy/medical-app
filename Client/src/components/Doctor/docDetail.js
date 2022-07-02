import React ,{Component}from 'react'
import {connect}from 'react-redux'
import {getDetailDoctor}from '../../services/userService'
import HeaderHome from '../Home/headerHome'
class DocDetail extends Component{
    constructor(props){
        super(props)
        this.state={
            docDataDetail:{}
        }
    }
    async componentDidMount(){
        if(this.props.match&&this.props.match.params&&this.props.match.params.id){
            let id=this.props.match.params.id
            let res=await getDetailDoctor(id)
            if(res&&res.errCode===0){
                this.setState({
                    docDataDetail:res.data,
                })
            }
        }
    }
    render(){
        console.log(this.state);
        var detailDoc=this.state.docDataDetail
        let docName=''
        if(detailDoc&& detailDoc.positionData){
            docName=`${detailDoc.positionData.value_vi},${detailDoc.fullName}`
        }
        return(
            <>
        <HeaderHome />
            
            <div className='container my-3'>
            <div className='columns'>
                <div className='column is-6-desktop'>
                <div className="cover">
                   
                    <img src={detailDoc&&detailDoc.image?detailDoc.image:''} alt='alt'/>
                  </div>
                </div>
                <div className='column'>
                   <h2 className='title is-2'>
                    {docName.toUpperCase()}
                   </h2>
                   <div className='field'>
                    {
                        detailDoc&&detailDoc.MarkDown&&detailDoc.MarkDown.description&&<p className='is-5'>
                            {detailDoc.MarkDown.description}
                        </p>
                    }
                   </div>
                </div>
            </div>
            <div className='box'>
              
            </div>
            <div className='box'>
                <section className='section'>
                 {
                     detailDoc&&detailDoc.MarkDown&&detailDoc.MarkDown.htmlContent&&
 
                        <div dangerouslySetInnerHTML={{__html:detailDoc.MarkDown.htmlContent}}></div>                
                 }
                </section>
            </div>
            </div>
            </>
        )
    }
    
}
const mapStateToProps=(state)=>{
    return {

    }
}
const mapDispatchToProps=(dispatch)=>{
    return{

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(DocDetail)