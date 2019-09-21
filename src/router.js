import React,{Component} from 'react'
import {HashRouter,Route,Switch,Redirect} from 'react-router-dom'
import App from './App'
import Admin from 'pages/admin'
import Adensen from 'pages/market'
import FoodList from 'pages/food'
import FoodAdd from 'pages/foodadd'
import OrderList from 'pages/order/orderList'

class RootRouter extends Component{
    render(){
        return(
            <App>
            <HashRouter>
            {/* <TokenModel></TokenModel> */}
                <Switch>
                    <Redirect exact from='/' to='/admin'></Redirect>
                    <Route path='/admin' render={()=>{
                        return(
                            <Admin>
                                <Route path='/admin/food/list' component={FoodList}></Route>
                                <Route path='/admin/food/add' component={FoodAdd}></Route>
                                <Route path="/admin/order/list" component={OrderList}></Route>
                                <Route path="/admin/market/banner" component={Adensen}></Route>

                            </Admin>
                        )
                    }}></Route>
                </Switch>
            </HashRouter>
            </App>
          
        )
    }
}
export default RootRouter