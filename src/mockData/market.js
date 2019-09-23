import Mock from "mockjs"
const marketList=Mock.mock({
    "listData|60":[
         {
             "name":"@cname",   
             "type|1":["鞋子","衣服","汽车"],
             "img":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569068227691&di=5fd20a7f782bc916fb6221fd16f3e1a7&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201704%2F13%2F20170413143536_BiV84.jpeg",
             "desc":"@ctitle",
             "price|1000-2000":1,
             "id|+1":1
            }       
    ]
})

//连接接口,f返回数据
Mock.mock("/getList","post",(config)=>{
    let {pages,limit=20}=JSON.parse(config.body);
    return {
            datas:marketList.listData.slice((pages-1)*limit,(pages*limit)),
            allcount:marketList.listData.length
    };
})


//删除信息
Mock.mock("/delete","post",(config)=>{
    let {id}=JSON.parse(config.body);
    if(id instanceof Array){
         id.forEach(item=>{
            let ind=marketList.listData.findIndex(items=>items.id===item);
            marketList.listData.splice(ind,1);
         })   
         return {
            allcount:marketList.listData.length,
            code:1,
            msg:"删除成功"
        }
    }else{
       return delItem(id)
    }
})

function delItem(id){
    let ind=marketList.listData.findIndex(item=>item.id===id);
    if(ind!==-1){
        marketList.listData.splice(ind,1);
        return {
            allcount:marketList.listData.length,
            code:1,
            msg:"删除成功"
        }
    }else{
        return {
            code:0,
            msg:"删除失败"
        }
    }
}

//添加数据
Mock.mock("/addList","post",(config)=>{
    let obj=JSON.parse(config.body);
    marketList.listData.unshift({
        name: obj.staffName,
        type:obj.department,
        img: obj.imageUrl,
        desc: obj.position,
        price:obj.address,
        id:marketList.listData.length,
    })
    return {
        allcount:marketList.listData.length,
        code:1,
        msg:"添加成功"
    }
})


//编辑数据
Mock.mock("/editList","post",(config)=>{
    let obj=JSON.parse(config.body);
    let ind=marketList.listData.findIndex(item=>item.id===obj.id);
    marketList.listData[ind]={
        name: obj.staffName,
        type:obj.department,
        img: obj.imageUrl,
        desc: obj.position,
        price:obj.address,
        id: marketList.listData.length
    }
    return {
        code:1,
        msg:"修改成功"
    }
})

//查询
Mock.mock("/serach","post",(config)=>{
    let {serchVal}=JSON.parse(config.body)
    let arr=marketList.listData.filter(item=>item.name===serchVal);
    return {
        datas:arr,
        allcount:arr.length,
        code:1,
        msg:"修改成功"
    }
})

