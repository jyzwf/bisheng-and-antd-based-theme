import React,{Component} from 'react'
import {Row,Col} from 'antd'
import SlideMenu from './Menu/SlideMenu'
import ArticleContent from './Content/ArticleContent'


export default class Articles extends Component{
    componentDidMount() {
      this.componentDidUpdate();
    }

    componentDidUpdate(prevProps) {
        if (!prevProps || prevProps.location.pathname !== this.props.location.pathname) {
          this.bindScroller()
        }
        if (!prevProps || (!window.location.hash && prevProps && prevProps.location.pathname !== this.props.location.pathname)) {
          document.body.scrollTop = 0
          document.documentElement.scrollTop = 0
          return
        }
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          if (window.location.hash) {
            document.querySelector(window.location.hash).scrollIntoView()
          }
        }, 10)
    }  

    
    componentWillUnmount() {
       clearTimeout(this.timer)
       this.scroller.disable()
    }

    bindScroller() {    
      if (this.scroller) {
        this.scroller.disable()
      }
      require('intersection-observer')
      const scrollama = require('scrollama')
      this.scroller = scrollama()
      this.scroller
        .setup({
          step: '.markdown > article > h1, .markdown > article > h2, .markdown > article > h3, .markdown > article > h4, .markdown > article > h5, .markdown > article > h6',
          offset: 0,
        })
        .onStepEnter(({ element }) => {
            console.log(element);
          [].forEach.call(document.querySelectorAll('.toc-affix li a'), (node) => {
            node.className = ''
          });
          const currentNode = document.querySelectorAll(`.toc-affix li a[href="#${element.id}"]`)[0]
          if (currentNode) {
            currentNode.className = 'current'
          }
        })
    }
    render(){
        const {pageData,themeConfig,routeParams,data,utils,location,route} =  this.props
        console.log(this.props)
        return(
            <div className='main-wrapper'>
                <Row>
                    <Col className='main-menu' xs={24} sm={24}  md={6}  lg={5} xl={5} xxl={4}>
                        <SlideMenu routePath={route.path} location={location} routeParams={routeParams} data={data} order={themeConfig.postConfig} />
                    </Col>

                    <Col className='main-container main-container-component' xs={0} sm={0}  md={18}  lg={19} xl={19} xxl={20}>
                        <ArticleContent pageData={pageData} utils={utils} />
                    </Col>
                </Row>
            </div>
        )
    }
}

