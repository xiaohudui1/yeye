import React,{Component,Fragment} from 'react'
import { Form, Icon, Input, Button, message,Card } from 'antd';
import './index.less'
class Login extends Component{
    login=()=>{
        this.props.form.validateFields((err,arr)=>{
            console.log(err,arr)
            if(err){
                message.error("输入信息有误，请重试",1)
            }else{
                this.$axios({
                    method:'post',
                    url:"http://localhost:8081/admin/users/login",
                    data:{
                        us:arr.username,
                        ps:arr.password
                    }
                  })
                  .then((data)=>{
                     if(data.list[0].us==arr.username&&data.list[0].ps==arr.password){
                        message.success('登录后跳转到首页',1,()=>{
                            this.props.history.push('/admin/home')
                        })
                     }
                     
                  })
                  
                
            }
        })
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
           <div>
               <Card  className="login">
                   <Form.Item>
                    {getFieldDecorator('username', {rules: [{ required: true, message: 'Please input your username!' },
                    {max:8,message:'最多8个字符'}
                    ],})(
                        <Input className="login-us"
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                            />,
                    )}
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator('password', {rules: [{ required: true, message: 'Please input your Password!' }],
                     })(
                        <Input className="login-ps"
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password" placeholder="Password"
                    />,
                  )}
                    </Form.Item>
                    <Button onClick={this.login} type="primary" htmlType="submit" className="login-form-button">Log in</Button>
                </Card>
           </div>
        )
    }
}
    export default Form.create()(Login);