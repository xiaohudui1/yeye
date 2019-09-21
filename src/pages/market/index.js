import React,{Component} from 'react'
import {Input} from 'antd'
import "./index.less"
class OrderList extends Component{
    constructor(){
        super()
    }
  render(){
     return(
        <div className="container">
            广告名称：<Input placeholder="广告名称" />
        </div>
    ) 
     }
  };
  
export default OrderList