import React,{Component} from 'react'
import {Input} from 'antd'
class OrderList extends Component{
    constructor(){
        super()
    }
  render(){
     return(
        <div>
            广告名称：<Input placeholder="广告名称" />
        </div>
    ) 
     }
  };
  
export default OrderList