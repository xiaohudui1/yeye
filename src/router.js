import React,{Component} from 'react'
import {HashRouter,Switch} from 'react-router-dom'
import  App from  './App'

class RootRouter extends Component{
  render(){

    return(

      <App>

         <HashRouter>

            <Switch>
              
            </Switch>

        </HashRouter>
        
      </App>
     
    )
  }
}
export default  RootRouter