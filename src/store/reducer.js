import State from './state'
export default(prestate = State,action)=>{
    
    let newdata = JSON.parse(JSON.stringify(prestate))
    
   
    
    return newdata
    
}