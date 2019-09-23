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
            data:[],
            collapsed: false,
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
                    <SubMenu title={
                        <span>
                            <Icon type={item.type}/>
                            <span>{item.name}</span>
                        </span>
                    } key={item.key}>
                        
                        {this.rederItem(item.children)}
                    </SubMenu>
                )
            }else{
               return(
                <Menu.Item key={item.key}
                onClick={this.jump.bind(this,item.path)}
                >
                    <span>
                        <Icon type={item.type} />
                        <span>{item.name}</span>
                    </span>
                </Menu.Item>
               )
            }
        })
    }
    render(){
        return(
            <Menu theme='dark' mode="inline" style={{ width: 200 }}>
                {this.rederItem(this.state.data)}
          </Menu>
        )
    }
}
export default withRouter(LeftNav)