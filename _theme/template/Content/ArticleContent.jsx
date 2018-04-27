import React from 'react'
import {Affix} from 'antd'
import { getChildren } from 'jsonml.js/lib/utils'


export default function ArticleContent(props){
    const {pageData,utils} =  props
    const {meta,content,toc} = pageData
    const title = meta.title

    return (
        <div className='markdown'>
            <h1>{title}</h1>
            {
                (!toc || toc.length <= 1 || meta.toc === false) ? null :
                <Affix className="toc-affix" offsetTop={16}>
                {
                    props.utils.toReactComponent(
                    ['ul', { className: 'toc' }].concat(getChildren(toc))
                    )
                }
                </Affix>
            }
            
            {props.utils.toReactComponent(content)}
        </div>
    )
}