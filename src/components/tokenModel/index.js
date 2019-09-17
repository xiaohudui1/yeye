import React,{Component,Fragment} from 'react'
import {withRouter} from 'react-router-dom'
import ActionCreator from 'store/actionCreator'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Card} from 'antd';
import './index.less'
class Token extends Component{
    back=()=>{
        //模态框隐藏
        this.props.changeModelState()
        this.props.history.push('/login')
    }
    render(){
        return(
            <Fragment>
                {!this.props.ModelState||<div className='tokenModel'>
                    <Card >
                        <p>token失效，请重新登录</p>
                        <button onClick={this.back}>返回登录</button>
                    </Card>
                </div>}
            </Fragment>
           
        )
    }
}
// export default connect(state=>state,(dispatch)=>{
//     return{
//         test(){
//             dispatch(ActionCreator.changeModelState())
//         }
//     }  
// })(Token)
let NewComponent = withRouter(Token)
export default connect(state=>state,(dispatch)=>{
    return  bindActionCreators(ActionCreator,dispatch) 
})(NewComponent)