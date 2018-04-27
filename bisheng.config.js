const path = require('path')
const CSSSplitWebpackPlugin = require('css-split-webpack-plugin').default
const {postConfig,firstPagePath} = require('./bisheng.souche.config.js')

const isDev = process.env.NODE_ENV === 'development'


module.exports = {
  port: 8002,
  source: './_posts',
  theme: './_theme',
  htmlTemplate: './_theme/static/template.html',
  themeConfig: {
    postConfig
  },

  devServerConfig:{
    before(app){
      if(firstPagePath){
        app.get('/',(req,res)=>{
          res.redirect(firstPagePath)
        })
      }
    }
  },
  
  webpackConfig(config) {
    config.resolve.alias = {
      'react-router': 'react-router/umd/ReactRouter',
    };

    config.externals = {
      'react-router-dom': 'ReactRouterDOM',
    };


    if (isDev) {
      config.devtool = 'source-map';
    }


    config.plugins.push(new CSSSplitWebpackPlugin({ size: 4000 }));
    
    return config;
  },

  htmlTemplateExtraData: {
    isDev,
  },

  root:'./'
};
