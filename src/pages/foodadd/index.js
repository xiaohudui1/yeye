import React,{Component} from 'react'
import { Form, Icon, Input, Button, Checkbox,Card,Select, message} from 'antd';
import './index.less'
const { Option } = Select;
class FoodAdd extends Component{
    constructor(){
        super()
        this.state={
            imgPath:''
        }
    }
    login=()=>{
        let {imgPath} = this.state
        this.props.form.validateFields((err,dataN)=>{
            if(err){
                message.err('添加失败，请重新尝试')
            }else{
                let url ='/api/admin/food/add'
                let data={
                    name:dataN.name,
                    price:dataN.price,
                    img:this.state.imgPath,
                    desc:dataN.desc,
                    foodtype:dataN.foodtype,
                  }
                  if(imgPath !== ''){
                      this.$axios.post(url,data)
                      .then((data)=>{
                        if(data.err===0){
                            message.success('添加ok')
                            this.props.history.push({pathname:'/admin/food/list'})
                          }
                      })
                  }else{
                    message.err('请先上传图片')
                  }
            }
        })

    }
    upload=()=>{
        let file = this.refs.file.files[0]
        let formData = new FormData()
        formData.append('img',file)
        this.$axios.post('/api/admin/file/upload',formData)
        .then((res)=>{
            if(res.err===0){
              let path = 'http://localhost:8080'+res.imgpath
              this.setState({imgPath: path })
            }
            
        })
      }
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
          <Card className='FoodAdd'>
        <Form>
        <Form.Item>
        <label>商品名称:</label>
        {getFieldDecorator('name', {
            rules: [{ required: true, message: '请您输入名字' }],
          })(
            <Input
            style={{width:400}}
              prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="name"
              placeholder="商品名称"
            />,
          )}
        </Form.Item>
        <Form.Item>
        <label>商品描诉:</label>
        {getFieldDecorator('desc', {
          })(
            <Input
            style={{width:400}}
              prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type='desc'
              placeholder="商品描诉"
            />,
          )}
        </Form.Item>
        <Form.Item>
        <label>商品价格:</label>
        {getFieldDecorator('price', {
          })(
            <Input
            style={{width:400}}
              prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type='price'
              placeholder="商品价格"
            />,
          )}
        </Form.Item>
        <div style={{display:'flex'}}>
        <input type='file' ref='file' 
        style={{marginLeft:300,}}
        />
       <button onClick={this.upload}>上传图片</button>
        </div>
        <Form.Item>
        {getFieldDecorator('img', {
          })(
           <img src={this.state.imgPath}
            width='80' height='80'
            type='img'
            alt='需要上传图片'
            />
          )}
        </Form.Item>
        <Form.Item>
        <label>商品类型:</label>
        {getFieldDecorator('foodtype', {
          })(
            <Select initialValue="护肤专场"
            type='foodtype'
            style={{ width: 400 }}>
            <Option value="内置调理" >内置调理</Option>
            <Option value="彩妆专场">彩妆专场</Option>
            <Option value="母婴专场" >母婴专场</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button"
               onClick={this.login}
              >
                提交
              </Button>
            </Form.Item>
      </Form>
          </Card>
        )
    }
}
export default Form.create()(FoodAdd)