import React,{Component} from 'react'
import {Card,Table, Button,Pagination,Spin,Popconfirm, message} from 'antd'
class FoodList extends Component{
    constructor(){
        super()
    }
    //创建表头信息
    columns=[
        {
          title: '商品名称',
          dataIndex: 'name',
          key: 'name',//对应每条数据的key值
          width:100,
          fixed:'left'
        },
        {
            title: '商品图片',
            dataIndex: 'img',
            width:200,
            key: 'img',
            // render(data){//渲染函数DATA为key对应的值
            //     let imgPath = 'http://localhost:8080'+data
            //     return(<img width='80' height='60' src={imgPath}/>)
            // },
          },
        {
            title: '商品类型',
            dataIndex: 'foodtype',
            key: 'foodtype',
            width:100,
          },
        {
          title: '描述',
          dataIndex: 'desc',
          key: 'desc',
          width:300,
        },
          {
            title: '商品价格',
            dataIndex: 'price',
            key: 'price',
            width:100,
          },

          {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            fixed:'right',
            width:200,
            render:(text,render)=>{
                return(
                    <div>
                        <Button type="primary" size='small' onClick={this.updata.bind(this,render)}>修改</Button>
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
      initData(page,pageSize){

      }
    render(){
        return(
          <Card>
             <Table columns={this.columns}/>,
          </Card>
        )
    }
}
export default FoodList