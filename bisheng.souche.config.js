module.exports = {
    "postConfig":{ // md 文件里面的配置
        "articles":{    // Menu 的 subMenu 的显示字段，不填默认为该对象名，e.g:在此不填为 "articles"
            "name":"文章", 
            "subOrder":{    // 当前目录下的 markdown 文件在 menu 里面出现的顺序的配置
                "doc-usage":1
            },
            "isTopOne":true     // 是否提升到上一 Menu 级
        },
    },
    // 由于bisheng在配置有 indexRoute 属性的时候必须要有 component 属性，
    // 所以在不填的时候会出现 localhost:8001/ 会匹配不到，因此在 bisheng.config.js 里面进行重定向
    // 如果你配置了 component 属性，即配置了 localhost:8001/ 路由所对应的组件，那么该字段直接省略不填
    "firstPagePath":"/articles/doc-usage",  
}