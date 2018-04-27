import React from 'react'
import { Row, Col,Input,Icon } from 'antd'

const onSearchInGoogle = e => {
    const { keyCode, target } = e;
    const keyword = target.value.trim();
    if (keyCode === 13 && keyword !== '') {
        window.open(`https://www.google.com.hk/search?q=${encodeURIComponent(keyword)}`);
    }
  };


export default function Header(props){
    const {logo='SAD'} = props
    return (
        <header id='header' className='clearfix'>
            <Row>
                <Col xxl={4} xl={5} lg={5} md={6} sm={24} xs={24}>
                    <a id="logo">
                        <span>{logo}</span>
                    </a>
                </Col>
                <Col xxl={20} xl={19} lg={19} md={18} sm={0} xs={0}>
                    <div id="search-box">
                        <Icon type="search" />
                        <Input  placeholder={'请输入关键词搜索(Google)'} onKeyDown={onSearchInGoogle}/>
                    </div>
                </Col>
            </Row>
        </header>
    )
}