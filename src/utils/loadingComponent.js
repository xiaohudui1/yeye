import React from  'react'
import Loadable from 'react-loadable';
const LoadingComponent=()=>{
  return(
    <div>
      组件加载中
    </div>
  )
}
export default  (loader,loading = LoadingComponent)=>{
   return Loadable({
    loader:loader ,//需要按需加载的组件
    loading: LoadingComponent,  // 加载过程中显示组件
  });
}