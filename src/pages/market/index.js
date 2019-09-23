import React,{Component} from 'react'
import {Input,DatePicker,Button,Icon,Modal, Table ,Pagination,message,Upload} from 'antd'
import axios from "axios"
import "../../mockData/market"
import "./index.less"

class OrderList extends Component{
    state={
        count:50,//总条数
        edit:false,//批量删除状态
        checkedarr:[],//批量删除的每一项
        allList:[],//总数据
        pages:1,
        visible:false,
        limit:4,
        defaultId:1,
        serchVal:"",//查询的值
        type:"add",
        imageUrl:"",
        staffName:"",//名称
        department:"",//类型
        position:"",//描述
        address:"",//价格
        columns:[
            {
              title: '名称',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '类型',
              dataIndex: 'type',
              key: 'type',
            },
            {
              title: '图片',
              dataIndex: 'img',
              key: 'img',
              render(data){
                return(<img width='80' height='50' src={data}/>)
              },
            },
            {
                title: '描述',
                dataIndex: 'desc',
                key: 'desc',
              },
              {
                title: '价格',
                dataIndex: 'price',
                key: 'price',
              },
              {
                title:'操作',
                dataIndex:'action',
                key:'action',
                render:(a,b)=><div>
                        <Button onClick={()=>this.editItem(b,"edit")}>修改</Button>
                        <Button onClick={()=>this.delItem(b)}>删除</Button>
                    </div>
              }
          ]
    }
  render(){
      let {columns,allList,edit,count,staffName,imageUrl,department,position,address,serchVal}=this.state;
      const rowSelection = {
        onChange: selectedRowKeys => {
          this.setStateCheckarr(selectedRowKeys);
        }
      };
     return(
        <div className="container">
            <div className="screen_box">
                <div className="inps">
                   <div className="screen_item">
                        <span>广告名称：</span><Input size="small" value={serchVal} onChange={(e)=>this.serach(e)
                        } style={{ width: '150px' }}/>
                   </div> 
                   <div className="screen_item">
                        <span>广告位置：</span><Input size="small" style={{ width: '150px' }}/>
                   </div> 
                   <div className="screen_item">
                        <span>到期时间：</span><DatePicker size="small" placeholder="请选择日期" />
                   </div>   
                </div>
                <div className="rest_btn">
                    <Button>重置</Button>
                    <Button onClick={this.serachList}>查询搜索</Button>
                </div>
            </div>

            <div className="data_list">
                  <p><Icon type="menu"/>数据列表</p>  
                  <p><Button onClick={()=>this.addMrket("add")}>添加广告</Button></p>
            </div>
            <Table className="tablebox" pagination={false} dataSource={allList.length?allList:null} rowSelection={edit ? rowSelection : null}  columns={columns}/>
            <div className="Advertising_footer">
                    <div className="footer_sreen">
                        <Button onClick={()=>this.changeEdit()}>批量删除</Button>
                        <Button onClick={()=>this.Alldetele()}>确定</Button>
                    </div>
                    <div className="footer_page">
                        <Pagination
                            showTotal ={total => `共 ${total} 条`}
                            showSizeChanger
                            showQuickJumper 
                            onShowSizeChange={this.onShowSizeChange}
                            defaultCurrent={1}
                            onChange={this.pageChange}
                            total={count}
                        />  
                    </div>
            </div>
            <Modal  title="添加广告"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}>
                       {/* start 添加信息操作 */}
          <div>
            <span>名称：</span>
            <Input
              value={staffName}
              onChange={e => this.setState({ staffName: e.target.value })}
              type="text"
              placeholder="请输入名称"
            />
            <span>类型：</span>
            <Input
              value={department}
              onChange={e => this.setState({ department: e.target.value })}
              type="text"
              placeholder="请输入类型"
            />
             <span>图片：</span>
             <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                onChange={this.handleChange}
            >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : <div>
        <Icon type='plus'/>
        <div className="ant-upload-text">上传图片</div>
      </div>}
            </Upload>
            <span>描述：</span>
            <Input
              value={position}
              onChange={e => this.setState({ position: e.target.value })}
              type="text"
              placeholder="请输入描述"
            />
           
            <span>价格：</span>
            <Input
              value={address}
              onChange={e => this.setState({ address: e.target.value })}
              type="text"
              placeholder="请输入价格"
            />
          </div>
          {/* end 添加信息操作 */}
            </Modal>
        </div>
     ) 
    }
    componentDidMount(){
        let {pages,limit}=this.state
        this.getList(pages,limit)
    }
    getList(pages,limit){
        axios.post("/getList",{pages,limit}).then(res=>{
            this.setState({
                allList:res.datas,
                count:res.allcount
            })
        })
    }
    //显示弹框
    addMrket(type){
        this.setState({visible:true,type})
    }
    //点击ok
    handleOk=()=>{
        let { staffName,imageUrl,department,position,address,type,defaultId}=this.state
        let obj={
            staffName,imageUrl,department,position,address,id:defaultId
        }
        if(type==="add"){
            if(staffName.trim()!==""){
                axios.post("/addList",obj).then(res=>{
                    message.success(res.msg);
                    this.setState({visible:false})
                    let {pages,limit}=this.state
                    this.getList(pages,limit)
                    this.dellist()
                })
            }
        }else{
            axios.post("/editList",obj).then(res=>{
                message.success(res.msg);
                let {pages,limit}=this.state
                this.getList(pages,limit)
                this.setState({visible:false})
            })
        }
    }
    //清空数据
    dellist() {
        this.setState({
          staffName: "",
          department: "",
          position: "",
          address: "",
          imageUrl:""
        });
      }
    //点击取消
    handleCancel=()=>{
        console.log("取消")
        this.dellist()
        this.setState({visible:false})
    }
    //上传图片
    handleChange(info ){
        console.log(info)
    }
    //单点删除
    delItem({id}){
        this.deletedFn(id)
    }
    deletedFn(id){
        axios.post("/delete",{id:id}).then(res=>{
            message.success(res.msg);
            this.setState({ edit: false});
            if(!this.state.edit){
                this.setState({
                    checkedarr:[]
                })
            }
            let {pages,limit}=this.state
            this.getList(pages,limit)
        })
    }
    //点击编辑
    editItem=(item,type)=>{
        this.setState({
            visible:true,
            type,
            defaultId:item.id,
            staffName:item.name,imageUrl:item.img,department:item.type,position:item.desc,address:item.price  
        })
       
    }
    //改变页面
     onShowSizeChange=(el,val)=>{
        console.log(el,val)        
     }
     //获取选中的id，checkbox每一项
    setStateCheckarr(arr) {
        this.setState({ checkedarr: arr });
    }
    //点击确定批量删除
    Alldetele(){
        let {checkedarr}=this.state;
        if(checkedarr.length){
            this.deletedFn(checkedarr)
        }else{
            message.warning("至少选择一项哦")
        }
    }
    //点击批量删除
    changeEdit(){
        this.setState({ edit: !this.state.edit });
        if(!this.state.edit){
            this.setState({
                checkedarr:[]
            })
        }
    }
    //分页
  pageChange = page => {
    this.setState({ pages: page  }, () => {
      let { pages, limit } = this.state;
      this.getList(pages, limit);
    });
  };
  //查询信息
  serachList=()=>{
    axios.post("/serach",{serchVal:this.state.serchVal}).then(res=>{
        this.setState({
            allList:res.datas,
            count:res.allcount
        })
    }) 
  }

  serach(e){
    this.setState({serchVal:e.target.value})
    if(e.target.value.trim()===""){
        let { pages, limit } = this.state;
        this.getList(pages, limit);
    }
  }
       
  }
  
export default OrderList