---
title: 文档编写方式
---

## 文件目录
```bash
└── sad-doc
    ├── _posts     // 放所有 markdown 文件
    ├── _site     // bisheng 生成的最终文件
    ├── _theme    // 主题
    ├── node_modules
    ├── .babelrc
    ├── .gitignore
    ├── bisheng.config.js   // bisheng 原生配置文件
    ├── bisheng.souche.config.js    // 该主题的配置文件
    ├── package-lock.json
    └── package.json
```



## bisheng.souche.config.js
该文件用于配置 `_post` 文件下 `markdown` 文件的在菜单栏里面出现的顺序、子菜单栏别名等

假设 `_post` 文件夹下的内容如下所示
```bash
└──_posts
    ├── firstLevelArticle1.md
    ├── firstLevelArticle2.md
    ├── firstLevelArticle3.md
    ├── articles
    │   ├── article1.md
    │   ├── article2.md
    │   └── childrenArticles
    │       ├── childrenArticle1.md
    │       └── childrenArticle2.md
    │           └── 下一级目录
    └── components
        ├── components1.md
        ├── components2.md
        └── ...
```

对应的 `bisheng.souche.config.js` 文件如下

```js
module.exports = {
    "postConfig":{ 
        "firstLevelArticle1":1,
        "firstLevelArticle2":3,
        "firstLevelArticle3":2,
        "articles":{ 
            "name":"文章", 
            "isTopOne":true,  
            "subOrder":{   
                "article1":1,
                "article2":2
            },
            "children":{
                "childrenArticles":{
                    "subOrder":{
                      "childrenArticle1":1,
                      "childrenArticle2":2
                    }
                    // 如果 childrenArticles 还有子目录，就继续添加 children 属性，结构于此一致
                }
            }
        },
        "components":{
            "name":"组件",  
            "subOrder":{
                "components1":1,
                "components2":2
            }
        }
    },
    
    "firstPagePath":"/articles/about",  
}
```



### postConfig
该对象放所有 `markdown` 文件的配置，即上面的 `_posts` 文件夹的配置  
`postConfig`的所有属性名必须与 `_posts` 文件夹里面的文件名相同，如果在 `_posts` 文件夹下就直接有 `markdown` 文件，那么要为该这些文件指定 出现在菜单栏里面的顺序，从 `1` 开始  

下面是 `_posts` 下一个文件夹的配置，具体可以参考上面的结构  

#### name
> defaulut: `该文件夹名`  

设置该文件夹在子菜单上的显示文字


#### subOrder
该文件夹里面的 `markdown` 文件在菜单栏里面出现的顺序，从 `1` 开始


#### isTopOne
> defaulut:  `false`
是否将该文件夹下的 `markdown` 文件提升到上一级菜单


#### children
如果该文件夹下还有文件夹，则继续做如上配置




### firstPagePath
由于 `bisheng` 在配置有 `indexRoute` 属性的时候必须要有 `component` 属性，所以在不填的时候会出现 `localhost:8001/` 会匹配不到，因此在 `bisheng.config.js` 里面进行重定向  
如果你配置了 `component` 属性，即配置了 `localhost:8001/` 路由所对应的组件，那么该字段直接省略不填


## 路由配置  
除了上述配置之外，还需要在 `_theme` 文件夹下的 `index.js` 文件配置下路由

只需要配置下 `path` 即可，支持 `静态` 和 `动态` 路由

```js
const contentTmpl = './template/Articles'

module.exports = {
    lazyLoad:false,
    routes:{
        path:'/',
        component:'./template/Layout/index',
        childRoutes:[ 
            {
                path:'/:type/:doc',
                component:contentTmpl
            },
            {
                path:'/:doc',
                component:contentTmpl
            }
        ]
    },
    plugins: [
        'bisheng-plugin-toc?keepElem',
        'bisheng-plugin-react?lang=__react',
        'bisheng-plugin-antd'
    ]
}
```



## markdown 文件的编写规定
markdown 文件编写必须以下面这种来开头
```bash
---
title: 该 markdown 的名字
---

下面开始写正文
```


参考 [bisheng](https://github.com/benjycui/bisheng/blob/master/README.md)
