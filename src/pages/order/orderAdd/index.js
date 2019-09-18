import React,{Component} from 'react'
import {Card,Table, Button, message,Popconfirm,Pagination, Input} from 'antd'
import './index.less'
class OrderAdd extends Component{
    constructor(){
        super()
       this.state={
           id:'',
           order_id:'',
           submit_time:'',
           user_account:'',
           order_amount:'',
           payment_method:'',
           order_source:'',
           order_state:'',
       }
        
    }
    submit=()=>{
        let{id,order_id,submit_time,user_account,order_amount,payment_method,order_source,order_state} =this.state
        this.$axios({
            method:'post',
            url:"http://localhost:3003/admin/order/add",
            data:{
                id:id,
                order_id,
                submit_time,
                user_account,
                order_amount:order_amount,
                payment_method:payment_method,
                order_source:order_source,
                order_state:order_state
            }
          })
          .then((res)=>{
            this.props.orderAdd()
            message.success('添加成功')
          })
      
    }
    render(){
       
        return(
            <div className="addmode">
                <Card title="添加订单" className="add_card">
                    <div className="add_fo add_foone">
                        <span>编号：</span><Input type="text" value={this.state.id} onChange={(e)=>{
                            this.setState({id:e.target.value})
                        }} className="add_in"/>
                    </div>
                    <div className="add_fo">
                        <span>订单编号：</span><Input type="text" value={this.state.order_id} onChange={(e)=>{
                            this.setState({order_id:e.target.value})
                        }} className="add_in"/>
                    </div>
                    <div className="add_fo">
                        <span>提交时间：</span><Input type="text" value={this.state.submit_time} onChange={(e)=>{
                            this.setState({submit_time:e.target.value})
                        }} className="add_in"/>
                    </div>
                    <div className="add_fo"> 
                        <span>用户账号：</span><Input type="text" value={this.state.user_account} onChange={(e)=>{
                            this.setState({user_account:e.target.value})
                        }} className="add_in"/>
                    </div>
                    <div className="add_fo">
                        <span>订单金额：</span><Input type="text" value={this.state.order_amount} onChange={(e)=>{
                            this.setState({order_amount:e.target.value})
                        }} className="add_in"/>
                    </div>
                    <div className="add_fo">
                        <span>支付方式：</span><Input type="text" value={this.state.payment_method} onChange={(e)=>{
                            this.setState({payment_method:e.target.value})
                        }} className="add_in"/>
                    </div>
                    <div className="add_fo">
                        <span>订单来源：</span><Input type="text" value={this.state.order_source} onChange={(e)=>{
                            this.setState({order_source:e.target.value})
                        }} className="add_in"/>
                    </div>
                    <div className="add_fo">
                        <span>订单状态：</span><Input type="text" value={this.state.order_state} onChange={(e)=>{
                            this.setState({order_state:e.target.value})
                        }} className="add_in"/>
                    </div>
                   <Button type="primary" onClick={this.submit} className="add_btn">添加</Button>
                </Card>
                
            </div>
        )
    }
}
export default OrderAdd