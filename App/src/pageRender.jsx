import React from "react";
import { useParams } from "react-router-dom";
import Notfound from "~/404";
const genPage=(name)=>{
    const component=()=>require(`./pages/${name}`).default
    try {
        return React.createElement(component())
    } catch (error) {
        return <Notfound/>
    }
}
export default function PageRender(){
    const {pages,slug}=useParams()
    let name=''
    if(pages){
        name=slug?`${pages}/{slug}`:`${pages}`
    }
    return genPage(name)
}