import React,{Component} from 'react'
import {Card,Table, Button,Pagination,Spin,Popconfirm, message,Icon} from 'antd'
import Foodupdata from 'pages/foodupdata'
import style from './index.module.less'
class FoodList extends Component{
    constructor(){
        super()
        this.state={
          dataSource:[],
          updataShow:false,
          count:0,
          page:1,
          pageSize:4,
          option:false,
          loading:true,
          render:{},
        }
    }
    //创建表头信息
    columns=[
        {
          title: '商品名称',
          dataIndex: 'name',
          key: 'name',//对应每条数据的key值
          width:100,
          fixed:'left',
          align:'center',
        },
        {
            title: '商品图片',
            dataIndex: 'img',//ajax请求列数据对应的key
            width:200,
            key: 'img',
            align:'center',
            render(data){//渲染函数DATA为key对应的值
              
                //let imgPath = 'http://10.9.22.12:8080'+data
                return(<img width='80' height='60' src={data}/>)
            },
          },
        {
            title: '商品类型',
            dataIndex: 'foodtype',
            key: 'foodtype',
            align:'center',
            width:100,
          },
        {
          title: '描述',
          dataIndex: 'desc',
          key: 'desc',
          align:'center',
          width:200,
        },
          {
            title: '商品价格',
            dataIndex: 'price',
            key: 'price',
            align:'center',
            width:100,
          },
          {
            title: '审核状态',
            dataIndex: 'state',
            key: 'state',
            width:100,
            render:(text,render)=>{
             // console.log('审批',text,render)
             return(
               <div>
                  <span>{this.state.option?'已审批':'未审批'}</span>
                  <Button size='small' onClick={this.changeState.bind(this,render._id)}>审批</Button>
               </div>
             )
            }
          },

          {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            align:'center',
            render:(text,render)=>{
                return(
                    <div>
                        <Button type="primary" size='small' 
                        onClick={this.updata.bind(this,render)}>编辑</Button>
                        <Popconfirm
                        title='确定要删除吗'
                        onConfirm={this.confirmDel.bind(this,render._id)}
                        >
                        <Button type="danger" size='small'>删除</Button>
                        </Popconfirm>
                        
                    </div>
                )
            }
          },
      ]
      orderListAdd=()=>{
        this.props.history.push({pathname:'/admin/food/add'})
      }
      updata=(render)=>{
        this.setState({updataShow:!this.state.updataShow,render:render})
      }
      confirmDel=(id)=>{
        let {page,pageSize} = this.state
        let url = '/api/admin/food/del'
        let data = {
          _id:id
        }
        this.$axios.post(url,data)
        .then((data)=>{
          if(data.err === 0){
            message.success('删除成功')
            this.initData(page,pageSize)
          }else{
            message.error('删除失败')
          }
        })
      }
      changeState=(render)=>{
          this.setState({option:!this.state.option})
      }
      pageChange=(page,pageSize)=>{
        //参数是改变后的页码和每页的条数
        console.log(page,pageSize)
         this.initData(page,pageSize)
       }
      initData(page,pageSize){
        this.loading=true
        let url = '/api/admin/food/find'
        let data ={
            page:page,
            pageSize:pageSize,
        }
        this.$axios.post(url,data)
        .then((data)=>{
          if(data.err === 0){
            this.setState({dataSource:data.list,count:data.total,loading:false})
          }
        })
      }
      componentDidMount(){
        let {page,pageSize} = this.state
        this.initData(page,pageSize)
      }
      refresh=()=>{
        this.setState({updataShow:false})
        this.initData(this.state.page,this.state.pageSize)
      }
    render(){
      let {count,dataSource,pageSize,loading,updataShow,render} = this.state
        return(
          <Card title={
            <span > 
                <Icon type="profile" />
                <span>&nbsp;数据列表</span>
                <Button type="primary" className={style.btn} onClick={this.orderListAdd}>添加</Button>
            </span>
        }>
          
            <Spin 
            tip="数据加载中..."
            spinning={loading}
            >
              {!updataShow||<Foodupdata record={render} refreshFun={this.refresh}></Foodupdata>}
              <Table 
             columns={this.columns}
             dataSource={dataSource}
             bordered
             className={style.test}
             scroll={{y: 300,x:1100}}
             pagination={false}//取消默认分页器
             />,
              </Spin>
               <Pagination 
               showQuickJumper
               defaultCurrent={1} 
               total={count} 
               pageSize={pageSize}
               onChange={this.pageChange}
               />
          </Card>
        )
    }
}
export default FoodList