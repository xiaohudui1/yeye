import React,{Component} from 'react'
import {HashRouter,Route,Switch,Redirect} from 'react-router-dom'
import App from './App'
import Admin from 'pages/admin'
<<<<<<< HEAD
import FoodList from 'pages/food'
import FoodAdd from 'pages/foodadd'
=======
import OrderList from 'pages/order'
>>>>>>> b3c8feb6f67bcf90698a816be0ec8a1ad3b643f7
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
<<<<<<< HEAD
                                <Route path='/admin/food/list' component={FoodList}></Route>
                                <Route path='/admin/food/add' component={FoodAdd}></Route>
=======
                                <Route path="/admin/order/list" component={OrderList}></Route>
>>>>>>> b3c8feb6f67bcf90698a816be0ec8a1ad3b643f7
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