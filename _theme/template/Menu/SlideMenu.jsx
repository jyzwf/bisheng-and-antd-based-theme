import React ,{Component}from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'bisheng/router'
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

const injectOrder=orderConfig=>{
  let result = []
  return orderData=>{
    for(let d in orderData){
      if(orderConfig[d]){
        orderData[d].order = orderConfig[d]
        orderData[d].key = d
        result.push(orderData[d])
      }
    }
    return result
  }
}

const genMenuLink = meta=>{
  const filename = meta.filename
  const path = filename.replace(/[\w-_]+((\/?[\w-_]+)+).md/,'$1')
  return <Link to={path}>{meta.title}</Link>
}


const genMenuItem = (subOrder,docs) => {
    const docsInjected = injectOrder(subOrder)(docs)
    return docsInjected.sort((a,b)=>a.order-b.order).map(a=>{
      return <Menu.Item key={a.key}>{genMenuLink(a.meta)}</Menu.Item>
    })
}


const genMenu =(docs,data,_isFirstLevel=false)=>{
    let finalMenu=[]
    let firstLoopArticle={}
      for(let k in docs){

        if(_isFirstLevel && typeof docs[k] === 'number'){
          firstLoopArticle[k]=docs[k]
          continue
        }

        const subOrder = docs[k].subOrder
        const subData = data[k]
        let subItem  = null
        if(subOrder){
          subItem= genMenuItem(subOrder,subData)
        }

        if(docs[k].children){
          subItem = subItem.concat(genMenu(docs[k].children,data[k]))
        }

        if(docs[k].isTopOne){
          finalMenu.push(subItem)
        }else{
          finalMenu.push(
            <SubMenu key={k} title={docs[k].name?docs[k].name:k}>
              {subItem}
            </SubMenu>
          )
        }
    }

    if(_isFirstLevel){
      finalMenu.unshift(genMenuItem(firstLoopArticle,data))
    }else{
      firstLoopArticle = null  // 便于垃圾回收
    }

    return finalMenu
}


const getParentsPathArray=pathname=>pathname.replace(/\/[\w_]+$/,'').split('/')

// 兼容动态路由和静态路由
const getLastParams = path=>path.match(/\/:([\w_]+)$/)    
                ?{
                  _hasParams:true,
                  params:path.match(/\/:([\w_]+)$/)[1]
                }
                :{
                  _hasParams:false,
                  params:path.slice(1)
                }


export default function SliderMenue(props){
  const {routeParams,order,data,routePath,location} = props

  const openKeys = getParentsPathArray(location.pathname)
  const {_hasParams,params} = getLastParams(routePath)

  return <Menu 
            defaultSelectedKeys={[_hasParams?routeParams[params]:params]} 
            defaultOpenKeys={openKeys} 
            mode='inline'>
              {genMenu(order,data,true)}
        </Menu>
}

