import React,{Component} from 'react'
import LeftNav from 'components/leftNav'
import './index.less'
class Admin extends Component{
    render(){
        return(
          <div className='admin'>
             <div className='admin-left'>
                 <LeftNav></LeftNav>
             </div>
             <div className='admin-right'>
             <div className='admin-right-top'>
                 <h1 className="admin-span">mall-admin-web</h1>
             </div>
             <div className='admin-right-center'>
                 {this.props.children}
             </div>
             <div className='admin-right-footer'></div>
             </div>
          </div>
        )
    }
}
export default Admin