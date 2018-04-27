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
            }
        ]
    },
    plugins: [
        'bisheng-plugin-toc?keepElem',
        'bisheng-plugin-react?lang=__react',
        'bisheng-plugin-antd'
    ]
}



