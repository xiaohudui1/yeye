import React,{Component} from 'react'
import { Form, Icon, Input, Button, Checkbox,Card,Select, message} from 'antd';
import style from './index.module.less'
class Updata extends Component{
    constructor(props){
        super()
        this.state = props.record
    }
    submit=()=>{
        let {_id,name,price,img,desc,foodtype} = this.state
        this.$axios.post('/api/admin/food/update',{_id,name,price,img,desc,foodtype})
        .then((data)=>{
           this.props.refreshFun()
        })
    }
    upload=()=>{
        let img = this.refs.img.files[0]
        let formData = new FormData()
        formData.append('img',img)
        this.$axios.post('/api/admin/file/upload',formData)
        .then((data)=>{
        if(data.err===0){
          this.setState({img:'http://10.9.22.12:8080'+data.imgpath})
        }
      })
    }
    render(){
        let {name,price,img,desc,foodtype} = this.state
        return(
            <div className={style.updata}>
            <Card className={style.card}>
            <span>名字：</span><input type='text'
            style={{width:400}}
            value={name} onChange={(e)=>{
               this.setState({name:e.target.value})
           }}/><br/>
            <span>价格：</span><input type='number'
            style={{width:400}}
            value={price} onChange={(e)=>{
               this.setState({price:e.target.value})
           }}/><br/>
             <span>图片：</span><input type='file' ref='img' style={{width:400}}/><br/>
             <button onClick={this.upload}style={{marginRight:200}}>上传图片</button>
             <img src={img} width='80' height='80'/><br/>
             <span>描诉：</span><input type='text' 
             style={{width:400}}
             value={desc} onChange={(e)=>{
               this.setState({desc:e.target.value})
           }}/><br/>
           <span>类型：</span>
           <select type='text' 
           style={{width:400}}
           value={foodtype} onChange={(e)=>{
               this.setState({foodtype:e.target.value})
           }}>
            <option value="内置调理" >内置调理</option>
            <option value="彩妆专场">彩妆专场</option>
            <option value="母婴专场" >母婴专场</option>
           </select><br/>
            <button onClick={this.submit}>修改</button>
            </Card>
         </div>
        )
    }
}
export default Form.create()(Updata)