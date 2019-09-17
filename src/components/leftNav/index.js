import React,{Component} from 'react'
import {Menu,Icon} from 'antd';
import {withRouter} from 'react-router-dom'
import Navdata from './navdata.js'
const { SubMenu} = Menu;
class LeftNav extends Component{
    //侧边栏数据为axja请求过来的
    constructor(){
        super()
        this.state={
            data:[]
        }
    }
    //做axaj请求
    componentDidMount(){
        setTimeout(()=>{
            this.setState({data:Navdata.data})
        },200)
    }
    jump(path){
        this.props.history.push(path)
    }
    rederItem(arr){
        if(!arr.length){return '暂无数据'}
        return arr.map((item)=>{
            if(item.children){
                return(
                    <SubMenu title={item.name} key={item.key}>
                        {this.rederItem(item.children)}
                    </SubMenu>
                )
            }else{
               return(
                <Menu.Item key={item.key}
                onClick={this.jump.bind(this,item.path)}
                >{item.name}</Menu.Item>
               )
            }
        })
    }
    render(){
        return(
            <Menu theme='dark' style={{ width: 256 }} mode="vertical">
                {this.rederItem(this.state.data)}
          </Menu>
        )
    }
}
export default withRouter(LeftNav)