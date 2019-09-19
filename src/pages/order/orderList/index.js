import React,{Component} from 'react'
import {Card,Table, Button, message,Popconfirm,Pagination,Input,Icon} from 'antd'
import OrderUpdata from '../orderUpdata'
import OrderAdd from '../orderAdd'
import './index.less'
class OrderList extends Component{
    constructor(){
        super()
        this.state={
            selectedRowKeys:[],
            data:[],
            page:1,
            pageSize:5,
            current: 3,
            total:'',
            updataState:false,
            addState:false,
            record:{},
            mohuVal:'',
        }
    }
    columns = [
        {
          title: '编号',
          dataIndex: 'id',
        },
        {
          title: '订单编号',
          dataIndex: 'order_id',
        },
        {
            title: '提交时间',
            dataIndex: 'submit_time',
        },
        {
            title: '用户账号',
            dataIndex: 'user_account',
        },
        {
            title: '订单金额',
            dataIndex: 'order_amount',
        },
        {
            title: '支付方式',
            dataIndex: 'payment_method',
        },
        {
            title:'订单来源',
            dataIndex:'order_source',
        },
        {
            title:'订单状态',
            dataIndex:'order_state',
        },
        {
            title:'操作',
            dataIndex:'handle',
            render:(text,record)=>{
                
                return(
                  <div>
                    <Button type="primary" size="small" onClick={this.orderUpdata.bind(this,record)}>修改</Button>
                    <Popconfirm title="你确定要删除吗?" onConfirm={this.OrderDel.bind(this,record._id)}
                    >
                      <Button type="danger" size="small" onClick={this.OrderDel}>删除</Button>
                    </Popconfirm>
                  </div>
                  
                )
              }
        }
      ];
      orderUpdata=(record)=>{
          
        this.setState({updataState :!this.state.updataState,record:record})
      }
      OrderDel=(id)=>{
        this.$axios({
            method:'post',
            url:"/zhou/admin/order/del",
            data:{
              _id:id
            }
          })
          .then((res)=>{
                this.orderInit(this.state.page,this.state.pageSize)
                message.success('删除成功');
          })
          
      }
    orderInit(page,pageSize){
          this.$axios({
            method:'post',
            url:"/zhou/admin/order/findPage",
            data:{
              page:page,
              pageSize:pageSize,
            }
          })
          .then((res)=>{
            if(res.err===0){
               this.setState({data:res.list,total:res.total})
            }else{
                message.info('This is a normal message');
            }
          })
          
      }
      componentDidMount(){
        this.orderInit(this.state.page,this.state.pageSize)
      }
    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys,selectedRows });
      }
      onChange = (page,pageSize) => {
        //console.log(page,pageSize);
        this.setState({page:page})
        this.orderInit(page,this.state.pageSize)
      }
      refeshList=()=>{
          this.setState({updataState:false})
          this.orderInit(this.state.page,this.state.pageSize)
      }
      orderAdd=()=>{
        this.setState({addState:false})
        this.orderInit(this.state.page,this.state.pageSize)
      }
      orderListAdd=()=>{
        this.setState({addState :!this.state.addState})
      }
      orderFind=()=>{
        this.$axios({
            method:'post',
            url:"/zhou/admin/order/mohuFind",
            data:{
              kw:this.state.mohuVal,
              pageSize:5,
              page:1
            },
            
          })
          .then((res)=>{
              if(res.err===0){
                  this.setState({data:res.list,total:res.total})
                 // this.orderInit(this.state.page,this.state.pageSize)
              }else{
                  message.info('This is a normal message')
              }
            
          })
      }
      render() {
        let { selectedRowKeys } = this.state;
        let rowSelection = {
           selectedRowKeys,
           onChange: this.onSelectChange
        }
        return (
          <div>

              {!this.state.updataState ||<OrderUpdata record={this.state.record} refesh={this.refeshList}></OrderUpdata>}
              {!this.state.addState || <OrderAdd orderAdd={this.orderAdd}></OrderAdd>}
              <Card title={
                  <span>
                      <Icon type="profile" />
                      <span>&nbsp;数据列表</span>
                  </span>
              }>
                  <Input className="foo" value={this.state.mohuVal} onChange={(e)=>{
                    this.setState({mohuVal:e.target.value})
                  }}/><Button className="btnnn" onClick={this.orderFind}>查询</Button>
                  <Button type="primary" className="btnn" onClick={this.orderListAdd}>添加</Button>
              </Card>
              <Table rowSelection={this.state.data.length?rowSelection:null} columns={this.columns} dataSource={this.state.data} pagination={false}/>
              <Pagination className="page" defaultCurrent={1} defaultPageSize={this.state.pageSize} onChange={this.onChange} total={this.state.total} />;
          </div>
        );
      }
    }
export default OrderList