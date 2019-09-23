import React,{Component} from 'react'
import {Card,Table, Button, message,Popconfirm,Pagination, Input} from 'antd'
import './index.less'
class OrderUpdata extends Component{
    constructor(props){
        super(props)
        this.state=props.record
    }
    submit=()=>{
        
        let{_id,order_amount,payment_method,order_source,order_state} =this.state
        this.$axios({
            method:'post',
            url:"/zhou/admin/order/update",
            data:{
                _id:_id,
                order_amount:order_amount,
                payment_method:payment_method,
                order_source:order_source,
                order_state:order_state
            }
          })
          .then((res)=>{
            this.props.refesh()
            message.success('修改成功')
          })
        
    }
    render(){
       let{id,order_id,submit_time,user_account,order_amount,payment_method,order_source,order_state} = this.state
        return(
            <div className="updatamode">
                <Card title="修改订单" className="card">
                    <div className="fo foone">
                        <span>编号：</span><Input type="text" value={id} className="in"/>
                    </div>
                    <div className="fo">
                        <span>订单编号：</span><Input type="text" value={order_id} className="in"/>
                    </div>
                    <div className="fo">
                        <span>提交时间：</span><Input type="text" value={submit_time} className="in"/>
                    </div>
                    <div className="fo"> 
                        <span>用户账号：</span><Input type="text" value={user_account} className="in"/>
                    </div>
                    <div className="fo">
                        <span>订单金额：</span><Input type="text" value={order_amount} onChange={(e)=>{
                            this.setState({order_amount:e.target.value})
                        }} className="in"/>
                    </div>
                    <div className="fo">
                        <span>支付方式：</span><Input type="text" value={payment_method} onChange={(e)=>{
                            this.setState({payment_method:e.target.value})
                        }} className="in"/>
                    </div>
                    <div className="fo">
                        <span>订单来源：</span><Input type="text" value={order_source} onChange={(e)=>{
                            this.setState({order_source:e.target.value})
                        }} className="in"/>
                    </div>
                    <div className="fo">
                        <span>订单状态：</span><Input type="text" value={order_state} onChange={(e)=>{
                            this.setState({order_state:e.target.value})
                        }} className="in"/>
                    </div>
                   <Button type="primary" onClick={this.submit} className="btn">修改</Button>
                </Card>
                
            </div>
        )
    }
}
export default OrderUpdata